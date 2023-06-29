<script setup>
import api from '@/api';
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import PageWrapper from '@/components/PageWrapper.vue';
import Pagination from "@/components/Pagination.vue";
import Button from '@/components/Button.vue'
import Badge from "@/components/Badge.vue";

const router = useRouter();

const showTable = ref(false)
const open = ref(false)
const items = ref(null)
const selectedTransaction = ref(null)
const expense = ref(null)
const revenue = ref(null)
const pagination = ref(null)
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toast = useToast();

const setTransaction = async (item) => {
  open.value = true;
  selectedTransaction.value = item;
}

const deleteTransaction = async () => {
  try {
    const response = await api.delete('/transactions/' + selectedTransaction.value.id);
    toast.success(response.data, { timeout: 3000 });
    loadData();
  } catch (error) {
    toast.error(error.message, { timeout: 3000 });
    console.error(error);
  }
}

const update = async () => {
  try {

    toast.success(response.data, { timeout: 3000 });
    form.processing = false
  } catch (error) {
    toast.error(error.message, { timeout: 3000 });
    form.processing = false
    console.error(error);
  }
}

const edit = (item) => {
  router.push('/pages/edit/transaction/' + item.id)
}

const loadData = async (page) => {
  try {
    const response = await api.get('/transactions?page=' + page);

    items.value = response.data.transactions;
    expense.value = response.data.values.expense;
    revenue.value = response.data.values.revenue;
    pagination.value = response.data.pagination;

	showTable.value = true
  } catch (error) {
    console.error(error);
	showTable.value = true
  }
}

onMounted(() => {
  loadData();
});

</script>

<template>
	<PageWrapper title="Transações" url="/pages/add/transaction">
		<div class="overflow-x-auto">

            <div class='py-4'>
                <span>Receita: <Badge :title="revenue" badge="green" /></span>
                <span class='px-3'>Despesa: <Badge :title="expense" badge="red" /></span>
            </div>

			<div v-show='!showTable' class="text-center">
				<div role="status">
					<svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
						<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
					</svg>
					<span class="sr-only">Loading...</span>
				</div>
			</div>

			<table v-show='showTable' class="min-w-full">
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
						<td class="py-2 px-4">{{ item.amount }}</td>
						<td class="py-2 px-4">{{ item.executed_at }}</td>
						<td class="py-2 px-4">
							<Icon v-if="item.type === 'revenue'" width='35' icon="mdi:chevron-double-up" aria-hidden="true" :class="iconSizeClasses" />
							<Icon v-else width='30' icon="mdi:chevron-double-down" aria-hidden="true" :class="iconSizeClasses" />
						</td>
						<td class="py-2 px-4">{{ item.category.name }}</td>
						<td class="py-2 px-4">{{ item.card.description }}</td>
						<td>
							<Button iconOnly variant="secondary" @click="edit(item)" v-slot="{ iconSizeClasses }"
								class="hidden md:inline-flex mx-1" srText="Toggle dark mode">
								<Icon icon="mdi:pencil" aria-hidden="true" :class="iconSizeClasses" />
							</Button>

							<Button iconOnly variant="secondary" @click="setTransaction(item)" v-slot="{ iconSizeClasses }"
								class="hidden md:inline-flex mx-1" srText="Toggle dark mode">
								<Icon icon="mdi:trash-can-outline" aria-hidden="true" :class="iconSizeClasses" />
							</Button>
						</td>
					</tr>
				</tbody>
			</table>

      <Pagination :pagination="pagination" @page-change="loadData" />
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
										@click="deleteTransaction(), open = false">Remover</button>
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

<style scoped>
td {
	padding: 10px 0px;
}
</style>