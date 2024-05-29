<script setup>
import { ref, computed, onMounted } from 'vue'

const wins = ref(0)
const draws = ref(0)
const losses = ref(0)

const choice = ref(null)
const computerChoice = ref(null)
const verdict = ref(null)

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

let intervals = setInterval(rotateChange, 100)

const play = (c) => {
  if (choice.value) return

  choice.value = c

  clearInterval(intervals)

  const outcome = outcomes[choice.value][computerChoice.value]

  if (outcome === 'win') {
    wins.value++
    verdict.value = '😀 You win!'
  } else if (outcome === 'loss') {
    losses.value++
    verdict.value = '😢 You Lose!'
  } else {
    draws.value++
    verdict.value = "🥲 It's a draw"
  }

  SaveGame()
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
}

const Again = () => {
  choice.value = null
  computerChoice.value = null
  verdict.value = null

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
  wins.value = 0
  draws.value = 0
  losses.value = 0
}
</script>

<template>
  <main>
    <header>
      <h3>Rock - Paper - Scissors game</h3>
    </header>

    <div class="action">
      <button type="button" @click="ResetGame">Reset</button>
      <div>
        <p>Rate: {{ Math.round(winPercentage) }}%</p>
        <p>Score: {{ wins - losses }}</p>
      </div>
    </div>

    <div class="playground">
      <div class="you">
        <h4>You</h4>
        <ul>
          <li @click="play('rock')">
            <img src="@/assets/icons/rock.png" alt="Rock" />
          </li>

          <li @click="play('paper')">
            <img src="@/assets/icons/paper.png" alt="Paper" />
          </li>

          <li @click="play('scissors')">
            <img src="@/assets/icons/scissors.png" alt="Scissors" />
          </li>
        </ul>
      </div>
      <div class="computer">
        <h4>Computer</h4>
        <div>
          <img src="@/assets/icons/rock.png" alt="Rock" v-if="computerChoice == 'rock'" />
          <img src="@/assets/icons/paper.png" alt="Paper" v-else-if="computerChoice == 'paper'" />
          <img src="@/assets/icons/scissors.png" alt="Scissors" v-else />
        </div>
      </div>
    </div>

    <div class="info">
      <div class="statistic">
        <p>Win: {{ wins }}</p>
        <p>-</p>
        <p>Draw: {{ draws }}</p>
        <p>-</p>
        <p>Loss: {{ losses }}</p>
      </div>
      <div class="desc" v-if="choice != null">
        <p>
          You picked: <span>{{ choice }}</span>
        </p>
        <p>
          Computer picked: <span class="text-green-500">{{ computerChoice }}</span>
        </p>
      </div>
      <div class="verdict" v-if="choice != null">
        <p>{{ verdict }}</p>
        <button @click="Again" class="bg-pink-500 text-lg py-2 px-4">&#x21bb;</button>
      </div>
    </div>

    <footer>
      <a href="">Developed by @Thuong Truong, 2024</a>
    </footer>
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

  header {
    background-color: #00bd7e;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    color: white;
    width: 100%;
  }

  .action {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      font-size: 0.9rem;
      font-weight: 500;
      border: 1px solid hsl(357, 100%, 72%);
      border-radius: 0.25rem;
      width: fit-content;
      padding: 0.35rem 0.5rem;
      color: hsl(357, 100%, 72%);
      background-color: transparent;

      &:hover {
        background-color: hsl(357, 100%, 72%);
        color: white;
      }
    }

    div {
      display: flex;
      gap: 0.5rem;

      p {
        font-size: 0.9rem;
        font-weight: 500;
        border: 1px solid #00bd7e;
        border-radius: 0.25rem;
        width: fit-content;
        padding: 0.25rem 0.5rem;
        color: #00bd7e;

        &:nth-child(1) {
          border-color: blueviolet;
          color: blueviolet;
        }
      }
    }
  }

  .playground {
    display: grid;
    grid-template-columns: minmax(50%, 1fr) minmax(50%, 1fr);
    width: 100%;

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

          &:hover {
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

  .info {
    border-radius: 0.5rem;
    border: 1px dashed #00bd7e;
    width: 100%;
    padding: 0.5rem;

    .statistic {
      font-size: 1rem;
      font-weight: 500;
      color: gray;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 1rem;
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
      margin: 1rem 0;

      p {
        font-weight: 500;
        color: #00bd7e;
        background-color: #91ffda7b;
        border-radius: 5px;
        padding: 0.25rem 1.5rem;
        width: fit-content;
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

  footer {
    font-size: 0.9rem;
    margin-top: 3rem;
  }
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
    width: 500px;
  }
}
</style>
