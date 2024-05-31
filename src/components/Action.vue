<script setup lang="ts">
import Reset from '@/components/icons/Reset.vue'
import Rate from '@/components/icons/Rate.vue'
import Score from '@/components/icons/Score.vue'

defineProps<{
  rate: number
  score: number
}>()
</script>

<template>
  <div class="action">
    <button type="button" @click="$emit('reset')">
      <Reset />
      <span>Reset</span>
    </button>
    <div>
      <div class="rate">
        <Rate />
        <p>Rate: {{ rate }}%</p>
      </div>
      <div class="score">
        <Score />
        <p>Score: {{ score }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.action {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    font-size: 0.9rem;
    font-weight: 500;
    border: 1px solid #ff7077;
    border-radius: 0.25rem;
    width: fit-content;
    padding: 0.35rem 0.5rem;
    color: #ff7077;
    background-color: transparent;
    display: flex;
    align-items: center;
    column-gap: 0.2rem;

    &:hover {
      background-color: #ff7077;
      color: white;
    }
  }

  > div {
    display: flex;
    gap: 0.5rem;

    .rate,
    .score {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
      font-size: 0.9rem;
      font-weight: 500;
      border: 1px solid #00bd7e;
      border-radius: 0.25rem;
      width: fit-content;
      padding: 0.25rem 0.5rem;
      color: #00bd7e;
      height: fit-content;

      &:nth-child(1) {
        border-color: blueviolet;
        color: blueviolet;
      }
    }
  }
}
</style>
