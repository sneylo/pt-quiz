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
    <div v-if="props.guessed" class="symbol-wrapper flex-center">
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

<style src="@/assets/styles/components/ElementTile.css" scoped></style> 