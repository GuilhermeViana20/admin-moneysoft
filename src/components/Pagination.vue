<script setup>
import { Icon } from '@iconify/vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
    pagination: Array,
});

const emit = defineEmits(['pageChange']);

function loadData(page) {
    emit('pageChange', page);
}
</script>

<template>
    <div>
        <nav v-if="pagination" id="pagination" aria-label="Page navigation example" class="text-right pt-5">
            <ul class="inline-flex items-center -space-x-px">
                <li>
                    <a :class="pagination.current_page === 1 ? 'disabled-link' : ''" @click="(pagination.current_page - 1) >= 1 ? loadData(pagination.current_page - 1) : ''" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Previous</span>
                        <Icon :width="20" icon="mdi:chevron-left" aria-hidden="true" :class="iconSizeClasses" />
                    </a>
                </li>
                <li v-for="page in pagination.last_page" :key="page">
                    <a
                        @click="loadData(page)"
                        :class="[page === pagination.current_page ?
              ['z-10', 'px-3', 'py-2', 'leading-tight', 'text-blue-600', 'border', 'border-blue-300', 'bg-blue-50', 'hover:bg-blue-100', 'hover:text-blue-700', 'dark:border-gray-700', 'dark:bg-gray-700', 'dark:text-white'] :
              ['px-3', 'py-2', 'leading-tight', 'text-gray-500', 'bg-white', 'border', 'border-gray-300', 'hover:bg-gray-100', 'hover:text-gray-700', 'dark:bg-gray-800', 'dark:border-gray-700', 'dark:text-gray-400', 'dark:hover:bg-gray-700', 'dark:hover:text-white']
            ]"
                    >
                        {{ page }}
                    </a>
                </li>
                <li>
                    <a :class="pagination.current_page === pagination.last_page ? 'disabled-link' : ''" @click="(pagination.current_page + 1) <= pagination.last_page ? loadData(pagination.current_page + 1) : ''" class="block px-3 py-2 mr-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span class="sr-only">Next</span>
                        <Icon :width="20" icon="mdi:chevron-right" aria-hidden="true" :class="iconSizeClasses" />
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style>
#pagination li {
    cursor: pointer;
}

.disabled-link {
    pointer-events: none;
    opacity: 0.5;
}
</style>
