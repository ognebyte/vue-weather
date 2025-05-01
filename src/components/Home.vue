<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeWeather } from '@/store/store';
import LocationInfo from '@/components/LocationInfo.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import ForecastWeather from '@/components/ForecastWeather.vue';
import HourlyForecast from '@/components/HourlyForecast.vue'
import AirQuality from '@/components/AirQuality.vue';
import AstroInfo from '@/components/AstroInfo.vue';
import Alerts from '@/components/Alerts.vue';


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
    <div class="weather-wrapper">
        <section style="flex: 1; flex-grow: 2;">
            <LocationInfo />
            <CurrentWeather :is-celsius="true" />
            <AirQuality />
            <AstroInfo />
            <Alerts />
        </section>
        <section style="flex: 1; display: flex; flex-direction: column; gap: .5rem;">
            <ForecastWeather :is-celsius="true" />
            <HourlyForecast />
        </section>
    </div>
</template>

<style scoped>
.weather-wrapper {
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: .5rem;
}
</style>