<script setup lang="ts">
import { useRoute } from 'vue-router'
import { TwitchAPI, getToken } from '@/utils/TwitchAPI'
import type { ApiResponse, Stream } from '@/interfaces/twitch'

definePageMeta({
  layout: false,
})

const route = useRoute()
const twitchApi = new TwitchAPI()
const streamData = ref<Stream>()
const accessToken = ref<string | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  const userName = route.params.stream as string
  try {
    const tokenResponse = await getToken()
    accessToken.value = tokenResponse.access_token

    const streams: ApiResponse<Stream> = await twitchApi.getLiveStreams(
      tokenResponse.access_token,
    )
    streamData.value = streams.data.find((stream) => stream.user_name === userName)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    throw new FetchError('Error fetching stream data or token:' + error)
  }
})
</script>

<template>
  <NuxtLayout name="stream-layout">
    <div class="main__content">
      <article class="streamer">
        <div v-if="streamData" class="streamer__video-container">
          <iframe
            :src="`https://player.twitch.tv/?channel=${streamData?.user_name}&parent=vibe-live.vercel.app&autoplay=false`"
            allowfullscreen
            frameborder="0"
            class="streamer__video"
          />
        </div>
        <section class="streamer__data">
          <ViewsStreamThumbnail v-if="streamData" v-bind="streamData" />
          <ViewsStreamInfo v-if="streamData" v-bind="streamData" />
        </section>
        <h3 v-if="!isLoading">About {{ streamData?.user_name }}</h3>
        <ViewsStreamChannelData v-if="streamData" v-bind="streamData" />
      </article>
      <ViewsStreamTheChat v-if="streamData" v-bind="streamData" />
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.main__content {
  @include flex(row, space-between, flex-start, nowrap, 0, 1);
  width: 100%;
  .streamer {
    @include flex(column, flex-start, flex-start, nowrap, 1.25rem);
    width: 100%;
    padding: 0 0.9375rem 0 0.625rem;
    &__video-container {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      height: 0;
      overflow: hidden;
    }

    &__video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    &__data {
      @include flex(row, flex-start, flex-start, nowrap, 0.125rem);
      width: 100%;
    }
  }
}
</style>
