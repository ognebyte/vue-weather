<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeWeather } from '@/store/store';
import CurrentWeather from '@/components/CurrentWeather.vue';
import CurrentWeatherHourly from '@/components/CurrentWeatherHourly.vue';
import CurrentWeatherDetails from '@/components/CurrentWeatherDetails.vue';

import ForecastWeather from '@/components/ForecastWeather.vue';
import AirQuality from '@/components/AirQuality.vue';
import AstroInfo from '@/components/AstroInfo.vue';
import Alerts from '@/components/Alerts.vue';


const route = useRoute()
const storeWeatherError = computed(() => storeWeather.error);

onMounted(() => {
    const lat = route.query.lat
    const lon = route.query.lon
    const query = lat && lon ? `${lat},${lon}` : '55.7558,37.6176';
    storeWeather.changeLocation(query);
})

watch(() => route.query, (query) => {
    if (query.lat && query.lon) {
        storeWeather.changeLocation(`${query.lat},${query.lon}`)
    }
})
</script>


<template>
    <div v-if="storeWeatherError" class="error-wrapper flex-column">
        <h2>Ошибка загрузки данных</h2>
        <p>{{ storeWeatherError }}</p>
    </div>
    <div v-else class="home-wrapper">
        <section class="home-section" style="flex-grow: 2;">
            <CurrentWeather />
            <CurrentWeatherHourly />
            <CurrentWeatherDetails />
            <AirQuality />
            <AstroInfo />
            <Alerts />
        </section>
        <section class="home-section">
            <ForecastWeather />
        </section>
    </div>
</template>

<style scoped>
.home-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: .5rem;
}

.home-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    overflow: hidden;
}

@media (min-width: 900px) {
    .home-wrapper {
        flex-direction: row;
    }
}
</style>