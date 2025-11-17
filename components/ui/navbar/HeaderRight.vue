<script setup lang="ts">
import { TwitchAPI } from '@/utils/TwitchAPI'
import { ICONS } from '@/constants/icons'

const twitchApi = new TwitchAPI()
const authUrl = ref<string>('')

onMounted(async () => {
  try {
    authUrl.value = await twitchApi.getAuthorizationUrl()
  } catch (error) {
    console.error('Error obtaining Twitch authorization URL:', error)
  }
})

function redirectToAuthUrl() {
  if (authUrl.value) {
    window.location.href = authUrl.value
  } else {
    console.error('Authorization URL is not available.')
  }
}
</script>

<template>
  <section class="buttons">
    <div class="buttons__notification buttons--translate">
      <span class="buttons__notification--badge">63</span>
      <UiTheButton :transparent="true"
        ><Icon :name="ICONS.crown" class="buttons__notification--crown"
      /></UiTheButton>
    </div>
    <UiTheButton class="buttons--translate" @click="redirectToAuthUrl"
      >Log In</UiTheButton
    >
    <UiTheButton :primary="true" class="buttons--translate">Sign Up</UiTheButton>
    <UiTheButton :transparent="true" class="buttons--translate">
      <Icon :name="ICONS.user" class="buttons__user" />
    </UiTheButton>
  </section>
  <UiTheButton :transparent="true" class="buttons--translate menu-button"
    ><Icon :name="ICONS.menu" class="menu-button__icon"
  /></UiTheButton>
</template>

<style lang="scss" scoped>
.buttons {
  @include flex(row, space-between, center, wrap, 0.5em);

  &__notification {
    position: relative;
    @include flex(column, space-between);

    &--badge {
      position: absolute;
      top: -0.4rem;
      right: -0.15rem;
      width: fit-content;
      background-color: var(--c-red);
      border: 0.1875rem solid var(--c-mid-gray);
      padding: 0.1rem 0.4rem;
      border-radius: 0.9375rem;
      font-size: 0.65rem;
      font-family: Arial, Helvetica, sans-serif;
      z-index: 1;
    }

    &--crown {
      font-size: 1.5rem;
    }
  }

  &__user {
    font-size: 1.35rem;
  }

  &--translate {
    font-weight: 600;
    will-change: transform;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: translateY(-0.1rem);
      .menu-button__icon {
        color: var(--c-primary);
      }
    }
  }
}
.menu-button {
  display: none;
  &__icon {
    font-size: 2.5rem;
  }
}
@media (max-width: 64rem) {
  .menu-button {
    display: block;
  }
  .buttons {
    display: none;
  }
}
</style>
