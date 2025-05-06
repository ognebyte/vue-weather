<script setup lang="ts">
defineProps<{
    size?: string
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        fill="none">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8.298 12.67a58.81 58.81 0 0 1 .006 10.374l-.025.28a.069.069 0 0 0 .034.066 15.314 15.314 0 0 0 15.432 0 .068.068 0 0 0 .034-.065l-.025-.28a58.822 58.822 0 0 1 .006-10.375m-15.462 0a.293.293 0 0 1 .219-.31l6.873-1.752a2.584 2.584 0 0 1 1.277 0l6.874 1.752c.14.036.232.167.22.31m-15.463 0S7.629 5.923 4.734 6.57c-2.895.646-2.274 12.922 3.542 16.799M23.76 12.67s.61-6.747 3.506-6.101c2.895.646 2.274 12.922-3.541 16.799m-5.112-7.753h-5.169m5.17 5.168h-5.17" />
    </svg>
</template>
