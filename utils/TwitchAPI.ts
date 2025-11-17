import FetchError from '@/utils/FetchError'
import { tags } from '@/mocks/tags'
import type {
  Stream,
  TokenResponse,
  UserData,
  ApiResponse,
  Category,
  Tag,
  User,
  FollowersApiResponse,
} from '@/interfaces/twitch'

async function fetchTwitchAPI<T>(
  url: string,
  accessToken?: string,
  clientId?: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (clientId) headers['Client-ID'] = clientId
  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

  const response = await fetch(url, { ...options, headers })

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }))
    throw new FetchError(
      `Error ${response.status}: ${errorData.message || 'Unknown error'}`,
    )
  }

  return await response.json()
}

export async function getToken(): Promise<TokenResponse> {
  const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID
  const clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET
  const authUrl = 'https://id.twitch.tv/oauth2/token'

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  })

  try {
    return await fetchTwitchAPI<TokenResponse>(authUrl, undefined, undefined, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })
  } catch (error) {
    throw new FetchError('Failed to fetch Twitch token: ' + error)
  }
}

export class TwitchAPI {
  private clientId: string
  private clientSecret: string
  private redirectUri: string

  constructor() {
    this.clientId = import.meta.env.VITE_TWITCH_CLIENT_ID
    this.clientSecret = import.meta.env.VITE_TWITCH_CLIENT_SECRET
    this.redirectUri = import.meta.env.VITE_TWITCH_REDIRECT_URI
  }

  public async getAuthorizationUrl(): Promise<string> {
    const params = {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: 'user:read:email',
      state: this.generateState(),
    }

    const url = new URL('https://id.twitch.tv/oauth2/authorize')
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
    return url.toString()
  }

  public async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.redirectUri,
    })

    return await fetchTwitchAPI<TokenResponse>(
      'https://id.twitch.tv/oauth2/token',
      undefined,
      undefined,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      },
    )
  }

  public async getUserData(accessToken: string): Promise<UserData> {
    return await fetchTwitchAPI<UserData>(
      'https://api.twitch.tv/helix/users',
      accessToken,
      this.clientId,
    )
  }

  private async getUsersByIds(
    accessToken: string,
    userIds: string[],
  ): Promise<Map<string, string>> {
    if (userIds.length === 0) return new Map()

    const uniqueIds = [...new Set(userIds)]
    const idsParam = uniqueIds.map((id) => `id=${id}`).join('&')
    const url = `https://api.twitch.tv/helix/users?${idsParam}`

    const data = await fetchTwitchAPI<ApiResponse<User>>(url, accessToken, this.clientId)

    return new Map(data.data.map((user) => [user.id, user.profile_image_url]))
  }

  public async getLiveStreams(
    accessToken: string,
    limit: number = 12,
  ): Promise<ApiResponse<Stream>> {
    const url = `https://api.twitch.tv/helix/streams?first=${limit}&language=es`
    const data = await fetchTwitchAPI<ApiResponse<Stream>>(
      url,
      accessToken,
      this.clientId,
    )

    const userIds = data.data.map((stream) => stream.user_id)
    const profileImages = await this.getUsersByIds(accessToken, userIds)

    const streamsWithProfileImages = data.data.map((stream) => ({
      ...stream,
      profile_image_url: profileImages.get(stream.user_id) || '',
    }))

    return {
      ...data,
      data: streamsWithProfileImages,
    }
  }

  public async getCategoriesWithViewersAndTags(
    accessToken: string,
    limit: number = 7,
  ): Promise<Category[]> {
    const url = `https://api.twitch.tv/helix/games/top?first=${limit}`
    const data = await fetchTwitchAPI<ApiResponse<Category>>(
      url,
      accessToken,
      this.clientId,
    )

    const categoriesWithDetails = await Promise.all(
      data.data.map(async (category) => {
        const viewerCount = await this.getViewerCountForCategory(category.id, accessToken)
        return {
          ...category,
          box_art_url: category.box_art_url
            .replace('{width}', '285')
            .replace('{height}', '380'),
          viewer_count: viewerCount,
          tags: this.getRandomTags(),
        }
      }),
    )

    return categoriesWithDetails
  }

  private async getViewerCountForCategory(
    categoryId: string,
    accessToken: string,
  ): Promise<number> {
    const url = `https://api.twitch.tv/helix/streams?game_id=${categoryId}`
    const data = await fetchTwitchAPI<ApiResponse<Stream>>(
      url,
      accessToken,
      this.clientId,
    )

    return data.data.reduce((total, stream) => total + stream.viewer_count, 0)
  }

  private getRandomTags(): Tag[] {
    const shuffled = [...tags].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 2)
  }

  private generateState(): string {
    return crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15)
  }

  public async getUserInfo(accessToken: string, userId: string): Promise<User> {
    const url = `https://api.twitch.tv/helix/users?id=${userId}`
    const data = await fetchTwitchAPI<ApiResponse<User>>(url, accessToken, this.clientId)
    return data.data[0]
  }

  public async getFollowerCount(
    accessToken: string,
    broadcasterId: string,
  ): Promise<number> {
    const url = `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${broadcasterId}&first=1`
    const data = await fetchTwitchAPI<FollowersApiResponse>(
      url,
      accessToken,
      this.clientId,
    )
    return data.total
  }
}
