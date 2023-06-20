<script setup>
import { reactive } from 'vue'
import InputIconWrapper from '@/components/InputIconWrapper.vue'
import Label from '@/components/Label.vue'
import Input from '@/components/Input.vue'
import Checkbox from '@/components/Checkbox.vue'
import Button from '@/components/Button.vue'

const registerForm = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
    processing: false,
})

const register = () => {}
</script>

<template>
    <form @submit.prevent="register">
        <div class="grid gap-6">
            <!-- Name input -->
            <div class="space-y-2">
                <Label for="name" value="Nome" />

                <InputIconWrapper icon="mdi:account-outline">
                    <Input
                        withIcon
                        id="name"
                        type="text"
                        placeholder="Seu Nome"
                        class="block w-full"
                        v-model="registerForm.name"
                        required
                        autofocus
                        autocomplete="name"
                    />
                </InputIconWrapper>
            </div>

            <!-- Email input -->
            <div class="space-y-2">
                <Label for="email" value="E-mail" />

                <InputIconWrapper icon="mdi:email-outline">
                    <Input
                        withIcon
                        id="email"
                        type="email"
                        class="block w-full"
                        placeholder="Seu E-mail"
                        v-model="registerForm.email"
                        required
                        autocomplete="username"
                    />
                </InputIconWrapper>
            </div>

            <!-- Password input -->
            <div class="space-y-2">
                <Label for="password" value="Senha" />

                <InputIconWrapper icon="mdi:lock-outline">
                    <Input
                        withIcon
                        id="password"
                        type="password"
                        class="block w-full"
                        placeholder="Sua Senha"
                        v-model="registerForm.password"
                        required
                        autocomplete="new-password"
                    />
                </InputIconWrapper>
            </div>

            <!-- Password confirmation input -->
            <div class="space-y-2">
                <Label for="password_confirmation" value="Confirme Sua Senha" />

                <InputIconWrapper icon="mdi:lock-outline">
                    <Input
                        withIcon
                        id="password_confirmation"
                        type="password"
                        class="block w-full"
                        placeholder="Confirme Sua Senha"
                        v-model="registerForm.password_confirmation"
                        required
                        autocomplete="new-password"
                    />
                </InputIconWrapper>
            </div>

            <!-- Terms -->
            <div>
                <Label for="terms">
                    <div class="flex items-center">
                        <Checkbox
                            name="terms"
                            id="terms"
                            v-model:checked="registerForm.terms"
                        />

                        <div class="ml-2">
                            Estou de acordo com
                            <a
                                target="_blank"
                                href="#"
                                class="text-sm text-blue-600 underline hover:text-blue-900"
                            >
                                Termos de Serviço
                            </a>
                            e
                            <a
                                target="_blank"
                                href="#"
                                class="text-sm text-blue-600 underline hover:text-blue-900"
                            >
                                Política de Privacidade
                            </a>
                        </div>
                    </div>
                </Label>
            </div>

            <!-- Register button -->
            <div>
                <Button
                    type="submit"
                    class="justify-center w-full gap-2"
                    :disabled="registerForm.processing"
                    left-icon="mdi:account-plus-outline"
                >
                    <span>Cadastrar-se</span>
                </Button>
            </div>

            <!-- Login link -->
            <p class="text-sm text-gray-600 dark:text-gray-400">
                Já possui uma conta?
                <router-link
                    :to="{ name: 'Login' }"
                    class="text-blue-500 hover:underline"
                >
                    Entre
                </router-link>
            </p>
        </div>
    </form>
</template>
