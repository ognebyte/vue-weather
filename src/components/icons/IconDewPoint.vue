<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12.102 7.14s7.965 5.821 7.965 13.305c0 2.205-.84 4.32-2.333 5.88-1.494 1.559-3.52 2.434-5.632 2.434-2.113 0-4.139-.875-5.632-2.434-1.494-1.56-2.333-3.675-2.333-5.88 0-7.484 7.965-13.304 7.965-13.304Z" />
        <circle cx="23.964" cy="7.14" r="2.897" stroke="currentColor" stroke-width="2" />
    </svg>
</template>
