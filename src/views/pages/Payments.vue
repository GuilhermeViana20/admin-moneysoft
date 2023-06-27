<script setup>
import api from '@/api'
import { ref } from 'vue';
import { Icon } from '@iconify/vue'
import PageWrapper from '@/components/PageWrapper.vue';
import Button from '@/components/Button.vue'
import Badge from '@/components/Badge.vue'
import Pagination from '@/components/Pagination.vue'

const showTable = ref(false)
const items = ref(null)
const pay_paid = ref(null)
const pay_unpaid = ref(null)
const receive_paid = ref(null)
const receive_unpaid = ref(null)
const pagination = ref(null)

const loadData = async (page) => {
    try {
        const response = await api.get('/payments?page=' + page);

        items.value = response.data.payments;
        pay_paid.value = response.data.values.pay_paid;
        pay_unpaid.value = response.data.values.pay_unpaid;
        receive_paid.value = response.data.values.receive_paid;
        receive_unpaid.value = response.data.values.receive_unpaid;
        pagination.value = response.data.pagination;

        showTable.value = true
    } catch (error) {
        console.error(error);
        showTable.value = true
    }
}

loadData();

</script>

<template>
  <PageWrapper title="Pagamentos" url="/pages/add/payment">
    <div class="overflow-x-auto">

      <div class='py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h6>Pagamentos:</h6>
          <span>Realizados: <Badge :title="pay_paid" badge="green" /></span>
          <span class='px-3'>Pendentes: <Badge :title="pay_unpaid" badge="red" /></span>
        </div>
        <div>
          <h6>Receitas:</h6>
          <span>Realizados: <Badge :title="receive_paid" badge="green" /></span>
          <span class='px-3'>Pendentes: <Badge :title="receive_unpaid" badge="red" /></span>
        </div>
      </div>

      <table class="min-w-full">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Descrição</th>
            <th class="py-2 px-4 border-b">Valor</th>
            <th class="py-2 px-4 border-b">Expira Em</th>
            <th class="py-2 px-4 border-b">Status</th>
            <th class="py-2 px-4 border-b">Tipo</th>
            <th class="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b text-center">
            <td class="py-2 px-4">{{ item.name }}</td>
            <td class="py-2 px-4">{{ item.amount }}</td>
            <td class="py-2 px-4">{{ item.expiry_date }}</td>
            <td class="py-2 px-4">
                <Icon v-if="item.status === 'paid' " width='30' icon="mdi:check" aria-hidden="true" :class="iconSizeClasses" />
                <Icon v-else width='30' icon="mdi:close" aria-hidden="true" :class="iconSizeClasses" />
            </td>
            <td class="py-2 px-4">
                <Icon v-if="item.type === 'pay' " width='30' icon="mdi:bank-transfer-out" aria-hidden="true" :class="iconSizeClasses" />
                <Icon v-else width='30' icon="mdi:bank-transfer-in" aria-hidden="true" :class="iconSizeClasses" />
            </td>
            <td>
              <Button iconOnly variant="secondary" v-slot="{ iconSizeClasses }"
                class="hidden md:inline-flex mx-1" srText="Toggle dark mode">
                <Icon icon="mdi:pencil" aria-hidden="true" :class="iconSizeClasses" />
              </Button>

              <Button iconOnly variant="secondary" v-slot="{ iconSizeClasses }"
                class="hidden md:inline-flex mx-1" srText="Toggle dark mode">
                <Icon icon="mdi:trash-can-outline" aria-hidden="true" :class="iconSizeClasses" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination :pagination="pagination" @page-change="loadData" />

    </div>
  </PageWrapper>
</template>

<style scoped>
td {
  padding: 10px 0px;
}
</style>