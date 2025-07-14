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

<style scoped>
.progress-bar {
  width: 100%;
  height: 28px;
  background: var(--progress-bg);
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px #1976d210;
  display: flex;
  align-items: center;
}
.progress {
  height: 100%;
  background: var(--progress-fill);
  border-radius: 14px 0 0 14px;
  transition: width 0.4s cubic-bezier(.4,2,.6,1);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}
.progress-label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-color);
  font-weight: 700;
  font-size: 1em;
  letter-spacing: 0.5px;
  pointer-events: none;
  user-select: none;
}
</style> 