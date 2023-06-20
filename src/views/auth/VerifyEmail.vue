<script setup>
import { reactive, ref } from 'vue'
import Button from '@/components/Button.vue'

const props = defineProps({
    status: String,
})

const verifyEmailForm = reactive({
    processing: false,
})

const verificationLinkSent = ref(false)

const submit = () => {
    verificationLinkSent.value = true
}
</script>

<template>
    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Obrigado por inscrever-se! Antes de começar, você poderia verificar seu endereço de e-mail clicando no link que acabamos de enviar para você? Se você não recebeu o e-mail, teremos o prazer de lhe enviar outro.
    </div>

    <div
        class="mb-4 text-sm font-medium text-green-600"
        v-if="verificationLinkSent"
    >
        A new verification link has been sent to the email address you provided
        during registration.
    </div>

    <form @submit.prevent="submit">
        <div class="flex items-center justify-between mt-4">
            <Button
                type="submit"
                :class="{ 'opacity-25': verifyEmailForm.processing }"
                :disabled="verifyEmailForm.processing"
            >
                Reenviar email de verificação
            </Button>

            <router-link
                :to="{ name: 'VerifyEmail' }"
                method="post"
                as="button"
                class="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
                Sair
            </router-link>
        </div>
    </form>
</template>
