<script setup lang="ts">
import { computed } from 'vue';
import { storeWeather } from '@/store/store';
import { Skeleton } from 'primevue';

const alerts = computed(() => storeWeather.data.alerts.alert);
</script>

<template>
    <Skeleton v-if="storeWeather.loading" height="100%"></Skeleton>
    <div v-else>
        <div class="card" v-for="alert in alerts" :key="alert.event">
            <h4>⚠️ {{ alert.headline }}</h4>
            <p>{{ alert.desc }}</p>
            <small>Действует до: {{ alert.expires }}</small>
        </div>
    </div>

</template>

<style scoped></style>
