<script setup>
import QuiclStatisticsCard from '@/components/QuiclStatisticsCard.vue'

const transactionsData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
const paymentsData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13].reverse()
const categoriesData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
const brandsData = [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13]
</script>

<template>
    <section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <h2 class="sr-only">Quick statistics</h2>

        <!-- Transactions card -->
        <QuiclStatisticsCard
            title="Transações"
            :chartData="transactionsData"
            result="12.4k"
            percentage="32.40%"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:account-group-outline"
        />

        <!-- Payments card -->
        <QuiclStatisticsCard
            title="Pagamentos"
            :chartData="paymentsData"
            result="-2.6k"
            status="danger"
            percentage="-2.10%"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:eye-outline"
        />

        <!-- Categories card -->
        <QuiclStatisticsCard
            title="Categorias"
            :chartData="categoriesData"
            result="34.4k"
            status="warning"
            percentage="0.60%"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:cart-outline"
        />

        <!-- Brands card -->
        <QuiclStatisticsCard
            title="Bandeiras"
            :chartData="brandsData"
            result="15.6%"
            percentage="7.20%"
            :actions="[{ title: 'View', to: '#' }]"
            icon="mdi:chart-pie"
        />
    </section>
</template>
