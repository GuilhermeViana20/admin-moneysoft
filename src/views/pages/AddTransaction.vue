<script setup>
import PageWrapper from '@/components/PageWrapper.vue';
import Button from '@/components/Button.vue'

import { isDark } from '@/composables'
import api from '@/api'
import { ref } from 'vue'
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toast = useToast();

// Dados da API
const cards = ref(null)
const categories = ref(null)

// Dados do Formulário
const type = ref(1)
const card_id = ref(null)
const category_id = ref(null)
const executed_at = ref(null)
const description = ref(null)
const value = ref(0)
const user_id = ref(1)

const types = [
    { id: 1, name: 'Despesa', value: 'expense' },
    { id: 2, name: 'Receita', value: 'revenue' },
];

const loadCards = async () => {
    try {
        const response = await api.get('/cards');
        cards.value = response.data;

        if (cards.value.length > 0) {
            card_id.value = cards.value[0].id
        }
    } catch (error) {
        console.error(error);
    }
}

const loadCategories = async () => {
    try {
        const response = await api.get('/categories');
        categories.value = response.data;

        if (categories.value.length > 0) {
            category_id.value = categories.value[0].id
        }
    } catch (error) {
        console.error(error);
    }
}

const validateForm = () => {
    if (
        card_id.value &&
        category_id.value &&
        executed_at.value &&
        description.value &&
        value.value !== null &&
        value.value !== ''
    ) {
        return true;
    } else {
        return false;
    }
};

const saveTransaction = async () => {
    try {
        const validate = validateForm()

        if (validate) {
            const response = await api.post('/transactions', {
                'card_id': card_id.value,
                'category_id': category_id.value,
                'description': description.value,
                'executed_at': executed_at.value,
                'type': type.value,
                'user_id': user_id.value,
                'value': value.value
            });

            toast.success(response.data, { timeout: 3000 });
        }

        toast.warning('Por favor, preencha todos os campos!', { timeout: 3000 });
    } catch (error) {
        toast.error(error.message, { timeout: 3000 });
    }
}

loadCards();
loadCategories();

</script>

<template>
	<PageWrapper title="Adicionar Transação" url="/pages/transactions" action='Voltar' icon='mdi:arrow-left'>
		<div class="overflow-x-auto">
            <div class="space-y-12">
                <div :class="!isDark ?? 'border-gray-900/10'" class="border-b pb-12">
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div class="sm:col-span-3">
                            <label :class="!isDark ?? 'text-gray-900'" for="card"
                                class="block text-sm font-medium leading-6">Cartão</label>
                            <div class="mt-2">
                                <select v-model='card_id' id='card' name="card"
                                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option v-for='(card, index) in cards' :key='index' :value='card.id'>{{ card.first_digits }} **** **** {{ card.last_digits }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label :class="!isDark ?? 'text-gray-900'" for="executed_at" class="block text-sm font-medium leading-6">
                                Executado em
                            </label>
                            <div class="mt-2">
                                <input v-model='executed_at' id='executed_at' name="executed_at" type="date"
                                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label :class="!isDark ?? 'text-gray-900'" for="description"
                                class="block text-sm font-medium leading-6">Descrição</label>
                            <div class="mt-2">
                                <input v-model='description' id='description' name="description" type="text"
                                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label :class="!isDark ?? 'text-gray-900'" for="value"
                                class="block text-sm font-medium leading-6">Valor</label>
                            <div class="mt-2">
                                <input v-model='value' :class="!isDark ?? 'text-gray-900'" type="number" name="value" id="value"
                                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label :class="!isDark ?? 'text-gray-900'" for="type"
                                class="block text-sm font-medium leading-6">Tipo</label>
                            <div class="mt-2">
                                <select v-model='type' id="type" name="type"
                                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option v-for='type in types' :key='type.id' :value='type.id'>
                                        {{ type.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label :class="!isDark ?? 'text-gray-900'" for="category"
                                class="block text-sm font-medium leading-6">Categoria</label>
                            <div class="mt-2">
                                <select v-model='category_id' id="category" name="category"
                                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                    <option v-for='category in categories' :key='category.id' :value='category.id'>
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button @click='saveTransaction()' type="submit"
                    class="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Salvar
                    Transação</button>
            </div>
		</div>
	</PageWrapper>
</template>