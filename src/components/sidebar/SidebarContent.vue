<script setup>
import { useRouter } from 'vue-router'
import PerfrectScrollbar from '@/components/PerfectScrollbar.vue'
import SidebarLink from '@/components/sidebar/SidebarLink.vue'
import SidebarCollapsible from '@/components/sidebar/SidebarCollapsible.vue'
import SidebarCollapsibleItem from '@/components/sidebar/SidebarCollapsibleItem.vue'

const isCurrentRoute = (routeName) => {
    return useRouter().currentRoute.value.name == routeName
}

const isCurrentPath = (path) => {
    return useRouter().currentRoute.value.path.startsWith(path)
}
</script>

<template>
    <PerfrectScrollbar
        tagname="nav"
        aria-label="main"
        class="relative flex flex-col flex-1 max-h-full gap-4 px-3"
    >
        <SidebarLink
            title="Dashboard"
            :to="{ name: 'Dashboard' }"
            :active="isCurrentRoute('Dashboard')"
            icon="mdi:view-dashboard"
        />

        <SidebarLink
            title="Transações"
            :to="{ name: 'Transactions' }"
            :active="isCurrentRoute('Transactions')"
            icon="mdi:swap-horizontal"
        />

        <SidebarLink
            title="Pagamentos"
            :to="{ name: 'Payments' }"
            :active="isCurrentRoute('Payments')"
            icon="mdi:swap-horizontal"
        />

        <SidebarLink
            title="Cartões"
            :to="{ name: 'Cards' }"
            :active="isCurrentRoute('Cards')"
            icon="mdi:swap-horizontal"
        />

        <SidebarLink
            title="Bandeiras"
            :to="{ name: 'Brands' }"
            :active="isCurrentRoute('Brands')"
            icon="mdi:swap-horizontal"
        />

        <SidebarLink
            title="Categorias"
            :to="{ name: 'Categories' }"
            :active="isCurrentRoute('Categories')"
            icon="mdi:swap-horizontal"
        />

        <!-- <SidebarCollapsible
            icon="mdi:note-outline"
            title="Pages"
            :active="isCurrentPath('/pages')"
        >
            <SidebarCollapsibleItem
                :to="{ name: 'Blank' }"
                title="Blank"
                :active="isCurrentRoute('Blank')"
            />
        </SidebarCollapsible> -->

        <SidebarCollapsible icon="mdi:shield-star-outline" title="Autenticação">
            <SidebarCollapsibleItem :to="{ name: 'Login' }" title="Login" />
            <SidebarCollapsibleItem
                :to="{ name: 'Register' }"
                title="Cadastro"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'VerifyEmail' }"
                title="Verificar E-mail"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'ForgotPassword' }"
                title="Esqueceu sua Senha"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'ResetPassword' }"
                title="Alterar Senha"
            />
            <SidebarCollapsibleItem
                :to="{ name: 'ConfirmPassword' }"
                title="Confirmar Senha"
            />
        </SidebarCollapsible>
    </PerfrectScrollbar>
</template>
