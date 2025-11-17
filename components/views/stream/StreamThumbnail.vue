<script setup lang="ts">
import type { Stream } from '@/interfaces/twitch'
defineProps<Stream>()
</script>

<template>
  <div class="stream-thumbnail">
    <NuxtImg
      :src="profile_image_url"
      :alt="`${user_name} thumbnail`"
      class="stream-thumbnail__image"
    />
    <span class="stream-thumbnail__badge">LIVE</span>
  </div>
</template>

<style lang="scss" scoped>
.stream-thumbnail {
  @include flex(row, center, center);
  position: relative;
  max-height: 4rem;

  &__image {
    width: 4rem;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.3125rem;
  }
  &__badge {
    position: absolute;
    bottom: -0.6em;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--c-red);
    font-weight: 600;
    padding: 0.25em 0.5em;
    border-radius: 0.25rem;
  }
}
</style>
