<template>
  <div class="periodic-table">
    <ElementTile
      v-for="element in elements"
      :key="element.number"
      v-memo="[guessed.includes(element.number)]"
      :number="element.number"
      :symbol="element.symbol"
      :name="element.names.english || 'Unknown'"
      :group="element.group"
      :period="element.period"
      :category="element.category"
      :guessed="guessed.includes(element.number)"
    />
    <div class="f-block-label" :style="{ gridColumn: 4, gridRow: 8 }">* Lanthanides</div>
    <div class="f-block-label" :style="{ gridColumn: 4, gridRow: 9 }">* Actinides</div>
  </div>
</template>

<script setup lang="ts">
import { elements } from '../data/elements';
import ElementTile from './ElementTile.vue';

defineProps<{ guessed: number[]; lastFlipped: number | null }>();
</script>

<style src="@/assets/styles/components/PeriodicTable.css" scoped></style> 