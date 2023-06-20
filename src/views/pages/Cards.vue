<script setup>
import { ref } from 'vue';
import PageWrapper from '@/components/PageWrapper.vue';
import Button from '@/components/Button.vue'
import { Icon } from '@iconify/vue'

const items = ref([
  {
    id: 1,
    main: 1,
    description: 'Inter',
    brand: 'https://i.ibb.co/WPHGQRB/mastercard.png',
    number: '2312 **** **** 2999',
    expiry: '03/23',
  },
  {
    id: 2,
    main: 0,
    description: 'Transação 2',
    brand: 'https://i.ibb.co/WPHGQRB/mastercard.png',
    number: '2312 **** **** 2999',
    expiry: '03/23',
  },
]);

</script>

<template>
  <PageWrapper title="Cartões" action="/add/card">
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Principal</th>
            <th class="py-2 px-4 border-b">Descrição</th>
            <th class="py-2 px-4 border-b">Bandeira</th>
            <th class="py-2 px-4 border-b">Número</th>
            <th class="py-2 px-4 border-b">Expiração</th>
            <th class="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" class="border-b text-center">
            <td class="py-2 px-4 text-center">
              <Icon class="mx-auto" v-if="item.main" icon="mdi:check-bold" v-show="!isDark" aria-hidden="true"
                :class="iconSizeClasses" />
              <Icon class="mx-auto" v-if="item.main" icon="mdi:white-check-bold" v-show="isDark" aria-hidden="true"
                :class="iconSizeClasses" />

              <Icon class="mx-auto" v-if="!item.main" icon="mdi:close-thick" v-show="!isDark" aria-hidden="true"
                :class="iconSizeClasses" />
              <Icon class="mx-auto" v-if="!item.main" icon="mdi:white-close-thick" v-show="isDark" aria-hidden="true"
                :class="iconSizeClasses" />
            </td>
            <td class="py-2 px-4">{{ item.description }}</td>
            <td class="py-2 px-4 text-center">
              <img class="mx-auto" :src="item.brand" alt="">
            </td>
            <td class="py-2 px-4">{{ item.number }}</td>
            <td class="py-2 px-4">{{ item.expiry }}</td>
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

table img {
  width: 40px;
}
</style>