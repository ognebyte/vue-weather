<script setup lang="ts">
import { Skeleton } from 'primevue';

defineProps<{
    loading: boolean
    label?: string
    minHeight?: string
}>()
</script>

<template>
    <div class="card" :style="{ minHeight: minHeight ?? '200px' }">
        <Skeleton v-if="loading" height="100%" :style="{ minHeight: minHeight ?? '200px' }"></Skeleton>
        <div v-else class="card-content">
            <div v-if="label" class="card-label">
                <slot name="icon" />
                <h3 class="small-text">{{ label }}</h3>
            </div>
            <slot name="addition" />
        </div>
    </div>
</template>
