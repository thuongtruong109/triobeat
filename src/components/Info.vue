<script setup lang="ts">
import HistoryComponent from '@/components/History.vue'
import type { History } from '@/types'

defineProps<{
  wins: number
  draws: number
  losses: number
  choice: string
  computerChoice: string
  verdict: number
  history: History
}>()
</script>

<template>
  <div class="info">
    <div class="verdict" v-if="choice != null">
      <p :class="verdict == 1 ? 'win' : verdict == -1 ? 'loss' : 'draw'">
        {{ verdict == 1 ? '😀 You win!' : verdict == -1 ? '😢 You Lose!' : "🥲 It's a draw" }}
      </p>
      <button @click="$emit('again')" class="bg-pink-500 text-lg py-2 px-4">&#x21bb;</button>
    </div>
    <div class="desc" v-if="choice != null">
      <p>
        You picked: <span>{{ choice }}</span>
      </p>
      <p>
        Bot picked: <span class="text-green-500">{{ computerChoice }}</span>
      </p>
    </div>
    <div class="statistic">
      <p>
        Win: <span>{{ wins }}</span>
      </p>
      <p>-</p>
      <p>
        Draw: <span>{{ draws }}</span>
      </p>
      <p>-</p>
      <p>
        Loss: <span>{{ losses }}</span>
      </p>
    </div>
    <HistoryComponent :history="history" />
  </div>
</template>

<style scoped lang="scss">
.info {
  border-radius: 0.5rem;
  border: 1px dashed #00bd7e;
  width: 100%;
  padding: 0.5rem;

  .statistic {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
    margin: 0.5rem 0;

    p {
      font-size: 1rem;
      font-weight: 500;
      color: rgb(154, 154, 154);

      &:nth-child(1) {
        color: #00bd7e;
      }

      &:nth-child(3) {
        color: #e1ce00;
      }

      &:nth-child(5) {
        color: #ff7077;
      }

      span {
        font-weight: 600;
      }
    }
  }

  .desc {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    p {
      font-size: 0.9rem;
      font-weight: 500;
      margin: 0.5rem 0;

      span {
        font-weight: 700;
        color: #00bd7e;
      }
    }
  }

  .verdict {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.5rem;
    margin-bottom: 1rem;

    .win,
    .loss,
    .draw {
      font-weight: 500;
      color: #00bd7e;
      background-color: #91ffda7b;
      border-radius: 5px;
      padding: 0.25rem 1.5rem;
      width: fit-content;
    }

    .loss {
      color: #ff7077;
      background-color: #ff70777b;
    }

    .draw {
      color: #b8a900;
      background-color: #ccbb0041;
    }

    button {
      font-weight: 500;
      border: none;
      border-radius: 5px;
      padding: 0.5rem 0.75rem;
      width: fit-content;
      background-color: #00b3ff;
      color: white;
    }
  }
}
</style>
