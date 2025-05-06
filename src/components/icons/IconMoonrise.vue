<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path fill="currentColor"
            d="M24.408 24.734c.047.464-.336.843-.802.843-.467 0-.84-.38-.898-.844a6.748 6.748 0 0 0-1.146-3c-.265-.383-.241-.915.107-1.226.347-.311.885-.284 1.16.093a8.437 8.437 0 0 1 1.58 4.134ZM16 25.578h-1.69a8.386 8.386 0 0 1 3.171-6.594A6.663 6.663 0 0 0 16 18.82a6.767 6.767 0 0 0-6.76 6.759H7.55a8.458 8.458 0 0 1 8.45-8.45 8.359 8.359 0 0 1 3.756.89.845.845 0 0 1 0 1.512A6.723 6.723 0 0 0 16 25.578Z" />
        <path fill="currentColor"
            d="M28.077 24.326H3.925a.917.917 0 1 0 0 1.835h24.152a.917.917 0 1 0 0-1.835ZM25.456 28.082H6.542a.918.918 0 0 0 0 1.835h18.914a.917.917 0 0 0 0-1.835Z" />
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 14.333V5m0 0-4 4m4-4 4 4" />
    </svg>
</template>
