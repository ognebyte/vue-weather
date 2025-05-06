<script setup lang="ts">
import { computed, h } from 'vue';
import { storeWeather } from '@/store/store';
import { initialStateAstro } from '@/utils/weatherInititalStates';
import { getFormattedTemp } from '@/utils/getFormattedTemp';
import AstroInfo from '@/components/AstroInfo.vue';
import UvIndex from '@/components/UvIndex.vue';
import CardWeather from '@/components/CardWeather.vue';
import CardWeatherBottom from '@/components/CardWeatherBottom.vue';

import IconRain from '@/components/icons/IconRain.vue';
import IconClouds from '@/components/icons/IconClouds.vue';
import IconDroplets from '@/components/icons/IconDroplets.vue';


const storeWeatherLoading = computed(() => storeWeather.loading);
const storeIsCelsius = computed(() => storeWeather.isCelsius);
const currentWeather = computed(() => storeWeather.data.current);
const currentAstro = computed(() => {
    if (storeWeather.data.forecast.forecastday.length == 0) return initialStateAstro;
    return storeWeather.data.forecast.forecastday[0].astro;
});
const cards = computed(() => {
    const weather = currentWeather.value;
    return [
        {
            label: 'Precipitation',
            icon: h(IconRain, { size: iconSize }),
            desc: `${weather.precip_mm} mm / ${weather.precip_in} in`
        },
        {
            label: 'Visibility',
            icon: h('i', { class: 'pi pi-eye' }),
            desc: `${weather.vis_km} km / ${weather.vis_miles} mi`
        },
        {
            label: 'Clouds',
            icon: h(IconClouds, { size: iconSize }),
            desc: `${weather.cloud}%`
        },
        {
            label: 'Dew point',
            icon: h(IconDroplets, { size: iconSize }),
            desc: getFormattedTemp(storeIsCelsius.value, weather.dewpoint_c, weather.dewpoint_f)
        },
    ];
})

const iconSize = <string>"1rem";
const minHeight = <string>"10rem";
</script>

<template>
    <div class="details-wrapper">
        <AstroInfo :loading="storeWeatherLoading" :astro="currentAstro" :min-height="minHeight" />
        <UvIndex :loading="storeWeatherLoading" :uv="currentWeather.uv" :min-height="minHeight" />

        <CardWeather v-for="card in cards" :loading="storeWeatherLoading" :label="card.label" :min-height="minHeight">
            <template v-slot:icon>
                <component :is="card.icon" />
            </template>
            <template v-slot:addition>
                <CardWeatherBottom :desc="card.desc" />
            </template>
        </CardWeather>
    </div>
</template>

<style scoped>
.details-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: .5rem;
}

@media (min-width: 600px) {
    .details-wrapper {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>