<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeWeather } from '@/store/store';
import CardWeather from '@/components/CardWeather.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import ForecastWeather from '@/components/ForecastWeather.vue';


const router = useRouter()
const route = useRoute()
const currentWeather = computed(() => storeWeather.current);
const forecastDay = computed(() => {
    if (storeWeather.data.forecast.forecastday.length === 0) return Array(3);
    return storeWeather.data.forecast.forecastday;
});
const storeWeatherLoading = computed(() => storeWeather.loading);
const storeWeatherCurrentHour = computed(() => storeWeather.currentHour);


function isCurrentDate(date: string) {
    return date == currentWeather.value.date
}

function routeDay(dayIndex: number) {
    router.push({
        query: {
            ...route.query,
            day: dayIndex
        }
    })
}
</script>

<template>
    <div class="flex-row gap" style="align-items: stretch;">
        <CardWeather v-for="(forecast, index) in forecastDay" :loading="storeWeatherLoading" min-height="260px"
            :isClickable="true" :onClick="() => routeDay(index)"
            :class="!forecast ? 'forecast-card' : isCurrentDate(forecast.date) ? 'weather-card' : 'forecast-card'">
            <template v-slot:addition>
                <CurrentWeather v-if="isCurrentDate(forecast.date)" :current-hour="storeWeatherCurrentHour" />
                <ForecastWeather v-else :forecast-day="forecast" />
            </template>
        </CardWeather>
    </div>
</template>