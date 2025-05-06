<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32" fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21.018 9.334A4 4 0 1 1 24 16.001H4m7.346-9.778a2.667 2.667 0 1 1 1.988 4.444H4m11.346 15.111a2.667 2.667 0 1 0 1.988-4.444H4" />
    </svg>
</template>
