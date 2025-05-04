<script setup lang="ts">

defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M20.885 18.302a5.71 5.71 0 0 1-1.61 3.985 5.477 5.477 0 0 1-2.053 1.329m7.326-4.938c0-8.031-8.547-14.278-8.547-14.278s-8.548 6.247-8.548 14.278c0 2.366.9 4.636 2.504 6.31C11.56 26.66 13.734 27.6 16 27.6c2.267 0 4.44-.94 6.044-2.613 1.603-1.673 2.503-3.943 2.503-6.31Z" />
    </svg>
</template>
