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

<style src="@/assets/styles/components/App.css" scoped></style>
