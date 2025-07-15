<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuenow="value"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-label="`Score: ${value} out of ${max}`"
  >
    <div class="progress" :style="{ width: percent + '%' }"/>
    <span class="progress-label">{{ value }} / {{ max }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
  value: number;
  max: number;
  percent: number;
}>();
</script>

<style src="@/assets/styles/components/ProgressBar.css" scoped></style> 