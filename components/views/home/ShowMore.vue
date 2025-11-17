<script setup lang="ts">
import { ICONS } from '@/constants/icons'
defineProps<{
  isExpanded: boolean
}>()

const emit = defineEmits(['toggle-expand'])

function handleClick() {
  emit('toggle-expand')
}
</script>

<template>
  <div class="show-more">
    <div class="show-more__line" />
    <UiTheButton :transparent="true" class="show-more__button" @click="handleClick"
      >{{ isExpanded ? 'Show Less' : 'Show More' }}
      <Icon :name="ICONS.arrowDown" :class="['show-more__icon', { rotated: isExpanded }]"
    /></UiTheButton>
    <div class="show-more__line" />
  </div>
</template>

<style scoped lang="scss">
.show-more {
  @include flex(row, center, center, nowrap, 0.625rem);
  width: 100%;
  &__line {
    width: calc(50% - 3.95rem);
    height: 0.0625rem;
    background-color: var(--c-regular-gray);
    margin: 0.625rem 0;
  }
  &__button {
    @include flex(row, center, center, nowrap, 0.125rem);
    border: 0.0625rem solid var(--c-dark-gray);
    color: var(--c-primary);
    &:hover {
      border: 0.0625rem solid var(--c-primary);
    }
  }
  &__icon {
    font-size: 1rem;
    margin: 0 0 0 0.1875rem;
    transition: transform 0.3s ease-in-out;
  }

  .rotated {
    transform: rotate(180deg);
  }
}
</style>
