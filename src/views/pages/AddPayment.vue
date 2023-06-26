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

// Dados do Formulário
const type = ref(1)
const value = ref(0)
const user_id = ref(1)

const types = [
    { label: 'Pagamento', value: 'pay' },
    { label: 'Recebimento', value: 'receive' },
];

const status_list = [
    { label: 'PAGO', value: 'paid' },
    { label: 'NÃO PAGO', value: 'unpaid' },
]

const form = reactive({
    name: '',
    amount: '',
    expiry_date: '',
    status: 'paid',
    type: 'pay',
    period: '',
    remember: false,
    processing: false,
    user_id: 1
})

const save = async () => {
    try {
        form.processing = true

        const response = await api.post('/payments', form);

        toast.success(response.data, { timeout: 3000 });

        form.processing = false

    } catch (error) {
        toast.error(error.message, { timeout: 3000 });

        form.processing = false
    }
}

</script>

<template>
    <PageWrapper title="Adicionar Pagamento" url="/pages/transactions" action='Voltar' icon='mdi:arrow-left'>

        <form @submit.prevent="save">

            <div class="grid gap-6">

                <div class="grid grid-cols-1 gap-x-6 gap-y-8  sm:grid-cols-2">

                    <!-- Name input -->
                    <div class="space-y-2">
                        <Label for="name" value="Nome" />

                        <InputIconWrapper icon="mdi:email-outline">
                            <Input
                                withIcon
                                id='name'
                                class="block w-full"
                                v-model="form.name"
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

                    <!-- Expiry_date at input -->
                    <div class="space-y-2">
                        <Label for="expiry_date" value="Executado Em" />

                        <InputIconWrapper icon="mdi:calendar">
                            <Date
                                withIcon
                                id='expiry_date'
                                class="block w-full"
                                v-model='form.expiry_date'
                                required
                                autofocus
                            />
                        </InputIconWrapper>
                    </div>

                    <!-- Status input -->
                    <div class="space-y-2">
                        <Label for="status" value="Status" />

                        <InputIconWrapper icon="mdi:email-outline">
                            <Select
                                withIcon
                                id='status'
                                class="block w-full"
                                v-model="form.status"
                                :options="status_list"
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

                    <!-- Period input -->
                    <div class="space-y-2">
                        <Label for="executed_at" value="Período" />

                        <InputIconWrapper icon="mdi:calendar">
                            <Date
                                withIcon
                                id='period'
                                class="block w-full"
                                v-model='form.period'
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