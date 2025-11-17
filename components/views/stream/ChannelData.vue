<script setup lang="ts">
import { TwitchAPI, getToken } from '@/utils/TwitchAPI'
import type { Stream } from '@/interfaces/twitch'
import { formatViewerCount } from '@/utils/formatters'
import { ICONS } from '@/constants/icons'

const props = defineProps<Stream>()
const twitchApi = new TwitchAPI()
const description = ref('')
const followers = ref()
const userId = props.user_id

async function fetchChannelData() {
  try {
    const accessToken = await getToken()
    const userInfo = await twitchApi.getUserInfo(accessToken.access_token, userId)
    const followersCount = await twitchApi.getFollowerCount(
      accessToken.access_token,
      userId,
    )
    description.value = userInfo.description
    followers.value = followersCount
  } catch (error) {
    throw new FetchError('Error fetching channel data:' + error)
  }
}

onMounted(() => {
  fetchChannelData()
})
</script>

<template>
  <article class="channel-data">
    <p class="channel-data__stat">
      <span class="channel-data__stat--followers">{{
        formatViewerCount(followers)
      }}</span>
      followers
    </p>
    <p class="channel-data__description">{{ description }}</p>

    <div class="channel-data__line" />
    <section class="channel-data__socials">
      <NuxtLink
        href="https://www.youtube.com/"
        target="_blank"
        class="channel-data__socials--link"
      >
        <Icon :name="ICONS.youtube" class="channel-data__icons" />Youtube
      </NuxtLink>
      <NuxtLink
        href="https://www.instagram.com/"
        target="_blank"
        class="channel-data__socials--link"
      >
        <Icon :name="ICONS.instagram" class="channel-data__icons" />Instagram
      </NuxtLink>
      <NuxtLink
        href="https://www.x.com/"
        target="_blank"
        class="channel-data__socials--link"
      >
        <Icon :name="ICONS.x" class="channel-data__icons" />Twitter
      </NuxtLink>
      <NuxtLink
        href="https://www.tiktok.com/"
        target="_blank"
        class="channel-data__socials--link"
      >
        <Icon :name="ICONS.tiktok" class="channel-data__icons" />Tiktok
      </NuxtLink>
    </section>
  </article>
</template>

<style scoped lang="scss">
.channel-data {
  @include flex(column, flex-start, flex-start, nowrap, 0.625rem);
  width: 100%;
  background-color: var(--c-mid-gray);
  padding: 1.25rem;
  &__stat {
    @include flex(row, flex-start, flex-end, nowrap, 0.625rem);
    width: 100%;
    font-weight: 600;
    color: var(--c-semi-light-gray);
    &--followers {
      color: var(--c-white);
      font-size: 1.125rem;
    }
  }
  &__description {
    color: var(--c-white);
  }
  &__line {
    width: 100%;
    height: 0.0625rem;
    background-color: rgb(66, 66, 66);
    margin: 1.25rem 0;
  }
  &__socials {
    @include flex(row, flex-start, flex-start, nowrap, 0.625rem);
    width: 100%;

    &--link {
      @include flex(row, flex-start, center, wrap, 0.3125rem);
      font-size: 1rem;
      color: var(--c-semi-light-gray);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__icons {
    font-size: 1.5rem;
  }
}
</style>
