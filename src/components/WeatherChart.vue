<script setup lang="ts">
import { computed, ref, onMounted, watch, onBeforeUnmount, h } from 'vue';
import Chart from 'primevue/chart';
import moment from 'moment';
import { storeWeather } from '@/store/store';
import { getHourlyWeatherFor } from '@/utils/getHourlyWeatherFor';
import CardWeather from '@/components/CardWeather.vue';
import { getFormattedTime } from '@/utils/getFormattedTime';


const storeWeatherLoading = computed(() => storeWeather.loading);
const storeWeatherDateFormat = computed(() => storeWeather.dateFormat);
const storeWeatherPrevDayIndex = computed(() => storeWeather.prevDayIndex);
const storeWeatherCurrentHour = computed(() => storeWeather.currentHour);

const chartData = computed(() => {
    const currentTime = moment(storeWeather.currentHour.time, storeWeather.dateFormat);
    let time = currentTime.hours() > 0 ?
        currentTime.subtract(1, 'hour').format(storeWeather.dateFormat) :
        currentTime.set({ hour: 0, minute: 0 }).format(storeWeather.dateFormat)
    const dayIndex = storeWeather.prevDayIndex;
    const days = 2;
    const forecastDays = storeWeather.data.forecast.forecastday.slice(dayIndex, dayIndex + days);
    const hourlyWeather = getHourlyWeatherFor(time, forecastDays, days, dayIndex);
    const labels = hourlyWeather.flatMap(hour => {
        return getFormattedTime(hour.time, storeWeatherCurrentHour.value.time, storeWeatherDateFormat.value,
            storeWeatherPrevDayIndex.value)
    })
    const data = hourlyWeather.flatMap(hour => hour[storeWeather.currentChart.type])

    return {
        labels,
        datasets: [
            {
                label: storeWeather.currentChart.label,
                data,
                fill: true,
                tension: 0.4,
            },
        ]
    }
});
const chartOptions = ref();
let observer: MutationObserver

onMounted(() => {
    const updateChartOptions = () => {
        chartOptions.value = setChartOptions();
    }

    observer = new MutationObserver(updateChartOptions)

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    })

    updateChartOptions()
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const surfaceBorder = documentStyle.getPropertyValue('--pv-content-border-color');
    const secondaryText = documentStyle.getPropertyValue('--secondary-text-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: .6,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    color: secondaryText
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: secondaryText
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>

<template>
    <CardWeather label="Chart" :loading="storeWeatherLoading">
        <template v-slot:icon>
            <i class="pi pi-chart-line"></i>
        </template>
        <template v-slot:addition>
            <h4>{{ storeWeather.currentChart.label }}</h4>
            <div class="chart-wrapper">
                <Chart class="chart" type="line" :data="chartData" :options="chartOptions" />
            </div>
        </template>
    </CardWeather>
</template>

<style scoped>
.chart-wrapper {
    height: 100%;
    overflow-x: auto;
}

.chart {
    height: 100%;
    min-width: 1000px;
}
</style>
