<script setup>
import QuiclStatisticsCard from '@/components/QuiclStatisticsCard.vue'
import { onMounted, ref } from 'vue'
import api from '@/api'
import { formToJSON } from 'axios'

const transactionsData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
const paymentsData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13].reverse()
const categoriesData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
const brandsData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]

const transactions = ref(null)
const payments = ref(null)
const brands = ref(null)
const categories = ref(null)

const loadData = async () => {
    try {
        const response = await api.get('/dashboard/values');
        transactions.value = response.data.transactions;
        payments.value = response.data.payments;
        brands.value = response.data.brands;
        categories.value = response.data.categories;
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    loadData();
});

</script>

<template>
    <section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <h2 class="sr-only">Quick statistics</h2>

        <!-- Transactions card -->
        <QuiclStatisticsCard
            :title="transactions && transactions.title"
            :chartData="transactionsData"
            :result="transactions && transactions.subtitle"
            :percentage="transactions && transactions.percentage"
            :actions="[{ title: 'Visualizar', to: '#' }]"
            icon="mdi:account-group-outline"
            :status="transactions && transactions.status"
            :statusIcon="transactions && transactions.status_icon"
            :statusIconClasses="transactions && transactions.status_icon_classes"
        />

        <!-- Payments card -->
        <QuiclStatisticsCard
            :title="payments && payments.title"
            :chartData="paymentsData"
            :result="payments && payments.subtitle"
            :percentage="payments && payments.percentage"
            :actions="[{ title: 'Visualizar', to: '#' }]"
            icon="mdi:eye-outline"
            :status="payments && payments.status"
            :statusIcon="payments && payments.status_icon"
            :statusIconClasses="payments && payments.status_icon_classes"
        />

        <!-- Categories card -->
        <QuiclStatisticsCard
            :title="categories && categories.title"
            :chartData="categoriesData"
            :result="categories && categories.subtitle"
            :percentage="categories && categories.percentage"
            :actions="[{ title: 'Visualizar', to: '#' }]"
            icon="mdi:cart-outline"
            :status="categories && categories.status"
            :statusIcon="categories && categories.status_icon"
            :statusIconClasses="categories && categories.status_icon_classes"
        />

        <!-- Brands card -->
        <QuiclStatisticsCard
            :title="brands && brands.title"
            :chartData="brandsData"
            :result="brands && brands.subtitle"
            :percentage="brands && brands.percentage"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:chart-pie"
            :status="brands && brands.status"
            :statusIcon="brands && brands.status_icon"
            :statusIconClasses="brands && brands.status_icon_classes"
        />
    </section>
</template>
