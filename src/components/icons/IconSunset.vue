<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m8 16-1.333-1.333M24 16l1.333-1.333M4 24h24M6.667 28h18.666m-16-4a6.667 6.667 0 1 1 13.334 0M16 4v9.333m0 0 4-4m-4 4-4-4" />
    </svg>
</template>
