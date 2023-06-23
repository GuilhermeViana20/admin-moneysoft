<script setup>
import { ref } from 'vue'

const props = defineProps({
    modelValue: String,
    withIcon: {
        type: Boolean,
        default: false,
    },
    options: {
        type: Array,
        required: true,
    },
})

const input = ref(null)

const emit = defineEmits(['update:modelValue'])

const focus = () => {
    input.value.focus()
}
</script>

<template>
    <select
        :class="[
            'py-2 border-gray-400 rounded-md',
            'focus:border-gray-400 focus:ring focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white',
            'dark:border-gray-600 dark:bg-dark-eval-1 dark:text-gray-300 dark:focus:ring-offset-dark-eval-1',
            {
                'px-4': !withIcon,
                'pl-11 pr-4': withIcon,
            },
        ]"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
    >
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.label }}
        </option>
    </select>
</template>