<script setup lang="ts">

defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
            d="M27.591 23.106A12.002 12.002 0 0 0 10.692 9.238 12 12 0 0 0 4.41 23.106" />
        <path stroke="currentColor" stroke-width="2"
            d="M17.022 20.776c.65.945.193 2.388-1.021 3.222-1.214.835-2.725.744-3.375-.202-.693-1.008-3.084-6.676-4.536-10.182-.273-.66.534-1.215 1.053-.723 2.752 2.613 7.186 6.877 7.879 7.885Z" />
        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
            d="M16 8v2.667M7.516 11.514 9.4 13.399M24.485 11.514 22.6 13.399M27.591 23.106l-2.575-.69M4.408 23.106l2.576-.69" />
    </svg>
</template>
