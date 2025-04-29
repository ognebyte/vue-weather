<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Skeleton from 'primevue/skeleton';
import { storeWeather } from '@/store/store';


defineProps<{
    isCelsius: boolean
}>()

const currentWeather = computed(() => storeWeather.data.current);

onMounted(() => {
    storeWeather.changeLocation('MOSCOW')
})
</script>

<template>
    <div class="card">
        <Skeleton v-if="storeWeather.loading" height="100%"></Skeleton>
        <div class="card-content" v-else>
            <div class="flex-row">
                <img width="64" height="64" :src="'https:' + currentWeather.condition.icon"
                    :alt="currentWeather.condition.text">
                <div class="flex-column">
                    <p>{{ currentWeather.condition.text }}</p>
                    <p class="h1-style">{{ isCelsius ? `${currentWeather.temp_c}°C` : `${currentWeather.temp_f}°F` }}</p>
                    <p>feels like {{ isCelsius ? `${currentWeather.feelslike_c}°C` : `${currentWeather.feelslike_f}°F` }}</p>
                </div>

            </div>
            <p>💨 {{ currentWeather.wind_kph }} km/h {{ currentWeather.wind_dir }}</p>
            <p>💧 Humidity: {{ currentWeather.humidity }}%</p>
            <p>Pressure: {{ currentWeather.pressure_mb }} mb</p>
        </div>
    </div>
</template>