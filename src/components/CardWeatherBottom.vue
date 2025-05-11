<script setup lang="ts">
defineProps<{
    desc?: string | number
}>()
</script>

<template>
    <div class="card-bottom">
        <p v-if="desc" class="h3-style bold-text">{{ desc }}</p>
        <slot name="addition" />
    </div>
</template>
