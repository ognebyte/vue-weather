<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32" fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M28 19.6c0 4.64-2.608 8.4-7.333 8.4s-7.333-3.76-7.333-8.4c0-4.64 7.333-15.6 7.333-15.6s7.334 10.96 7.334 15.6ZM10.667 10.933c0 2.062-1.186 3.734-3.334 3.734C5.186 14.667 4 12.995 4 10.933 4 8.871 7.333 4 7.333 4s3.334 4.871 3.334 6.933Z" />
    </svg>
</template>
