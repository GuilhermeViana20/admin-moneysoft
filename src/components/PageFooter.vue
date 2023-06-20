<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
    <footer
        class="flex flex-col flex-shrink-0 w-full gap-2 px-6 py-4 lg:flex-row lg:justify-between"
    >
        <p class="text-sm text-gray-500 dark:text-gray-400">
            &#169;
            <span>{{ new Date().getFullYear() }}</span> Moneysoft, Todos os direitos reservados
        </p>

        <p class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>Criado com </span>
            <span>
                <span class="sr-only">love</span>
                <Icon icon="mdi:heart" aria-hidden="true" class="w-6 h-6 text-red-500" />
            </span>
            <span>por</span>
            <a
                href="https://github.com/Kamona-WD"
                target="_blank"
                class="text-blue-600 hover:underline"
            >
                Guilherme Viana
            </a>
        </p>
    </footer>
</template>
