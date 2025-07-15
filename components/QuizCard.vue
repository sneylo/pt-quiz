<template>
  <div class="quiz-card">
    <h1>Periodic Table Quiz</h1>
    <div class="score-row">
      <div class="progress-bar-wrapper flex-center">
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

<style src="@/assets/styles/components/QuizCard.css" scoped></style> 