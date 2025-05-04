<script setup lang="ts">
import { computed } from 'vue';
import { Knob, Skeleton } from 'primevue';
import { storeWeather } from '@/store/store';
import IconFaceMask from '@/components/icons/IconFaceMask.vue';


const storeWeatherLoading = computed(() => storeWeather.loading);
const currentWeather = computed(() => storeWeather.data.current);
const currentWeatherAirQuality = computed(() => storeWeather.data.current.air_quality);
const iconSize = <string>"1rem";


const pollutantsToDisplay = computed(() => [
    { name: 'PM2.5', value: currentWeatherAirQuality.value.pm2_5 },
    { name: 'PM10', value: currentWeatherAirQuality.value.pm10 },
    { name: 'O₃', value: currentWeatherAirQuality.value.o3 },
    { name: 'NO₂', value: currentWeatherAirQuality.value.no2 },
])

const qualityClass = computed(() => {
    const index = currentWeatherAirQuality.value['us-epa-index']
    switch (index) {
        case 2: return 'moderate'
        case 3: return 'sensitive'
        case 4: return 'unhealthy'
        case 5: return 'very-unhealthy'
        case 6: return 'hazardous'
        default: return 'good'
    }
})
</script>

<template>
    <div class="card" style="min-height: 200px;">
        <Skeleton v-if="storeWeatherLoading" height="100%"></Skeleton>
        <div v-else class="card-content">
            <div class="card-label">
                <IconFaceMask :size="iconSize" />
                <p>AQI</p>
            </div>
            <p class="air-status" :class="qualityClass">Level: <strong>{{ qualityClass }}</strong></p>
            <Knob v-model="currentWeatherAirQuality['us-epa-index']" :min="0" :max="6" valueColor="SlateGray"
                rangeColor="MediumTurquoise" />

            <div class="indexes">
                <p>US EPA Index: {{ currentWeatherAirQuality['us-epa-index'] }}</p>
                <p>UK DEFRA Index: {{ currentWeatherAirQuality['gb-defra-index'] }}</p>
            </div>

            <ul class="pollutants">
                <li v-for="pollutant in pollutantsToDisplay" :key="pollutant.name">
                    <span>{{ pollutant.name }}:</span> {{ pollutant.value }} µg/m³
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.good {
    background-color: #e0f7e9;
    color: #2e7d32;
}

.moderate {
    background-color: #fffde7;
    color: #f9a825;
}

.sensitive {
    background-color: #fff3e0;
    color: #ef6c00;
}

.unhealthy {
    background-color: #ffebee;
    color: #c62828;
}

.very-unhealthy {
    background-color: #f3e5f5;
    color: #6a1b9a;
}

.hazardous {
    background-color: #ef9a9a;
    color: #b71c1c;
}
</style>
