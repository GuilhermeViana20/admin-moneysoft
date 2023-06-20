<script setup>
import { ref } from 'vue';
import PageWrapper from '@/components/PageWrapper.vue';
import Button from '@/components/Button.vue'
import { Icon } from '@iconify/vue'

const items = ref([
	{
		id: 1,
		name: 'Inter',
		image: 'https://i.ibb.co/WPHGQRB/mastercard.png',
		created_at: '03 de Junho, 2023',
		active: 1
	},
	{
		id: 2,
		name: 'Transação 2',
		image: 'https://i.ibb.co/WPHGQRB/mastercard.png',
		created_at: '03 de Junho, 2023',
		active: 1
	},
]);

</script>

<template>
	<PageWrapper title="Bandeiras" action="/add/brand">
		<div class="overflow-x-auto">
			<table class="min-w-full">
				<thead>
					<tr>
						<th class="py-2 px-4 border-b">Imagem</th>
						<th class="py-2 px-4 border-b">Nome</th>
						<th class="py-2 px-4 border-b">Criado em</th>
						<th class="py-2 px-4 border-b">Ativo</th>
						<th class="py-2 px-4 border-b">Ações</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in items" :key="item.id" class="border-b text-center">
						<td class="py-2 px-4"><img class="mx-auto" :src="item.image" alt=""></td>
						<td class="py-2 px-4">{{ item.name }}</td>
						<td class="py-2 px-4">{{ item.created_at }}</td>
						<td class="py-2 px-4">
							<Icon class="mx-auto" v-if="item.active" icon="mdi:check-bold" v-show="!isDark" aria-hidden="true"
								:class="iconSizeClasses" />
							<Icon class="mx-auto" v-if="item.active" icon="mdi:white-check-bold" v-show="isDark" aria-hidden="true"
								:class="iconSizeClasses" />

							<Icon class="mx-auto" v-if="!item.active" icon="mdi:close-thick" v-show="!isDark" aria-hidden="true"
								:class="iconSizeClasses" />
							<Icon class="mx-auto" v-if="!item.active" icon="mdi:white-close-thick" v-show="isDark" aria-hidden="true"
								:class="iconSizeClasses" />
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

table img {
	width: 40px;
}
</style>