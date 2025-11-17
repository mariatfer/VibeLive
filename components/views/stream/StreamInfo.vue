<script setup lang="ts">
import type { Stream } from '@/interfaces/twitch'
import { ICONS } from '@/constants/icons'

const stream = defineProps<Stream>()

const now = ref(Date.now())
let intervalId: number

onMounted(() => {
  intervalId = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const elapsed = computed(() => {
  return stream.started_at
    ? formatStreamDuration(stream.started_at, now.value)
    : '00:00:00'
})
</script>

<template>
  <article v-if="stream" class="stream">
    <div class="stream--align">
      <h3 class="stream__user">{{ stream.user_name }}</h3>
      <div class="stream__buttons">
        <UiTheButton :primary="true" class="stream__button">
          <Icon :name="ICONS.favorite" class="stream__button--small" />
          Follow</UiTheButton
        >
        <UiTheButton class="stream__button">
          <Icon :name="ICONS.star" class="stream__button--medium" />
          Suscribe
          <Icon :name="ICONS.arrowDown" class="stream__button--small"
        /></UiTheButton>
      </div>
    </div>
    <section class="stream--align">
      <h4 class="stream__title">{{ stream.title }}</h4>
      <div class="stream__info">
        <div class="stream__info--container">
          <Icon :name="ICONS.user" class="stream__button--medium" />
          <span class="stream__info--viewer">
            {{ formatViewerCount(stream.viewer_count) }}
          </span>
          <span>{{ elapsed }}</span>
        </div>
        <div class="stream__info--container">
          <UiTheButton :transparent="true" class="stream__button">
            <Icon :name="ICONS.shared" class="stream__button--large" />
          </UiTheButton>
          <UiTheButton :transparent="true" class="stream__button">
            <Icon :name="ICONS.options" class="stream__button--large" />
          </UiTheButton>
        </div>
      </div>
    </section>
    <p class="stream__category">{{ stream.game_name }}</p>
    <ul v-if="stream.tags" class="stream__tag-list">
      <UiTheTag v-for="tag in stream.tags" :key="tag.tag_id">
        {{ tag }}
      </UiTheTag>
    </ul>
  </article>
</template>

<style lang="scss" scoped>
.stream {
  @include flex(column, flex-start, flex-start, nowrap, 0.3125rem);

  width: 100%;
  &--align {
    @include flex(row, space-between, flex-start, nowrap, 0.625rem);
    width: 100%;
  }
  &__user,
  &__title {
    @include flex(row, flex-start, center, wrap);
    user-select: none;
  }

  &__buttons {
    @include flex(row, flex-end, center, wrap, 0.625rem);
    margin: 0 0 0.5rem 0;
  }
  &__info {
    @include flex(row, flex-end, flex-start, wrap, 0.625rem);
    &--container {
      @include flex(row, flex-end, center, nowrap, 0.625rem);
      align-items: center;
      width: auto;
      max-height: 1.6563rem;
      font-size: var(--s-font-cta);
      &__span {
        margin: auto 0;
      }
    }

    &--viewer {
      color: var(--c-pink);
    }
  }

  &__category {
    color: var(--c-primary);
    font-weight: 600;
  }
  &__button {
    @include flex($gap: 0.3125rem);
    align-items: center;
    padding: 0.25em 0.5em;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: translateY(-0.0625rem);
    }

    &--small {
      font-size: 1rem;
    }

    &--medium {
      font-size: 1.2rem;
    }

    &--large {
      font-size: 1.5rem;
    }
  }

  &__tag-list {
    @include flex($justify: flex-start, $wrap: wrap, $gap: 0.3125rem);
    margin: 0.5rem 0 0 0;
  }
}
</style>
