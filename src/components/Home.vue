<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeWeather } from '@/store/store';
import LocationInfo from '@/components/LocationInfo.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import ForecastWeather from '@/components/ForecastWeather.vue';
import HourlyForecast from '@/components/HourlyWeather.vue'
import AirQuality from '@/components/AirQuality.vue';
import AstroInfo from '@/components/AstroInfo.vue';
import Alerts from '@/components/Alerts.vue';
import CurrentWeatherHourly from '@/components/CurrentWeatherHourly.vue';


const route = useRoute()


onMounted(() => {
    const lat = route.query.lat
    const lon = route.query.lon

    if (lat && lon) {
        storeWeather.changeLocation(`${lat},${lon}`)
    } else {
        storeWeather.changeLocation('55.7558,37.6176') // Moscow
    }
})

watch(() => route.query, (query) => {
    if (query.lat && query.lon) {
        storeWeather.changeLocation(`${query.lat},${query.lon}`)
    }
})

</script>


<template>
    <div class="home-wrapper">
        <section class="home-section" style="flex-grow: 2;">
            <LocationInfo />
            <CurrentWeather />
            <CurrentWeatherHourly />
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