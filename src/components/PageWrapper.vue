<script setup>
import Button from '@/components/Button.vue'

defineProps({
    title: String,
    action: String,
})
</script>

<template>
    <!-- Page Heading -->
    <header v-if="$slots.header || title">
        <div class="p-4 sm:p-6 flex justify-between items-center">
            <slot name="header">
                <h2 class="text-xl font-semibold leading-tight">{{ title }}</h2>
            </slot>

            <slot name="action">
                <template v-if="action">
                    <router-link :to="action">
                        <Button variant="black" class="justify-center max-w-sm gap-2" left-icon="mdi:plus">
                            <span>Adicionar</span>
                        </Button>
                    </router-link>
                </template>
            </slot>                     
        </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1" :class="{ 'mt-6': !$slots.header }">
        <div class="grid gap-6 px-4 sm:px-6">
            <slot />
        </div>
    </main>
</template>
