<script setup lang="ts">
import type { Category } from '@/interfaces/twitch'
import { formatViewerCount } from '@/utils/formatters'
const MAX_TAGS = 2
defineProps<Category>()
</script>

<template>
  <NuxtLink to="/" class="category-card">
    <NuxtImg
      :src="$props.box_art_url"
      alt="Category thumbnail"
      class="category-card__img"
    />
    <h3 class="category-card__title">
      {{ $props.name }}
    </h3>
    <p class="category-card__viewers">
      {{ formatViewerCount($props.viewer_count) }} viewers
    </p>
    <ul class="category-card__list">
      <UiTheTag
        v-for="tag in tags.slice(0, MAX_TAGS)"
        :key="tag.tag_id"
        class="category-card__item"
      >
        {{ tag.tag_name }}
      </UiTheTag>
    </ul>
  </NuxtLink>
</template>

<style scoped lang="scss">
.category-card {
  @include flex(column, space-between, $gap: 0.3125rem);
  box-sizing: border-box;
  border-radius: 0.3125rem;
  color: var(--c-semi-light-gray);
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  min-height: 21rem;
  height: auto;
  width: calc(100% / 7 - 1.7rem);
  min-width: 12rem;
  @media screen and (max-width: 62.25rem) {
    width: calc(100% / 3 - 1.7rem);
    min-width: unset;
    min-height: unset;
  }

  &__img {
    &:hover {
      transform: translate(0.0625rem, -0.0625rem);
      transition: all 0.3s ease-in-out;
      border-bottom: 0.1875rem solid var(--c-primary);
      border-left: 0.1875rem solid var(--c-primary);
    }
  }
  &__title {
    font-size: var(--s-font-cta);
    transition: all 0.3s ease-in-out;
    &:hover {
      color: var(--c-primary);
    }
  }
  &__viewers {
    color: var(--c-semi-light-gray);
    font-size: var(--s-font-small);
  }

  &__list {
    @include flex(row, flex-start, center, wrap, 0.625rem);
    margin: 0.125rem 0 0 0;
  }
  &__item {
    @media screen and (max-width: 48rem) {
      &:nth-child(2) {
        visibility: hidden;
      }
    }
  }
}
</style>
