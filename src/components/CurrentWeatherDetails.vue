<script setup lang="ts">
import { computed } from 'vue';
import { Skeleton } from 'primevue';
import { storeWeather } from '@/store/store';
import IconRain from '@/components/icons/IconRain.vue';
import IconClouds from '@/components/icons/IconClouds.vue';
import IconDroplets from '@/components/icons/IconDroplets.vue';
import { formatTemp } from '@/utils/formatTemp';


const storeWeatherLoading = computed(() => storeWeather.loading);
const storeIsCelsius = computed(() => storeWeather.isCelsius);
const currentWeather = computed(() => storeWeather.data.current);
const currentUV = computed(() => {
    let uv = Math.round(currentWeather.value.uv)
    return {
        uv,
        position: uvPosition(uv),
        category: uvCategory(uv),
    }
});
const uvThumbSize = <string>"2rem";
const iconSize = <string>"1rem";


function uvPosition(uv: number) {
    if (uv > 11) uv = 11;
    if (uv < 0) uv = 0;
    let position = `${uv * 100 / 11}%`
    return position
}

function uvCategory(uv: number) {
    if (uv < 3) return {
        label: "Low",
        color: "rgb(20, 204, 88)"
    };
    if (uv < 6) return {
        label: "Moderate",
        color: "rgb(255, 211, 79)"
    };
    if (uv < 8) return {
        label: "High",
        color: "rgb(242, 133, 0)"
    };
    if (uv < 11) return {
        label: "Very High",
        color: "rgb(255, 0, 0)"
    };
    return {
        label: "Extreme",
        color: "rgb(168, 85, 247)"
    };
}
</script>

<template>
    <div class="details-wrapper">
        <div class="card">
            <Skeleton v-if="storeWeatherLoading" height="100%"></Skeleton>
            <div v-else class="card-content">
                <div class="card-label">
                    <i class="pi pi-sun"></i>
                    <p>UV Index</p>
                </div>
                <div class="card-bottom">
                    <p class="h2-style">{{ currentUV.category.label }}</p>
                    <div class="uv-wrapper">
                        <div class="uv-thumb-wrapper" :style="{ width: `calc(100% - ${uvThumbSize})` }">
                            <div class="uv-thumb" :style="{
                                width: uvThumbSize,
                                height: uvThumbSize,
                                marginLeft: currentUV.position,
                                backgroundColor: currentUV.category.color
                            }">
                                <p style="color: black;">{{ currentUV.uv }}</p>
                            </div>
                        </div>
                        <span class="uv-background"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <Skeleton v-if="storeWeatherLoading" height="100%"></Skeleton>
            <div v-else class="card-content">
                <div class="card-label">
                    <IconRain :size="iconSize" />
                    <p>Precipitation</p>
                </div>
                <div class="card-bottom">
                    <p class="h2-style">{{ currentWeather.precip_mm }} mm / {{ currentWeather.precip_in }} in</p>
                </div>
            </div>
        </div>
        <div class="card">
            <Skeleton v-if="storeWeatherLoading" height="100%"></Skeleton>
            <div v-else class="card-content">
                <div class="card-label">
                    <i class="pi pi-eye"></i>
                    <p>Visibility</p>
                </div>
                <div class="card-bottom">
                    <p class="h2-style">{{ currentWeather.vis_km }} km / {{ currentWeather.vis_miles }} mi</p>
                </div>
            </div>
        </div>
        <div class="card">
            <Skeleton v-if="storeWeatherLoading" height="100%"></Skeleton>
            <div v-else class="card-content">
                <div class="card-label">
                    <IconClouds :size="iconSize" />
                    <p>Clouds</p>
                </div>
                <div class="card-bottom">
                    <p class="h2-style">{{ currentWeather.cloud }}%</p>
                </div>
            </div>
        </div>
        <div class="card">
            <Skeleton v-if="storeWeatherLoading" height="100%"></Skeleton>
            <div v-else class="card-content">
                <div class="card-label">
                    <IconDroplets :size="iconSize" />
                    <p>Dew point</p>
                </div>
                <div class="card-bottom">
                    <p class="h2-style">{{ formatTemp(storeIsCelsius, currentWeather.dewpoint_c,
                        currentWeather.dewpoint_f) }}</p>
                </div>
            </div>
        </div>
        <!-- <div class="card">
            <Skeleton v-if="storeWeatherLoading" height="100%"></Skeleton>
            <div v-else class="card-content">
                <div class="card-label">
                    <IconDroplets :size="iconSize" />
                    <p>AQI</p>
                </div>
                <div class="card-bottom">
                    <p class="h2-style">{{ currentWeather.air_quality.co }}</p>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
.details-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    grid-auto-rows: minmax(200px, auto);
    gap: .5rem;
}

.card-bottom {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    gap: 1rem;
}

.uv-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.uv-thumb-wrapper {
    z-index: 2;
}

.uv-thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 50%;
    transition: .2s ease;
}

.uv-background {
    position: absolute;
    width: 100%;
    height: 1rem;
    border-radius: 1rem;
    background: linear-gradient(90deg, rgb(20, 204, 88) 0%, rgb(255, 211, 79) 25%, rgb(242, 133, 0) 50%, rgb(255, 0, 0) 75%, rgb(168, 85, 247) 100%);
    z-index: 1;
}
</style>
