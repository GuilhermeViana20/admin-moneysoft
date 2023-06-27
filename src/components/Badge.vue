<template>
    <span :class="badgeClasses">{{ title }}</span>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        badge: {
            type: String,
            default: "default",
            validator: (value) => {
                const validStyles = ["blue", "gray", "red", "green", "yellow", "indigo", "purple", "pink"];
                return validStyles.includes(value);
            },
        },
    },
    computed: {
        badgeClasses() {
            return `
                inline-flex
                items-center
                rounded-md
                bg-${this.badge}-100
                text-${this.badge}-600
                text-xs
                font-medium
                px-2.5
                py-0.5
                rounded
                dark:bg-${this.badge}-900
                dark:text-${this.badge}-300
                font-semibold
            `;
        },
    },
};
</script>