<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Stream, ApiResponse } from '@/interfaces/twitch'
import { TwitchAPI, getToken } from '@/utils/TwitchAPI'

const twitchApi = new TwitchAPI()
const streams = ref<Stream[]>([])
const isExpanded = ref(false)

async function fetchLiveStreams() {
  try {
    const accessToken = await getToken()
    const response: ApiResponse<Stream> = await twitchApi.getLiveStreams(
      accessToken.access_token,
      8,
    )
    streams.value = response.data.map((stream) => ({
      ...stream,
      thumbnail_url: stream.thumbnail_url
        .replace('{width}', '686')
        .replace('{height}', '386'),
    }))
  } catch (error) {
    throw new FetchError('Error fetching live streams: ' + error)
  }
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  fetchLiveStreams()
})
</script>

<template>
  <article class="live-recommendation">
    <h2 class="live-recommendation__title">
      <span class="live-recommendation__title--highlight">Live channels</span>&nbsp;we
      think you'll like
    </h2>
    <div
      class="live-recommendation__content"
      :class="{ 'live-recommendation__content--expanded': isExpanded }"
    >
      <ViewsHomeStreamCard v-for="stream in streams" :key="stream.id" v-bind="stream" />
    </div>
    <ViewsHomeShowMore :is-expanded="isExpanded" @toggle-expand="toggleExpand" />
  </article>
</template>

<style lang="scss" scoped>
.live-recommendation {
  @include flex(column, flex-start, flex-start, nowrap, 0.625rem);
  width: 100%;
  &__title {
    color: var(--c-semi-light-gray);
    &--highlight {
      color: var(--c-primary);
    }
  }
  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20.3125rem, 1fr));
    gap: 2.3125rem;
    width: 100%;
    height: 19.875rem;
    color: var(--c-semi-light-gray);
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    @media screen and (max-width: 62.5rem) {
      grid-template-columns: repeat(auto-fill, minmax(20.3125rem, 23.875rem));
      justify-content: center;
    }
    &--expanded {
      height: auto;
    }
  }
  @media screen and (min-width: 120rem) {
    max-width: 95.5rem;
  }
}
</style>
