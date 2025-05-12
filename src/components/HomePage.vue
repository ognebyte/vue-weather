<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute, type LocationQuery } from 'vue-router';
import { storeWeather } from '@/store/store';
import ForecastDays from '@/components/ForecastDays.vue';
import WeatherCurrent from '@/components/WeatherCurrent.vue';
import WeatherHourly from '@/components/WeatherHourly.vue';
import WeatherChart from '@/components/WeatherChart.vue';
import WeatherDetails from '@/components/WeatherDetails.vue';
import AirQuality from '@/components/AirQuality.vue';
import AlertsItems from '@/components/AlertsItems.vue';


const route = useRoute()
const storeWeatherError = computed(() => storeWeather.error);
const initialLocation: string = '55.7558,37.6176';

function changeLocation(routeQuery: LocationQuery) {
    const day = !isNaN(Number(routeQuery.day)) ? Number(routeQuery.day) : 0;
    const lat = routeQuery.lat
    const lon = routeQuery.lon
    const query = lat && lon ? `${lat},${lon}` : initialLocation;
    storeWeather.changeLocation(query, day);
}

onMounted(() => {
    changeLocation(route.query)
})

watch(() => route.query, (query) => {
    changeLocation(query)
}, { immediate: false })
</script>


<template>
    <section v-if="storeWeatherError" class="error-wrapper flex-column">
        <h2>Ошибка загрузки данных</h2>
        <p>{{ storeWeatherError }}</p>
    </section>
    <section v-else class="weather-section">
        <ForecastDays class="full-span" />
        <WeatherCurrent class="full-span weather-current" />
        <WeatherHourly class="full-span weather-hourly" />
        <WeatherChart class="full-span weather-chart" />
        <WeatherDetails />
        <AirQuality class="full-span" />
        <AlertsItems class="full-span" />
    </section>
</template>

<style scoped>
.weather-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-auto-flow: row dense;
    gap: .5rem;
}


@media (min-width: 900px) {
    .weather-current {
        grid-column: span 2;
        grid-row: span 2;
    }

    .weather-hourly {
        grid-column: 3/-1;
    }

    .weather-chart {
        grid-column: 3/-1;
    }
}

@media (min-width: 600px) {
    .weather-section {
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    }
}
</style>