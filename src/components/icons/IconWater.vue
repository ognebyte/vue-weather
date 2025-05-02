<script setup lang="ts">

defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32" fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m3.334 7.333.821.821a4.024 4.024 0 0 0 5.69 0l.31-.31a4.024 4.024 0 0 1 5.69 0l.31.31a4.024 4.024 0 0 0 5.69 0l.31-.31a4.023 4.023 0 0 1 5.69 0l.822.822M3.334 15.333l.821.821a4.023 4.023 0 0 0 5.69 0l.31-.31a4.024 4.024 0 0 1 5.69 0l.31.31a4.023 4.023 0 0 0 5.69 0l.31-.31a4.023 4.023 0 0 1 5.69 0l.822.822M3.334 23.333l.821.821a4.023 4.023 0 0 0 5.69 0l.31-.31a4.024 4.024 0 0 1 5.69 0l.31.31a4.023 4.023 0 0 0 5.69 0l.31-.31a4.023 4.023 0 0 1 5.69 0l.822.822" />
    </svg>
</template>
