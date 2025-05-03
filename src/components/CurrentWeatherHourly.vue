<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { Message, Skeleton } from 'primevue';
import Chart from 'primevue/chart';
import { storeWeather } from '@/store/store';
import moment from 'moment';
import { getHourlyWeatherFor } from '@/utils/getHourlyWeatherFor';
import type { HourlyForecast } from '@/utils/weatherInterface';
import HourlyWeather from '@/components/HourlyWeather.vue';


const dateFormat = computed(() => storeWeather.dateFormat);
const currentLocation = computed(() => storeWeather.data.location);
const currentWeatherHourly = computed(() => {
    if (storeWeather.data.forecast.forecastday.length == 0) return { day: [], hour: [] };
    const days = 2;
    const forecastDays = storeWeather.data.forecast.forecastday.slice(0, days);
    const hourlyForecast = getHourlyWeatherFor(currentLocation.value.localtime, forecastDays, days);
    return { day: forecastDays, hour: hourlyForecast };
    // return setChartData(hourlyForecast);
});

const chartOptions = ref();


onMounted(() => {
    chartOptions.value = setChartOptions();

    const observer = new MutationObserver(() => {
        chartOptions.value = setChartOptions();
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
    });

    onBeforeUnmount(() => {
        observer.disconnect();
    });
});

const setChartData = (hourlyWeather: HourlyForecast[]) => {
    const documentStyle = getComputedStyle(document.documentElement);
    const labels = hourlyWeather.flatMap(val => moment(val.time, dateFormat.value).format('HH:mm'))
    const isCelsius = storeWeather.isCelsius
    const data = hourlyWeather.flatMap(val => isCelsius ? val.temp_c : val.temp_f)
    return {
        labels: labels,
        datasets: [
            {
                data,
                fill: true,
                tension: 0.4,
                backgroundColor: documentStyle.getPropertyValue('--pv-blue-500'),
                borderColor: documentStyle.getPropertyValue('--pv-message-info-color')
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--pv-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--pv-text-muted-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: textColorSecondary
                }
            },
            y: {
                ticks: {
                    color: textColor
                },
                grid: {
                    color: textColorSecondary
                }
            }
        }
    };
}
</script>

<template>
    <div class="card" style="min-height: 200px;">
        <Skeleton v-if="storeWeather.loading" height="100%" />
        <div v-else class="card-content">
            <Message severity="secondary" variant="simple">
                <p class="h3-style">Hourly weather</p>
            </Message>

            <HourlyWeather :hourlyForecast="currentWeatherHourly.hour" :dayForecast="currentWeatherHourly.day" />
            <!-- <Chart type="line" :data="currentWeatherHourly" :options="chartOptions" /> -->
        </div>
    </div>
</template>

<style scoped></style>
