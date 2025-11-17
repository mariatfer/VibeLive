<script setup lang="ts">
const props = defineProps<{
  transparent?: boolean
  primary?: boolean
  noPadding?: boolean
}>()
defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="button"
    :class="{
      'button--transparent': props.transparent,
      'button--primary': props.primary,
      'button--no-padding': props.noPadding,
    }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  padding: 0.2em 0.6em;
  color: var(--c-white);
  font-size: 0.8125rem;
  border-radius: 0.25rem;
  min-width: fit-content;
  background: var(--c-transparent-gray);
  transition: all 0.3s ease-in-out;

  &--transparent {
    background: transparent;
  }

  &--primary {
    background: var(--c-primary);
  }

  &--no-padding {
    padding: 0;
  }
}
</style>
