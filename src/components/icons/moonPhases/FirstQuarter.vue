<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path fill="rgb(241, 241, 241)" stroke="currentColor"
            d="M15.999 3.166c7.088 0 12.834 5.746 12.834 12.833 0 7.088-5.746 12.834-12.834 12.834-7.087 0-12.833-5.746-12.833-12.834 0-7.087 5.746-12.833 12.833-12.833Z" />
        <path fill="currentColor" d="M2.666 16A13.334 13.334 0 0 0 16 29.334V2.666A13.334 13.334 0 0 0 2.666 16Z" />
    </svg>
</template>
