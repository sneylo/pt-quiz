<template>
  <div class="app-container">
    <QuizCard
      :guessed="guessed.length"
      :total="totalElements"
      :percent="progressPercent"
      :input="userInput"
      :input-error="inputError"
      @update:input="val => { userInput = val; onInput(); }"
      @submit="checkAnswer"
    />
    <button
      v-if="isDev"
      class="reveal-all-btn"
      @click="revealAll"
      title="Reveal all elements (dev only)"
    >Reveal All</button>
    <button
      v-if="isDev"
      class="hide-all-btn"
      @click="hideAll"
      title="Hide all elements (dev only)"
    >Hide All</button>
    <div class="table-wrapper">
      <PeriodicTable :guessed="guessed" :last-flipped="lastFlipped" @flip-end="onFlipEnd" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PeriodicTable from './components/PeriodicTable.vue';
import QuizCard from './components/QuizCard.vue';
import { useQuiz } from '~/composables/useQuiz';
import { elements } from '~/data/elements';

const isDev = import.meta.env.DEV;

const {
  userInput,
  guessed,
  lastFlipped,
  inputError,
  totalElements,
  progressPercent,
  checkAnswer,
  onFlipEnd,
  onInput,
} = useQuiz();

function revealAll() {
  guessed.value = elements.map(el => el.number);
}
function hideAll() {
  guessed.value = [];
}
</script>

<style scoped>
.quiz-card {
  position: relative;
  background: var(--card-bg) !important;
  box-shadow: var(--card-shadow);
  border-radius: 1.5rem;
  padding: 2rem 2.5rem 2.5rem 2.5rem;
  margin-bottom: 2rem;
  min-width: 320px;
  max-width: 420px;
  width: 100%;
  color: var(--text-color);
}

.dark-mode-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--toggle-bg);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background 0.2s;
  color: var(--toggle-icon);
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.dark-mode-toggle:focus {
  outline: 2px solid #38bdf8;
  outline-offset: 2px;
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
.app-container {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: var(--bg-gradient);
  box-sizing: border-box;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
.table-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.guess-input.error {
  border: 2px solid var(--input-error) !important;
  animation: shake 0.3s linear;
}
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
@media (max-width: 700px) {
  .app-root {
    flex-direction: column;
    gap: 24px;
    padding: 0 0 24px 0;
  }
  .header-card {
    max-width: 98vw;
    padding: 18px 4vw 16px 4vw;
  }
  .score-row {
    margin-bottom: 12px;
  }
  .progress-bar {
    height: 22px;
    font-size: 0.95em;
  }
  .progress-label {
    font-size: 0.95em;
  }
  .guess-form {
    flex-direction: column;
    gap: 10px;
    margin-top: 12px;
  }
  .guess-input {
    font-size: 1em;
    padding: 10px 12px;
  }
  .guess-btn {
    width: 100%;
    padding: 12px 0;
    font-size: 1em;
  }
  .table-wrapper {
    min-height: 40vh;
    padding: 0 2vw;
  }
}
.reveal-all-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 3000;
  background: #38bdf8;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.95em;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(33,150,243,0.10);
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s, background 0.2s;
}
.reveal-all-btn:hover {
  opacity: 1;
  background: #1976d2;
}
.hide-all-btn {
  position: fixed;
  top: 56px;
  right: 16px;
  z-index: 3000;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.95em;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(229,57,53,0.10);
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s, background 0.2s;
}
.hide-all-btn:hover {
  opacity: 1;
  background: #b71c1c;
}
</style>
