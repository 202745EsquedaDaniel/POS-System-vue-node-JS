<script setup lang="ts">
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Props 
const props = defineProps({
  keys: {
    type: Array as () => string[],
    default: () => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', '✔️']
  },
  inputDisplay: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['input']);

// Estado para los dígitos ingresados
const display = ref(props.inputDisplay);

// Observa cambios en el prop inputDisplay y actualiza el display
watch(() => props.inputDisplay, (newVal) => {
  display.value = newVal;
});

// Método para emitir el valor del botón presionado y actualizar el display
const inputKey = (key: string) => {
  if (key === '✔️') {
    emit('input', display.value);
  } else {
    display.value += key;
    emit('input', display.value);
  }
};

// Método para limpiar el display
const clearDisplay = () => {
  display.value = '';
  emit('input', display.value);
};
</script>

<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md w-64">
    <div class="bg-white text-black text-right p-2 mb-2 rounded-lg shadow-inner h-10 flex items-center justify-end">
      <span>{{ display }}</span>
      <button @click="clearDisplay" class="ml-2 text-gray-500">✖️</button>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <button 
        v-for="key in keys" 
        :key="key" 
        @click="inputKey(key)"
        class="bg-gray-200 hover:bg-gray-300 text-black font-bold py-4 rounded-lg flex items-center justify-center"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>
