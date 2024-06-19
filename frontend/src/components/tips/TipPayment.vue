<script setup lang="ts">
import { ref, computed } from 'vue';
import tipsHeader from './TipsHeader.vue';
import keypad from './TipsKeypad.vue';
import TipPaymentRecord from './TipPaymentRecord.vue';
import axiosClient from "../../util/axios";

//funciones para manejar el pago
const totalTips = ref(1828);
const person = ref(0);
const selectedPaymentMethod = ref('');
const totalSum = ref(0);
const keypadInput = ref('');
const payments = ref([]);

// Calcula la propina por persona
const calculateTipPerPerson = computed(() => {
  if (person.value > 0) {
    return (totalTips.value / person.value).toFixed(2);
  }
  return '0.00';
});

// Selecciona el método de pago
const selectPaymentMethod = (method: string) => {
  selectedPaymentMethod.value = method;
};

// Actualiza el total de propinas
const updateTotalSum = (newTotalSum: number) => {
  totalSum.value = newTotalSum;
};

// Función para manejar el pago y hacer el post al backend
const handlePayment = async () => {
  if (selectedPaymentMethod.value && keypadInput.value) {
    try {
      const response = await axiosClient.post('/payments', {
        total: parseFloat(keypadInput.value),
        paymentMethod: selectedPaymentMethod.value
      });
      payments.value.push(parseFloat(keypadInput.value));
      totalSum.value = payments.value.reduce((sum, payment) => sum + payment, 0);
      keypadInput.value = '';
      alert('Pago realizado exitosamente!');
    } catch (error) {
      console.error('Error al realizar el pago:', error);
    }
  } else {
    alert('Por favor selecciona un método de pago e ingresa un monto.');
  }
};

// Función para editar el total de propinas
const editTotalTips = () => {
  const newTotalTips = prompt("Ingresa el nuevo total de propinas:", totalTips.value.toString());
  if (newTotalTips !== null) {
    totalTips.value = parseFloat(newTotalTips);
  }
};
</script>

<template>
  <div>
    //header de la pagina
    <tipsHeader />
    //div que divide en 3 partes la pagina
    <div class="grid grid-cols-3 gap-8 px-12 font-bold max-w-screen-xl mx-auto">
        //primera seccion
      <div class="space-y-8">
        <div class="space-y-4">
          <p class="text-orangetext text-sm">Total de Propinas</p>
          <div class="flex items-center space-x-2">
            <span class="bg-orangebg text-3xl text-center px-4 py-2 rounded">${{ totalTips }}</span>
            <button class="text-sm underline" @click="editTotalTips">Edit</button>
          </div>
        </div>
        <div>
          <p>¿Entre cuántos quieres dividir las propinas?</p>
          <div class="flex items-center space-x-4">
            <input 
              type="number"
              placeholder="#"
              class="border w-14 border-black text-center rounded-xl"
              v-model="person"
            >
            <p class="text-orangetext">$<span>{{ calculateTipPerPerson }}</span> x Persona</p>
          </div>
        </div>
        <div class="space-y-4">
          <p class="mt-12 mb-4"><span>icon</span> Elige el Método de Pago</p>
          <div class="grid grid-cols-2 gap-4">
            <button 
              class="w-full border p-6 rounded-xl col-span-1"
              :class="{ 'bg-blue-500 text-white': selectedPaymentMethod === 'Efectivo' }"
              @click="selectPaymentMethod('Efectivo')"
            >
              Efectivo
            </button>
            <button 
              class="w-full border p-6 rounded-xl col-span-1"
              :class="{ 'bg-blue-500 text-white': selectedPaymentMethod === 'BBVA 1234' }"
              @click="selectPaymentMethod('BBVA 1234')"
            >
              BBVA 1234
            </button>
            <button 
              class="w-full border p-6 rounded-xl col-span-1"
              :class="{ 'bg-blue-500 text-white': selectedPaymentMethod === 'Santander 1234' }"
              @click="selectPaymentMethod('Santander 1234')"
            >
              Santander 1234
            </button>
          </div>
        </div>
      </div>
      <keypad @input="keypadInput = $event" />
      <TipPaymentRecord @update-total-sum="updateTotalSum" />
    </div>

    <div class="grid grid-cols-2 px-12 font-bold mt-8">
      <div class="text-3xl">
        <div class="flex justify-between text-orangetext">
          <p>Total Pagado</p>
          <p>${{ totalSum }}</p>
        </div>
        <div class="flex justify-between mt-2">
          <p>Restante por Pagar</p>
          <p>${{ (totalTips - totalSum).toFixed(2) }}</p>
        </div>
      </div>
      <div class="flex items-center justify-end">
        <button 
          class="text-white bg-orangetext rounded-3xl py-4 px-8"
          @click="handlePayment"
        >
          Pagar Propinas
        </button>
      </div>
    </div>
  </div>
</template>
