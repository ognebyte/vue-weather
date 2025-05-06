<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32" fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 4v5.333m0 0v13.334m0-13.334-4-4m4 4 4-4m-4 17.334V28m0-5.333-4 4m4-4 4 4M5.609 10l4.619 2.667m0 0 11.547 6.666m-11.547-6.666L4.764 14.13m5.464-1.464L8.764 7.203m13.01 12.13L26.395 22m-4.62-2.667 1.465 5.465m-1.464-5.465 5.464-1.464M5.609 22l4.62-2.667m0 0 11.546-6.666m-11.547 6.666L4.764 17.87m5.464 1.464-1.464 5.465m13.011-12.131L26.395 10m-4.62 2.667 1.464-5.464m-1.464 5.464 5.464 1.464" />
    </svg>
</template>
