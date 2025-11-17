<script setup lang="ts">
import { ICONS } from '@/constants/icons'
</script>

<template>
  <section class="navbar">
    <NuxtLink to="/" class="navbar__logo">
      <NuxtImg src="/vibelive.png" alt="Vibe Live logo" class="navbar__image" />
    </NuxtLink>
    <UiTheButton :transparent="true" class="navbar__button">
      <Icon :name="ICONS.options" class="navbar__icon" />
    </UiTheButton>
  </section>
</template>

<style lang="scss" scoped>
.navbar {
  @include flex(row, flex-start, center, wrap, 0.5em);
  &__logo {
    @include flex($wrap: wrap);
    will-change: transform;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.01) rotate(2deg);
    }
  }

  &__image {
    max-width: 6.5rem;
    height: auto;
  }
  &__button {
    will-change: transform;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: translateY(-0.1rem);
    }
  }
  &__icon {
    width: 1.75rem;
    height: 1.75rem;
  }
}
</style>
