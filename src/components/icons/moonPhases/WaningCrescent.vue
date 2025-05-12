<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path fill="currentColor"
            d="M16 29.333c7.363 0 13.333-5.97 13.333-13.334 0-7.363-5.97-13.333-13.334-13.333-7.363 0-13.333 5.97-13.333 13.333 0 7.364 5.97 13.334 13.333 13.334Z" />
        <path fill="rgb(241, 241, 241)" stroke="currentColor"
            d="M15.999 3.166h.002a12.62 12.62 0 0 1 5.118 1.066A12.499 12.499 0 0 0 12.83 16c0 2.796.938 5.512 2.663 7.713a12.497 12.497 0 0 0 5.627 4.054 12.617 12.617 0 0 1-4.71 1.061l-.408.006h-.002a12.835 12.835 0 0 1-.315-25.663l.315-.004Z" />
    </svg>
</template>
