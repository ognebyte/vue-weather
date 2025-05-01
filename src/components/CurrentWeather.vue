<script setup lang="ts">
import { computed } from 'vue'
import Skeleton from 'primevue/skeleton';
import { storeWeather } from '@/store/store';
import { formatTemp } from '@/utils/formatTemp';



const currentWeather = computed(() => storeWeather.data.current);
const isCelsius = computed(() => storeWeather.isCelsius);
</script>

<template>
    <div class="card" style="height: 400px;">
        <Skeleton v-if="storeWeather.loading" height="100%" />

        <div class="card-content" v-else>
            <div class="flex-row" style="align-items: center; gap: .5rem;">
                <p class="h1-style">{{ formatTemp(isCelsius, currentWeather.temp_c, currentWeather.temp_f) }}</p>

                <img width="128" height="128"
                    :src="'https:' + currentWeather.condition.icon.replace('64x64', '128x128')"
                    :alt="currentWeather.condition.text" />

                <div class="flex-column">
                    <p>{{ currentWeather.condition.text }}</p>
                    <p>feels like {{ formatTemp(isCelsius, currentWeather.feelslike_c, currentWeather.feelslike_f) }}</p>
                </div>
            </div>

            <div class="flex-row" style="align-items: center; gap: 1rem;">
                <p>💨 {{ currentWeather.wind_kph }} km/h {{ currentWeather.wind_dir }}</p>
                <p>💧 Humidity: {{ currentWeather.humidity }}%</p>
                <p>Pressure: {{ currentWeather.pressure_mb }} mb</p>
            </div>
        </div>
    </div>
</template>