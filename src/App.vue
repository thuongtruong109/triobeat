<script setup>
import { ref, computed, onMounted } from 'vue'
import { currentTime } from '@/utils'
import Header from '@/components/Header.vue'
import Action from '@/components/Action.vue'
import Playground from '@/components/Playground.vue'
import Info from '@/components/Info.vue'
import Footer from '@/components/Footer.vue'

const wins = ref(0)
const draws = ref(0)
const losses = ref(0)

const choice = ref(null)
const computerChoice = ref(null)
const verdict = ref(null)

const history = ref([])

const outcomes = {
  rock: {
    rock: 'draw',
    paper: 'loss',
    scissors: 'win'
  },
  paper: {
    rock: 'win',
    paper: 'draw',
    scissors: 'loss'
  },
  scissors: {
    rock: 'loss',
    paper: 'win',
    scissors: 'draw'
  }
}

const choices = ['rock', 'paper', 'scissors']

let counter = 0

const rotateChange = () => {
  counter++
  if (counter === choices.length) counter = 0
  computerChoice.value = choices[counter]
}

const loadHistory = () => {
  history.value = JSON.parse(localStorage.getItem('history')) || []
}

const addToHistory = () => {
  history.value.push({
    time: currentTime(),
    youChoice: choice.value,
    botChoice: computerChoice.value,
    result: currentOutCome.value,
    score: wins.value - losses.value
  })
}

const saveHistory = () => {
  localStorage.setItem('history', JSON.stringify(history.value))
}

let intervals = setInterval(rotateChange, 100)
const currentOutCome = ref('')

const play = (c) => {
  if (choice.value) return

  choice.value = c

  clearInterval(intervals)

  currentOutCome.value = outcomes[choice.value][computerChoice.value]

  if (currentOutCome.value === 'win') {
    wins.value++
    verdict.value = 1
  } else if (currentOutCome.value === 'loss') {
    losses.value++
    verdict.value = -1
  } else {
    draws.value++
    verdict.value = 0
  }

  addToHistory()

  SaveGame()

  saveHistory()
}

const winPercentage = computed(() => {
  const total = wins.value + draws.value + losses.value
  return total ? (wins.value / total) * 100 : 0
})

const SaveGame = () => {
  localStorage.setItem('wins', wins.value)
  localStorage.setItem('draws', draws.value)
  localStorage.setItem('losses', losses.value)
}

const LoadGame = () => {
  wins.value = parseInt(localStorage.getItem('wins')) || 0
  draws.value = parseInt(localStorage.getItem('draws')) || 0
  losses.value = parseInt(localStorage.getItem('losses')) || 0

  loadHistory()
}

const Again = () => {
  choice.value = null
  computerChoice.value = null
  verdict.value = null
  currentOutCome.value = ''

  intervals = setInterval(rotateChange, 100)
}

onMounted(() => {
  LoadGame()

  window.addEventListener('keypress', (e) => {
    if (e.key === 'r') {
      Again()
    }
  })
})

const ResetGame = () => {
  localStorage.clear()
  history.value = []
  currentOutCome.value = ''
  wins.value = 0
  draws.value = 0
  losses.value = 0
}
</script>

<template>
  <main>
    <Header />

    <Action :rate="Math.round(winPercentage)" :score="wins - losses" @reset="ResetGame" />

    <Playground @play="play" :computerChoice="computerChoice" :youChoice="choice" />

    <Info
      :wins="wins"
      :draws="draws"
      :losses="losses"
      :choice="choice"
      :computerChoice="computerChoice"
      :verdict="verdict"
      :history="history"
      @again="Again"
    />

    <Footer />
  </main>
</template>

<style lang="scss">
@import '@/assets/styles/main.scss';
main {
  text-align: center;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  align-items: center;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  main {
    width: 800px;
  }
}

@media (max-width: 1024px) {
  main {
    width: 800px;
  }
}

@media (max-width: 768px) {
  main {
    width: 700px;
  }
}

@media (max-width: 640px) {
  main {
    width: 600px;
  }
}

@media (max-width: 480px) {
  main {
    width: 450px;
  }
}

@media (max-width: 375px) {
  main {
    width: 350px;
  }
}
</style>
