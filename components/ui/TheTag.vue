<script setup lang="ts"></script>

<template>
  <li class="tags">
    <slot />
  </li>
</template>

<style lang="scss" scoped>
.tags {
  padding: 0.1875rem 0.4375rem;
  border-radius: 0.9375rem;
  background-color: var(--c-semi-gray);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--c-light-gray);
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  width: auto;
  max-width: fit-content;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: var(--c-primary);
    color: var(--c-white);
  }
}
</style>
