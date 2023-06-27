<script setup>
import { ref } from 'vue';
import PageWrapper from '@/components/PageWrapper.vue';
import Button from '@/components/Button.vue'
import { Icon } from '@iconify/vue'
import api from '@/api'

const items = ref(null)
const showTable = ref(false)

const loadData = async () => {
    try {
        const response = await api.get('/payments');
        items.value = response.data.payments;
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
                <Icon v-if="item.status === 'paid' " width='30' icon="mdi:check" v-show="!isDark" aria-hidden="true" :class="iconSizeClasses" />
                <Icon v-else width='30' icon="mdi:close" v-show="!isDark" aria-hidden="true" :class="iconSizeClasses" />
            </td>
            <td class="py-2 px-4">
                <Icon v-if="item.type === 'pay' " width='30' icon="mdi:bank-transfer-out" v-show="!isDark" aria-hidden="true" :class="iconSizeClasses" />
                <Icon v-else width='30' icon="mdi:bank-transfer-in" v-show="!isDark" aria-hidden="true" :class="iconSizeClasses" />
            </td>
            <td>
              <Button iconOnly variant="secondary" @click="toggleDarkMode()" v-slot="{ iconSizeClasses }"
                class="hidden md:inline-flex mx-1" srText="Toggle dark mode">
                <Icon icon="mdi:pencil" v-show="!isDark" aria-hidden="true" :class="iconSizeClasses" />
                <Icon icon="mdi:white-pencil" v-show="isDark" aria-hidden="true" :class="iconSizeClasses" />
              </Button>

              <Button iconOnly variant="secondary" @click="toggleDarkMode()" v-slot="{ iconSizeClasses }"
                class="hidden md:inline-flex mx-1" srText="Toggle dark mode">
                <Icon icon="mdi:trash-can-outline" v-show="!isDark" aria-hidden="true" :class="iconSizeClasses" />
                <Icon icon="mdi:white-trash-can-outline" v-show="isDark" aria-hidden="true" :class="iconSizeClasses" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageWrapper>
</template>

<style scoped>
td {
  padding: 10px 0px;
}
</style>