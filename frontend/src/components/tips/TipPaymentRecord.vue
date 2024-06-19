<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosClient from "../../util/axios";
import { Payment } from "../../models/payment.models";

const payments = ref<Payment[]>([]);
const totalSum = ref<number>(0);

const fetchPayment = async () => {
    try {
        const { data } = await axiosClient.get("/payments");
        payments.value = data;
        totalSum.value = data.reduce((sum: number, payment: Payment) => sum + payment.total, 0);
    } catch (error) {
        console.log(error);   
    }
}

onMounted(() => {
    fetchPayment();
});
</script>

<template>
    <div class="w-full px-6">
        <p>Pagos</p>
        <card 
        class="flex w-full border border-gray-300 p-2 justify-between px-4 rounded-2xl shadow-lg mt-6"
        v-for="payment in payments" :key="payment.id">
            <p>{{ payment.paymentMethod }} </p>
            <p>${{ payment.total }} </p>
        </card>
    </div>
</template>
