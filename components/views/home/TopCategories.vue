<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwitchAPI, getToken } from '@/utils/TwitchAPI'
import type { Category } from '@/interfaces/twitch'
import { hideElementsInSecondRow } from '@/utils/domUtils'

const twitchApi = new TwitchAPI()
const categories = ref<Category[]>([])

async function fetchCategories() {
  try {
    const accessToken = await getToken()
    const results = await twitchApi.getCategoriesWithViewersAndTags(
      accessToken.access_token,
      7,
    )
    categories.value = results
    await nextTick()
    hideElementsInSecondRow('.top-categories__content', 'category-card')
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

onMounted(() => {
  fetchCategories()
  window.addEventListener('resize', () =>
    hideElementsInSecondRow('.top-categories__content', 'category-card'),
  )
})

onUnmounted(() => {
  window.removeEventListener('resize', () =>
    hideElementsInSecondRow('.top-categories__content', 'category-card'),
  )
})
</script>

<template>
  <article class="top-categories">
    <h2 class="top-categories__title">
      <span class="top-categories__title--highlight">Categories</span>&nbsp;we think
      you'll like
    </h2>
    <div class="top-categories__content">
      <ViewsHomeCategoryCard
        v-for="category in categories"
        :key="category.id"
        v-bind="category"
        class="category-card"
      />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.top-categories {
  @include flex(column, flex-start, flex-start, nowrap, 0.625rem);
  width: 100%;
  &__title {
    color: var(--c-semi-light-gray);
    &--highlight {
      color: var(--c-primary);
    }
  }
  &__content {
    @include flex(row, flex-start, flex-start, wrap, 1.9rem);
    width: 100%;
    color: var(--c-semi-light-gray);
    text-decoration: none;
    transition: all 0.2s ease-in-out;
  }
  @media screen and (min-width: 120rem) {
    max-width: 95.5rem;
  }
}
</style>
