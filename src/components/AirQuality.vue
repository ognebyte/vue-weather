<script setup lang="ts">
import { computed } from 'vue';
import { Skeleton } from 'primevue';
import { storeWeather } from '@/store/store';

const aqi = computed(() => storeWeather.data.current.air_quality);
</script>

<template>
    <Skeleton v-if="storeWeather.loading" height="100%"></Skeleton>
    <div v-else>
        <h3>Качество воздуха</h3>
        <ul>
            <li>PM2.5: {{ aqi.pm2_5 }}</li>
            <li>PM10: {{ aqi.pm10 }}</li>
            <li>CO: {{ aqi.co }}</li>
            <li>NO₂: {{ aqi.no2 }}</li>
            <li>O₃: {{ aqi.o3 }}</li>
        </ul>
    </div>
</template>

<style scoped></style>
