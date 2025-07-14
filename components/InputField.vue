<template>
  <form class="guess-form" @submit.prevent="$emit('submit')">
    <label for="element-input" class="visually-hidden">Element name</label>
    <input
      id="element-input"
      :value="inputValue"
      @input="onInput"
      :class="['guess-input', { error }]"
      placeholder="Enter element name (any language)"
      autocomplete="off"
      :aria-invalid="error ? 'true' : 'false'"
    />
    <button type="submit" class="guess-btn">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
const props = defineProps<{
  modelValue: string;
  error: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'submit']);
const inputValue = ref(props.modelValue);
watch(() => props.modelValue, (val) => { inputValue.value = val; });
function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  inputValue.value = val;
  emit('update:modelValue', val);
}
</script>

<style scoped>
.guess-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
.guess-input {
  flex: 1;
  padding: 0.7em 1em;
  border-radius: 8px;
  border: 2px solid var(--input-border);
  font-size: 1.1em;
  background: var(--input-bg);
  color: var(--input-text);
  transition: border 0.2s, box-shadow 0.2s;
}
.guess-input.error {
  border-color: #e53935;
  animation: shake 0.2s 1;
}
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}
.guess-btn {
  padding: 0.7em 1.2em;
  border-radius: 8px;
  border: none;
  background: var(--btn-bg);
  color: var(--btn-text);
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.guess-btn:hover, .guess-btn:focus {
  background: var(--btn-bg-hover);
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style> 