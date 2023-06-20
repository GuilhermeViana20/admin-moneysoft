<script setup>
import { ref } from 'vue';
import PageWrapper from '@/components/PageWrapper.vue';
import Button from '@/components/Button.vue'
import { Icon } from '@iconify/vue'

const items = ref([
  {
    id: 1,
    description: 'Transação 1',
    value: 'R$ 100,00',
    executed_at: '2 de março, 2023',
    status: 'PAGO',
    type: 'Pagamento',
  },
  {
    id: 2,
    description: 'Transação 2',
    value: 'R$ 50,00',
    executed_at: '2 de março, 2023',
    status: 'NÃO PAGO',
    type: 'Recebimento',
  },
  // Adicione mais objetos de transação conforme necessário
]);

</script>

<template>
  <PageWrapper title="Pagamentos" action="/add/payment">
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
            <td class="py-2 px-4">{{ item.description }}</td>
            <td class="py-2 px-4">{{ item.value }}</td>
            <td class="py-2 px-4">{{ item.executed_at }}</td>
            <td class="py-2 px-4">{{ item.status }}</td>
            <td class="py-2 px-4">{{ item.type }}</td>
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