<template>
  <div class="quiz-card">
    <h1>Periodic Table Quiz</h1>
    <div class="score-row">
      <div class="progress-bar-wrapper">
        <ProgressBar :value="guessed" :max="total" :percent="percent" />
      </div>
    </div>
    <InputField
      :model-value="input"
      :error="inputError"
      @update:model-value="$emit('update:input', $event)"
      @submit="$emit('submit')"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import ProgressBar from './ProgressBar.vue';
import InputField from './InputField.vue';
defineProps<{
  guessed: number;
  total: number;
  percent: number;
  input: string;
  inputError: boolean;
}>();
defineEmits(['update:input', 'submit']);
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
.score-row {
  margin-bottom: 18px;
}
.progress-bar-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 