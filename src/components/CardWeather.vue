<script setup lang="ts">
import { Skeleton } from 'primevue';
import { type PropType } from 'vue';


defineProps({
    loading: {
        type: Boolean,
        required: true,
    },
    label: {
        type: String,
        default: '',
    },
    minHeight: {
        type: String,
        default: '200px',
    },
    isClickable: {
        type: Boolean,
        default: false,
    },
    onClick: {
        type: Function as PropType<() => void>,
        default: undefined,
    },
});
</script>

<template>
    <div :class="['card', isClickable ? 'card-button' : null]" @click="onClick" :style="{ minHeight }">
        <Skeleton v-if="loading" height="100%" :style="{ minHeight }" />
        <div v-else class="card-content">
            <div v-if="label" class="card-label secondary-text-color">
                <slot name="icon" />
                <h3 class="small-text">{{ label }}</h3>
            </div>
            <slot name="addition" />
        </div>
    </div>
</template>