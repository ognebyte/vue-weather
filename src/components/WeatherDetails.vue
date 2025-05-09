<script setup lang="ts">
import { computed, h } from 'vue';
import { storeWeather } from '@/store/store';
import { initialStateAstro } from '@/utils/weatherInititalStates';
import { getFormattedTemp } from '@/utils/getFormattedTemp';
import UvIndex from '@/components/UvIndex.vue';
import AstroInfo from '@/components/AstroInfo.vue';
import CardWeather from '@/components/CardWeather.vue';
import CardWeatherBottom from '@/components/CardWeatherBottom.vue';

import IconRain from '@/components/icons/IconRain.vue';
import IconClouds from '@/components/icons/IconClouds.vue';
import IconDroplet from '@/components/icons/IconDroplet.vue';


const storeWeatherLoading = computed(() => storeWeather.loading);
const storeIsCelsius = computed(() => storeWeather.isCelsius);
const currentWeather = computed(() => storeWeather.currentHour);
const currentAstro = computed(() => {
    if (!storeWeather.current) return initialStateAstro;
    return storeWeather.current.astro;
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
            icon: h(IconDroplet, { size: iconSize }),
            desc: getFormattedTemp(storeIsCelsius.value, weather.dewpoint_c, weather.dewpoint_f)
        },
    ];
})

const iconSize = <string>"1rem";
const minHeight = <string>"10rem";
</script>

<template>
    <div class="details-wrapper">
        <UvIndex :loading="storeWeatherLoading" :uv="currentWeather.uv" :min-height="minHeight" />
        <AstroInfo :loading="storeWeatherLoading" :astro="currentAstro" :min-height="minHeight" />

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
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: row dense;
    gap: .5rem;
}

@media (min-width: 600px) {
    .details-wrapper {
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    }
}
</style>