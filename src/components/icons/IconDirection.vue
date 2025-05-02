<script setup lang="ts">

defineProps<{
    size?: string
    rotate?: number
}>()
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size ?? '32'" :height="size ?? '32'" viewBox="0 0 32 32"
        :style="rotate ? { rotate: rotate + 'deg' } : null" fill="none">
        <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
            d="M16 6.322 8.473 25.141 16 21.377l7.527 3.764L16 6.322Z" />
    </svg>
</template>
