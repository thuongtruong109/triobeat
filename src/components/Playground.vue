<script setup lang="ts">
import You from '@/components/icons/You.vue'
import Bot from '@/components/icons/Bot.vue'

defineProps<{
  youChoice: string
  computerChoice: string
}>()
</script>

<template>
  <div class="playground">
    <div class="you">
      <h4>
        <You />
        <span>You</span>
      </h4>
      <ul>
        <li @click="$emit('play', 'rock')" :class="{ active: youChoice == 'rock' }">
          <img src="@/assets/icons/rock.png" alt="Rock" />
        </li>

        <li @click="$emit('play', 'paper')" :class="{ active: youChoice == 'paper' }">
          <img src="@/assets/icons/paper.png" alt="Paper" />
        </li>

        <li @click="$emit('play', 'scissors')" :class="{ active: youChoice == 'scissors' }">
          <img src="@/assets/icons/scissors.png" alt="Scissors" />
        </li>
      </ul>
    </div>
    <div class="computer">
      <h4>
        <Bot />
        <span>Bot</span>
      </h4>
      <div>
        <img src="@/assets/icons/rock.png" alt="Rock" v-if="computerChoice == 'rock'" />
        <img src="@/assets/icons/paper.png" alt="Paper" v-else-if="computerChoice == 'paper'" />
        <img src="@/assets/icons/scissors.png" alt="Scissors" v-else />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.playground {
  display: grid;
  grid-template-columns: minmax(50%, 1fr) minmax(50%, 1fr);
  width: 100%;

  h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.25rem;
  }

  .you {
    ul {
      display: grid;
      list-style: none;
      gap: 1rem;

      li {
        border: 1px solid #00bd7e;
        border-radius: 0.5rem;
        padding: 0.5rem;
        background-color: transparent;
        cursor: pointer;

        &:hover,
        &.active {
          background-color: #00bd7e;
        }

        img {
          width: 3.5rem;
          height: 3.5rem;
        }
      }
    }
  }

  .computer {
    overflow: hidden;
    div {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;

      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }
}
</style>
