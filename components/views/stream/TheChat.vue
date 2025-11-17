<script setup lang="ts">
import type { Stream } from '@/interfaces/twitch'
import { ICONS } from '@/constants/icons'
defineProps<Stream>()

const isCollapsed = ref(false)

function toggleAside() {
  isCollapsed.value = !isCollapsed.value
}

function handleResize() {
  if (window.innerWidth <= 980) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
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
  <aside :class="['chat', { 'chat--collapsed': isCollapsed }]">
    <UiTheButton
      :transparent="true"
      :no-padding="true"
      class="chat__button"
      @click="toggleAside"
      ><Icon :name="ICONS.collapse" class="chat__icon"
    /></UiTheButton>
    <iframe
      v-if="$props"
      :src="`https://www.twitch.tv/embed/${$props.user_name}/chat?parent=vibe-live.vercel.app&darkpopout=true&language=en`"
      height="100%"
      width="350"
      frameborder="0"
      class="chat__iframe"
    />
  </aside>
</template>

<style lang="scss" scoped>
.chat {
  position: relative;
  height: 100%;

  &__button {
    position: absolute;
    z-index: 10;
    transform: rotate(180deg);
    top: 0.625rem;
    left: 0.625rem;
    transition: transform 0.3s ease-in-out;
  }

  &__icon {
    font-size: 1.25rem;
  }

  &__iframe {
    position: relative;
    z-index: 1;
  }
  &--collapsed {
    width: 3rem;
    height: 100%;
    overflow: hidden;

    .chat__iframe {
      display: none;
    }

    .chat__button {
      transform: rotate(0deg);
    }
    @media screen and (max-width: 61.25rem) {
      & {
        display: none;
      }
    }
  }
}
</style>
