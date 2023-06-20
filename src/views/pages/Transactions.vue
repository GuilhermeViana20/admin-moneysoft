<script setup>
import { ref } from 'vue';
import PageWrapper from '@/components/PageWrapper.vue';
import Button from '@/components/Button.vue'
import { Icon } from '@iconify/vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(false)
const selectedTransaction = ref(null)

const items = ref([
	{
		id: 1,
		description: 'Transação 1',
		value: 'R$ 100,00',
		executed_at: '2 de março, 2023',
		type: 'Receita',
		category: 'Alimentação',
		card: 'Nubank',
	},
	{
		id: 2,
		description: 'Transação 2',
		value: 'R$ 50,00',
		executed_at: '2 de março, 2023',
		type: 'Despesa',
		category: 'Transporte',
		card: 'Inter',
	},
	// Adicione mais objetos de transação conforme necessário
]);

const deleteTransaction = (item) => {
	console.log(item)
	open.value = true;
	selectedTransaction.value = item;
}

</script>

<template>
	<PageWrapper title="Transações" action="/pages/add/transaction">
		<div class="overflow-x-auto">
			<table class="min-w-full">
				<thead>
					<tr>
						<th class="py-2 px-4 border-b">Descrição</th>
						<th class="py-2 px-4 border-b">Valor</th>
						<th class="py-2 px-4 border-b">Data de Execução</th>
						<th class="py-2 px-4 border-b">Tipo</th>
						<th class="py-2 px-4 border-b">Categoria</th>
						<th class="py-2 px-4 border-b">Cartão</th>
						<th class="py-2 px-4 border-b">Ações</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in items" :key="item.id" class="border-b text-center">
						<td class="py-2 px-4">{{ item.description }}</td>
						<td class="py-2 px-4">{{ item.value }}</td>
						<td class="py-2 px-4">{{ item.executed_at }}</td>
						<td class="py-2 px-4">
							<span v-if="item.type === 'revenue'">
								<Icon icon="mdi:weather-night" v-show="!isDark" aria-hidden="true"
									:class="iconSizeClasses" />
							</span>
							{{ item.type }}
						</td>
						<td class="py-2 px-4">{{ item.category }}</td>
						<td class="py-2 px-4">{{ item.card }}</td>
						<td>
							<Button iconOnly variant="secondary" @click="toggleDarkMode()" v-slot="{ iconSizeClasses }"
								class="hidden md:inline-flex mx-1" srText="Toggle dark mode">
								<Icon icon="mdi:pencil" v-show="!isDark" aria-hidden="true" :class="iconSizeClasses" />
								<Icon icon="mdi:white-pencil" v-show="isDark" aria-hidden="true" :class="iconSizeClasses" />
							</Button>

							<Button iconOnly variant="secondary" @click="deleteTransaction(item)" v-slot="{ iconSizeClasses }"
								class="hidden md:inline-flex mx-1" srText="Toggle dark mode">
								<Icon icon="mdi:trash-can-outline" v-show="!isDark" aria-hidden="true"
									:class="iconSizeClasses" />
								<Icon icon="mdi:white-trash-can-outline" v-show="isDark" aria-hidden="true"
									:class="iconSizeClasses" />
							</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<TransitionRoot as="template" :show="open">
			<Dialog as="div" class="relative z-10" @close="open = false">
				<TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
					leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
					<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</TransitionChild>

				<div class="fixed inset-0 z-10 overflow-y-auto">
					<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<TransitionChild as="template" enter="ease-out duration-300"
							enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
							leave-from="opacity-100 translate-y-0 sm:scale-100"
							leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<DialogPanel
								class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<div class="sm:flex sm:items-start">
										<div
											class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<Icon icon="mdi:alert" v-show="!isDark" aria-hidden="true"
												:class="iconSizeClasses" />
										</div>
										<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
												{{ selectedTransaction.name }}
											</DialogTitle>
											<div class="mt-2">
												<p class="text-sm text-gray-500">
													Tem certeza que deseja remover {{ selectedTransaction.name }}
													? A transação será removida
													permanentemente. Esta ação
													não pode ser desfeita.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button type="button"
										class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
										@click="open = false">Remover</button>
									<button type="button"
										class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
										@click="open = false" ref="cancelButtonRef">Cancelar</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</TransitionRoot>
	</PageWrapper>
</template>

<style scoped>td {
	padding: 10px 0px;
}</style>