<script setup lang="ts">

defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32" fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M24 4v24m0 0-4-4m4 4 4-4M9.333 21.333a1.333 1.333 0 1 0 0 2.667 1.333 1.333 0 0 0 0-2.667Zm0 0V16m0 6.667.01.01m5.324-.01a5.333 5.333 0 1 1-9.334-3.528V8a4 4 0 0 1 8 0v11.14a5.313 5.313 0 0 1 1.334 3.528Z" />
    </svg>
</template>
