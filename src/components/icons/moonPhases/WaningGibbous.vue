<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path fill="#ffd43f" stroke="currentColor"
            d="M15.999 3.166c7.088 0 12.834 5.746 12.834 12.833 0 7.088-5.746 12.834-12.834 12.834-7.087 0-12.833-5.746-12.833-12.834 0-7.087 5.746-12.833 12.833-12.833Z" />
        <path fill="currentColor"
            d="M20 16c0-5.547-1.773-10.44-4.453-13.334H16a13.333 13.333 0 0 1 0 26.667h-.453C18.227 26.439 20 21.546 20 15.999Z" />
    </svg>
</template>
