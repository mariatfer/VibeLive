<script setup lang="ts">
import { categoryLabels } from '@/mocks/categoryLabels'
import { hideElementsInSecondRow } from '@/utils/domUtils'

onMounted(() => {
  nextTick(() => {
    hideElementsInSecondRow('.main__content--align', 'category-button')
  })

  window.addEventListener('resize', () =>
    hideElementsInSecondRow('.main__content--align', 'category-button'),
  )
})

onUnmounted(() => {
  window.removeEventListener('resize', () =>
    hideElementsInSecondRow('.main__content--align', 'category-button'),
  )
})
</script>

<template>
  <div class="home">
    <ViewsHomeLiveRecommendation />
    <ViewsHomeLiveRecommendation />
    <ViewsHomeTopCategories />
    <section class="home__categories">
      <UiTheButton
        v-for="button in categoryLabels"
        :key="button.id"
        :primary="true"
        class="home__button"
      >
        {{ button.text }}
        <component :is="button.icon" class="home__icon" />
      </UiTheButton>
    </section>
    <ViewsHomeLiveRecommendation />
    <ViewsHomeLiveRecommendation />
  </div>
</template>

<style lang="scss" scoped>
.home {
  @include flex(column, flex-start, center, wrap, 1.25rem);
  overflow: hidden;
  width: 100%;
  &__categories {
    @include flex(row, space-between, center, wrap, 1.25rem);
    padding: 0 0.625rem;

    @media screen and (max-width: 48rem) {
      justify-content: center;
    }
  }

  &__button {
    @include flex(row, flex-start, center);
    margin: 0;
    width: auto;
    position: relative;
    min-width: 13.75rem;
    padding: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.025);
    }
  }

  &__icon {
    position: absolute;
    top: -0.3125rem;
    right: -3.125rem;
  }
}
</style>
