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
import { ref, watch } from 'vue';
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

<style src="@/assets/styles/components/InputField.css" scoped></style> 