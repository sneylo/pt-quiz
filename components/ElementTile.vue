<template>
  <div
    class="tile"
    :class="[{ guessed: props.guessed }, categoryClass(props.category)]"
    :style="{
      gridColumn: props.group,
      gridRow: props.period,
    }"
    tabindex="0"
    role="button"
    :aria-label="`${props.name}, atomic number ${props.number}, ${props.guessed ? 'guessed' : 'not guessed'}`"
    ref="tileRef"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
    <span v-if="props.guessed" class="atomic-number">{{ props.number }}</span>
    <div v-if="props.guessed" class="symbol-wrapper">
      <span class="symbol">{{ props.symbol }}</span>
    </div>
    <div v-else class="tile-hidden"></div>
    <!-- Tooltip rendered in portal -->
    <teleport to="body">
      <div
        v-if="tooltipVisible"
        class="tooltip-portal"
        :style="{
          position: 'fixed',
          left: tooltipX + 'px',
          top: tooltipAbove ? (tooltipY - 40) + 'px' : tooltipY + 'px',
          transform: 'translate(-50%, 0)',
          zIndex: 2000,
        }"
      >
        <strong>{{ props.symbol }}</strong> ({{ props.number }})<br />
        <template v-if="props.guessed">
          {{ props.name }}
        </template>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted, nextTick } from 'vue';
const props = defineProps<{
  number: number;
  symbol: string;
  name: string;
  group: number;
  period: number;
  category: string;
  guessed: boolean;
}>();
function categoryClass(category: string) {
  return category
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z-]/g, '');
}

const tooltipVisible = ref(false);
const tooltipX = ref(0);
const tooltipY = ref(0);
const tooltipAbove = ref(false);
const tileRef = ref<HTMLElement | null>(null);

function showTooltip() {
  tooltipVisible.value = true;
  nextTick(() => {
    if (tileRef.value) {
      const rect = tileRef.value.getBoundingClientRect();
      tooltipX.value = rect.left + rect.width / 2;
      // Show above if near top, otherwise below
      if (rect.top < 80) {
        tooltipAbove.value = false;
        tooltipY.value = rect.bottom + 8;
      } else {
        tooltipAbove.value = true;
        tooltipY.value = rect.top - 8;
      }
    }
  });
}
function hideTooltip() {
  tooltipVisible.value = false;
}
onUnmounted(() => { tooltipVisible.value = false; });
</script>

<style scoped>
.tile {
  border-radius: 8px;
  min-height: 60px;
  min-width: 36px;
  position: relative;
  font-size: clamp(0.9em, 1vw, 1.1em);
  z-index: 1;
  outline: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.07);
  background: #d3d3d3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  transition: box-shadow 0.2s, background 0.2s, transform 0.2s, border 0.2s;
  border: 1.5px solid #bbb;
}
.tile.guessed {
  background: #e6fbe6;
  border: 2.5px solid #4caf50;
  box-shadow: 0 4px 16px rgba(76, 175, 80, 0.10);
  animation: guessed-scale 0.3s cubic-bezier(.4,2,.6,1);
}
@keyframes guessed-scale {
  0% { transform: scale(1); }
  60% { transform: scale(1.13); }
  100% { transform: scale(1); }
}
.atomic-number {
  position: absolute;
  top: 6px;
  left: 6px;
  font-size: clamp(0.7em, 0.9vw, 1em);
  color: #000000;
  opacity: 0.85;
  font-weight: 500;
}
.symbol-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.symbol {
  font-size: clamp(1.1em, 2vw, 1.7em);
  font-weight: bold;
  color: #2d3a2e;
  letter-spacing: 0.01em;
  margin: 0 0 2px 0;
}
.tile-hidden {
  width: 100%;
  height: 100%;
}
.tooltip-portal {
  background: #222;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9em;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.98;
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
  transition: opacity 0.2s;
  user-select: none;
}
</style> 