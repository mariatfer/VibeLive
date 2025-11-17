<script setup lang="ts">
import { ICONS } from '@/constants/icons'
const isMovile = ref(false)

function handleResize() {
  if (window.innerWidth >= 768) {
    isMovile.value = true
  } else {
    isMovile.value = false
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <section class="search">
    <input
      id="search"
      type="search"
      name="search"
      class="search__input"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="search"
    />
    <UiTheButton class="search__button">
      <Icon :name="ICONS.search" class="search__icon" />
    </UiTheButton>
  </section>
</template>

<style lang="scss" scoped>
.search {
  @include flex(row, center, center, wrap);
  width: 100%;
  max-width: 30em;
  &__input {
    border: 0.0625rem solid var(--c-regular-gray);
    color: var(--c-white);
    border-top-left-radius: 0.3125rem;
    border-bottom-left-radius: 0.3125rem;
    padding: 0.4375rem;
    flex-grow: 1;
    min-width: 8rem;
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: none;
      border-color: var(--c-primary);
    }
    &:hover {
      border-color: var(--c-primary);
    }
    &::placeholder {
      transition: all 0.2s ease-in-out;
    }
    &:hover::placeholder {
      color: var(--c-semi-light-gray);
    }
  }
  &__button {
    padding: 0;
    border: 0.0625rem solid var(--c-semi-gray);
    transition: all 0.2s ease-in-out;
    max-width: 2.125rem;
    width: 2.125rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    &:hover {
      border: 0.0625rem solid var(--c-primary);
    }
  }
  &__icon {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 64rem) {
    & {
      display: none;
    }
  }
}
</style>
