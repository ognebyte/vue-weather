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
    </svg>
</template>
