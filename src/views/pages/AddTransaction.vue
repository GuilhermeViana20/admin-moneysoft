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

</script>

<template>
	<PageWrapper title="Adicionar Transação" action="/add/transaction">
		<div class="overflow-x-auto">
			<form>
				<div class="space-y-12">
				  <div class="border-b border-gray-900/10 pb-12">
					<div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
			
					  <div class="col-span-full">
						<label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
						<div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
						  <div class="text-center">
							<PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
							<div class="mt-4 flex text-sm leading-6 text-gray-600">
							  <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
								<span>Upload a file</span>
								<input id="file-upload" name="file-upload" type="file" class="sr-only" />
							  </label>
							  <p class="pl-1">or drag and drop</p>
							</div>
							<p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
			
				  <div class="border-b border-gray-900/10 pb-12">
					<h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
					<p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
			
					<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					  <div class="sm:col-span-3">
						<label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
						<div class="mt-2">
						  <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					  </div>
			
					  <div class="sm:col-span-3">
						<label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
						<div class="mt-2">
						  <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					  </div>
			
					  <div class="sm:col-span-4">
						<label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
						<div class="mt-2">
						  <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					  </div>
			
					  <div class="sm:col-span-3">
						<label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
						<div class="mt-2">
						  <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
							<option>United States</option>
							<option>Canada</option>
							<option>Mexico</option>
						  </select>
						</div>
					  </div>
			
					  <div class="col-span-full">
						<label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
						<div class="mt-2">
						  <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					  </div>
			
					  <div class="sm:col-span-2 sm:col-start-1">
						<label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
						<div class="mt-2">
						  <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					  </div>
			
					  <div class="sm:col-span-2">
						<label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
						<div class="mt-2">
						  <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					  </div>
			
					  <div class="sm:col-span-2">
						<label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
						<div class="mt-2">
						  <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>
					  </div>
					</div>
				  </div>

				</div>
			
				<div class="mt-6 flex items-center justify-end gap-x-6">
				  <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
				  <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
				</div>
			  </form>
		</div>
	</PageWrapper>
</template>

<style scoped>
td {
	padding: 10px 0px;
}
</style>