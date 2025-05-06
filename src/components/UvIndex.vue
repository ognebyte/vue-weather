<script setup lang="ts">
import { computed } from 'vue';
import CardWeather from '@/components/CardWeather.vue';
import CardWeatherBottom from '@/components/CardWeatherBottom.vue';


const props = defineProps<{
    loading: boolean
    uv: number
    minHeight: string
}>()


const currentUV = computed(() => {
    let uv = Math.round(props.uv)
    return {
        uv,
        position: uvPosition(uv),
        category: uvCategory(uv),
    }
});
const uvThumbSize = <string>"2rem";


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
    <CardWeather :loading="loading" label="UV Index" :min-height="minHeight" style="grid-column: span 2;">
        <template v-slot:icon>
            <i class="pi pi-sun"></i>
        </template>
        <template v-slot:addition>
            <CardWeatherBottom :desc="currentUV.category.label">
                <template v-slot:addition>
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
                </template>
            </CardWeatherBottom>
        </template>
    </CardWeather>
</template>

<style scoped>
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