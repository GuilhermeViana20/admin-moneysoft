<script setup>
import PageWrapper from '@/components/PageWrapper.vue';
import Button from '@/components/Button.vue'

import InputIconWrapper from '@/components/InputIconWrapper.vue'
import Input from '@/components/Input.vue'
import Date from '@/components/Date.vue'
import Select from '@/components/Select.vue'

import { isDark } from '@/composables'
import api from '@/api'
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import Label from '@/components/Label.vue'

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
    { label: 'Despesa', value: 'expense' },
    { label: 'Receita', value: 'revenue' },
];

const form = reactive({
    card_id: '',
    executed_at: '',
    description: '',
    amount: '',
    type: 'expense',
    category_id: '',
    remember: false,
    processing: false,
    user_id: 1
})

const loadCards = async () => {
    try {
        const response = await api.get('/cards');
        cards.value = response.data;

        cards.value = cards.value.map(card => ({
            value: card.id,
            label: card.description,
        }));

        if (cards.value.length > 0) {
            form.card_id = cards.value[0].value
        }
    } catch (error) {
        console.error(error);
    }
}

const loadCategories = async () => {
    try {
        const response = await api.get('/categories');
        categories.value = response.data;

        categories.value = categories.value.map(category => ({
            value: category.id,
            label: category.name,
        }));

        if (categories.value.length > 0) {
            form.category_id = categories.value[0].value
        }
    } catch (error) {
        console.error(error);
    }
}

const save = async () => {
    try {
        form.processing = true

        const response = await api.post('/transactions', form);

        toast.success(response.data, { timeout: 3000 });

        form.processing = false

    } catch (error) {
        toast.error(error.message, { timeout: 3000 });

        form.processing = false
    }
}

loadCards();
loadCategories();

</script>

<template>
	<PageWrapper title="Adicionar Transação" url="/pages/transactions" action='Voltar' icon='mdi:arrow-left'>

        <form @submit.prevent="save">

            <div class="grid gap-6">

                <div class="grid grid-cols-1 gap-x-6 gap-y-8  sm:grid-cols-2">
                    <!-- Card input -->
                    <div class="space-y-2">
                        <Label for="card" value="Cartão" />

                        <InputIconWrapper icon="mdi:email-outline">
                            <Select
                                withIcon
                                id='card'
                                class="block w-full"
                                v-model="form.card_id"
                                :options="cards"
                                required
                                autofocus
                            />
                        </InputIconWrapper>
                    </div>

                    <!-- Executed at input -->
                    <div class="space-y-2">
                        <Label for="executed_at" value="Executado Em" />

                        <InputIconWrapper icon="mdi:calendar">
                            <Date
                                withIcon
                                id='executed_at'
                                class="block w-full"
                                v-model='form.executed_at'
                                required
                                autofocus
                            />
                        </InputIconWrapper>
                    </div>

                    <!-- Description input -->
                    <div class="space-y-2">
                        <Label for="description" value="Descrição" />

                        <InputIconWrapper icon="mdi:email-outline">
                            <Input
                                withIcon
                                id='description'
                                class="block w-full"
                                v-model="form.description"
                                autofocus
                            />
                        </InputIconWrapper>
                    </div>

                    <!-- Amount input -->
                    <div class="space-y-2">
                        <Label for="amount" value="Valor" />

                        <InputIconWrapper icon="mdi:email-outline">
                            <Input
                                withIcon
                                id='amount'
                                class="block w-full"
                                v-model="form.amount"
                                required
                                autofocus
                            />
                        </InputIconWrapper>
                    </div>

                    <!-- Type input -->
                    <div class="space-y-2">
                        <Label for="type" value="Tipo" />

                        <InputIconWrapper icon="mdi:email-outline">
                            <Select
                                withIcon
                                id='type'
                                class="block w-full"
                                v-model="form.type"
                                :options="types"
                                required
                                autofocus
                            />
                        </InputIconWrapper>
                    </div>

                    <!-- Category id input -->
                    <div class="space-y-2">
                        <Label for="category_id" value="Categoria" />

                        <InputIconWrapper icon="mdi:email-outline">
                            <Select
                                withIcon
                                id='card'
                                class="block w-full"
                                v-model="form.category_id"
                                :options="categories"
                                required
                                autofocus
                            />
                        </InputIconWrapper>
                    </div>
                </div>

                <!-- Login button -->
                <div>
                    <Button
                        type="submit"
                        class="justify-center w-full gap-2"
                        :disabled="form.processing"
                        left-icon="mdi:login"
                    >
                        <span>Salvar Transação</span>
                    </Button>
                </div>
            </div>
        </form>

	</PageWrapper>
</template>