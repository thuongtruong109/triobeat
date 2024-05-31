<script setup lang="ts">
import type { History } from '@/types'
defineProps<{
  history: History[]
}>()
</script>

<template>
  <ul class="history">
    <li v-for="(item, index) in history" :key="index">
      <span>{{ item.time }}</span>
      <span>You: {{ item.youChoice }}</span>
      <span>Bot: {{ item.botChoice }}</span>
      <span>Score: {{ item.score }}</span>
      <span>{{ item.result }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.history {
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.35rem;
    background-color: #e3e3e3;
    color: gray;
    font-size: 0.9rem;
    column-gap: 0.25rem;

    span {
      text-align: left;

      &:nth-child(1) {
        width: 30%;
      }

      &:nth-child(2) {
        width: 20%;
      }

      &:nth-child(3) {
        width: 20%;
      }

      &:nth-child(4) {
        width: 20%;
      }

      &:nth-child(5) {
        width: 10%;
      }
    }
  }
}
</style>
