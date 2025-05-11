<script setup lang="ts">
import { computed, h, onMounted, watch } from 'vue';
import { storeWeather } from '@/store/store';
import { initialStateAstro } from '@/utils/weatherInititalStates';
import { getFormattedTemp } from '@/utils/getFormattedTemp';
import UvIndex from '@/components/UvIndex.vue';
import AstroInfo from '@/components/AstroInfo.vue';
import CardWeather from '@/components/CardWeather.vue';
import CardWeatherBottom from '@/components/CardWeatherBottom.vue';

import IconRain from '@/components/icons/IconRain.vue';
import IconWind from '@/components/icons/IconWind.vue';
import IconClouds from '@/components/icons/IconClouds.vue';
import IconDroplet from '@/components/icons/IconDroplet.vue';
import IconDewPoint from '@/components/icons/IconDewPoint.vue';
import IconPressure from '@/components/icons/IconPressure.vue';


const storeWeatherLoading = computed(() => storeWeather.loading);
const storeWeatherIsCelsius = computed(() => storeWeather.isCelsius);
const storeWeatherCurrentChart = computed(() => storeWeather.currentChart);
const currentHour = computed(() => storeWeather.currentHour);
const currentAstro = computed(() => {
    if (!storeWeather.current) return initialStateAstro;
    return storeWeather.current.astro;
});
const weatherCards = computed(() => {
    const weather = currentHour.value;
    const isCelsius = storeWeatherIsCelsius.value;
    let cards = [
        {
            label: 'UV Index',
            icon: h('i', { class: 'pi pi-sun' }),
            desc: weather.uv,
            type: 'uv',
        },
        {
            label: 'Precipitation',
            icon: h(IconRain, { size: iconSize }),
            desc: `${weather.precip_mm} mm`,
            type: 'precip_mm',
            format: 'mm'
        },
        {
            label: 'Wind',
            icon: h(IconWind, { size: iconSize }),
            desc: `${weather.wind_dir} ${weather.wind_kph} kph`,
            type: 'wind_kph',
            format: 'kph'
        },
        {
            label: 'Clouds',
            icon: h(IconClouds, { size: iconSize }),
            desc: `${weather.cloud}%`,
            type: 'cloud',
            format: '%'
        },
        {
            label: 'Humidity',
            icon: h(IconDroplet, { size: iconSize }),
            desc: `${weather.humidity}%`,
            type: 'humidity',
            format: '%'
        },
        {
            label: 'Dew point',
            icon: h(IconDewPoint, { size: iconSize }),
            desc: getFormattedTemp(isCelsius, weather.dewpoint_c, weather.dewpoint_f),
            type: isCelsius ? 'dewpoint_c' : 'dewpoint_f',
            format: isCelsius ? '°C' : '°F'
        },
        {
            label: 'Pressure',
            icon: h(IconPressure, { size: iconSize }),
            desc: `${weather.pressure_mb} mb`,
            type: 'pressure_mb',
            format: 'mb'
        },
        {
            label: 'Visibility',
            icon: h('i', { class: 'pi pi-eye' }),
            desc: `${weather.vis_km} km`,
            type: 'vis_km',
            format: 'km'
        },
    ];
    if (!storeWeatherCurrentChart.value?.type) setChart(cards[0])
    return cards
})

const iconSize = <string>"1rem";
const minHeight = <string>"10rem";


watch(storeWeatherIsCelsius, () => {
    const chartType = storeWeatherCurrentChart.value?.type;
    if (!chartType) return;

    const temperatureTypes = ['dewpoint_c', 'dewpoint_f', 'temp_c', 'temp_f', 'feelslike_c', 'feelslike_f'];
    if (temperatureTypes.includes(chartType)) {
        const newType = chartType.includes('_c') ? chartType.replace('_c', '_f') : chartType.replace('_f', '_c');
        const newCard = weatherCards.value.find(card => card.type === newType);
        if (newCard) setChart(newCard);
    }
});

function setChart(card: any) {
    if (storeWeatherCurrentChart.value.type === card.type) return;
    storeWeather.setChart({
        label: card.label,
        type: card.type,
        format: card.format ?? ''
    })
}
</script>

<template>
    <CardWeather v-for="card in weatherCards" :loading="storeWeatherLoading" :label="card.label" :min-height="minHeight"
        :class="storeWeatherCurrentChart.type == card.type ? 'active-card' : null"
        :style="{ gridColumn: card.type == 'uv' ? 'span 2' : 'span 1' }" :is-clickable="true"
        :click="() => setChart(card)">
        <template v-slot:icon>
            <component :is="card.icon" />
        </template>
        <template v-slot:addition>
            <UvIndex v-if="card.type == 'uv'" :uv="currentHour.uv" />
            <CardWeatherBottom v-else :desc="card.desc" />
        </template>
    </CardWeather>

    <AstroInfo :loading="storeWeatherLoading" :astro="currentAstro" :min-height="minHeight" />
</template>