import { ref, computed } from 'vue';
import { elements } from '../data/elements';

export function useQuiz() {
  const userInput = ref('');
  const guessed = ref<number[]>([]); // store atomic numbers of guessed elements
  const lastFlipped = ref<number | null>(null); // for animation
  const inputError = ref(false);
  let errorTimeout: ReturnType<typeof setTimeout> | null = null;

  const totalElements = computed(() => elements.length);
  const progressPercent = computed(() => Math.round((guessed.value.length / totalElements.value) * 100));

  function normalize(str: string) {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  }

  function checkAnswer() {
    const input = normalize(userInput.value.trim());
    const found = elements.find(el =>
      Object.values(el.names).some(name => normalize(name) === input)
    );
    if (found && !guessed.value.includes(found.number)) {
      guessed.value.push(found.number);
      lastFlipped.value = found.number;
      userInput.value = '';
      inputError.value = false;
    } else {
      inputError.value = true;
      if (errorTimeout) clearTimeout(errorTimeout);
      errorTimeout = setTimeout(() => {
        inputError.value = false;
      }, 800);
    }
  }

  function onFlipEnd(number: number) {
    if (lastFlipped.value === number) {
      lastFlipped.value = null;
    }
  }

  function onInput() {
    inputError.value = false;
  }

  return {
    userInput,
    guessed,
    lastFlipped,
    inputError,
    totalElements,
    progressPercent,
    checkAnswer,
    onFlipEnd,
    onInput,
  };
} 