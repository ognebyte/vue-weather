<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeWeather } from '@/store/store';
import CardWeather from '@/components/CardWeather.vue';
import ForecastWeather from '@/components/ForecastWeather.vue';


const router = useRouter()
const route = useRoute()
const forecastDay = computed(() => {
    if (storeWeather.data.forecast.forecastday.length === 0) return Array(3);
    return storeWeather.data.forecast.forecastday;
});
const storeWeatherLoading = computed(() => storeWeather.loading);
const storeWeatherPrevDayIndex = computed(() => {
    let prevDayIndex = storeWeather.prevDayIndex
    if (prevDayIndex === -1) prevDayIndex = 0
    return prevDayIndex
});


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
    <div class="forecast-wrapper gap">
        <CardWeather v-for="(forecast, index) in forecastDay" :loading="storeWeatherLoading" min-height="12rem"
            :isClickable="true" :onClick="() => routeDay(index)"
            :class="storeWeatherPrevDayIndex === index ? 'active-card' : null">
            <template v-slot:addition>
                <ForecastWeather :forecast-day="forecast" />
            </template>
        </CardWeather>
    </div>
</template>