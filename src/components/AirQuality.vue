<script setup lang="ts">
import { computed } from 'vue'
import { Divider, Knob } from 'primevue'
import { storeWeather } from '@/store/store'
import { getFormattedAqi } from '@/utils/getFormattedAqi'
import CardWeather from '@/components/CardWeather.vue'
import IconFaceMask from '@/components/icons/IconFaceMask.vue'


const storeWeatherLoading = computed(() => storeWeather.loading)
const allPollutants = computed(() => {
    let airQuality = storeWeather.data.current.air_quality;
    return [
        {
            name: 'PM2.5',
            desc: 'Particulate matter less than 2.5 microns',
            format: 'µg/m3',
            value: airQuality.pm2_5,
            formattedAqi: getFormattedAqi.pm2_5(airQuality.pm2_5)
        },
        {
            name: 'PM10',
            desc: 'Particulate matter less than 10 microns',
            format: 'µg/m3',
            value: airQuality.pm10,
            formattedAqi: getFormattedAqi.pm10(airQuality.pm10)
        },
        {
            name: 'CO',
            desc: 'Carbon Monoxide',
            format: 'µg/m3',
            value: airQuality.co,
            formattedAqi: getFormattedAqi.co(airQuality.co)
        },
        {
            name: 'NO₂',
            desc: 'Nitrogen Dioxide',
            format: 'µg/m3',
            value: airQuality.no2,
            formattedAqi: getFormattedAqi.no2(airQuality.no2)
        },
        {
            name: 'O₃',
            desc: 'Ozone',
            format: 'µg/m3',
            value: airQuality.o3,
            formattedAqi: getFormattedAqi.o3(airQuality.o3)
        },
        {
            name: 'SO₂',
            desc: 'Sulfur Dioxide',
            format: 'µg/m3',
            value: airQuality.so2,
            formattedAqi: getFormattedAqi.so2(airQuality.so2)
        }
    ]
})
const primaryPollutant = computed(() => {
    let arr = allPollutants.value;
    const max = arr.reduce((max, current) => current.formattedAqi.aqi > max.formattedAqi.aqi ? current : max);
    return max;
})
</script>

<template>
    <CardWeather :loading="storeWeatherLoading" label="AQI" minHeight="500px">
        <template v-slot:icon>
            <IconFaceMask size="1rem" />
        </template>
        <template v-slot:addition>
            <div class="flex-column gap-large">
                <div class="flex-row gap-large">
                    <p class="h1-style">{{ primaryPollutant.formattedAqi.aqi }}</p>
                    <div class="flex-column gap">
                        <p class="h3-style bold-text">{{ primaryPollutant.formattedAqi.category.name }}</p>
                        <p class="h4-style"><span class="secondary-text-color">Primary Pollutant:</span> {{
                            primaryPollutant.name }}</p>
                    </div>
                </div>
                <div class="aqi-wrapper">
                    <span class="aqi-progress" :style="{
                        width: `${primaryPollutant.formattedAqi.aqi * 100 / primaryPollutant.formattedAqi.aqiMax}%`,
                        backgroundColor: primaryPollutant.formattedAqi.category.color
                    }">
                    </span>
                    <span class="aqi-background"></span>
                </div>
            </div>

            <ul class="pollutants">
                <li v-for="(pollutant) in allPollutants" :key="pollutant.name">
                    <Divider />
                    <div class="flex-row">
                        <div class="flex-row gap-large">
                            <Knob v-model="pollutant.formattedAqi.aqi" :max="pollutant.formattedAqi.aqiMax"
                                :valueColor="pollutant.formattedAqi.category.color" :size="72" :strokeWidth="10"
                                readonly style="align-items: center; display: flex;"
                                :pt="{ value: { style: { strokeLinecap: 'round' } }, range: { style: { strokeLinecap: 'round' } } }">
                            </Knob>
                            <div class="flex-column gap-small">
                                <p class="h4-style bold-text">
                                    {{ pollutant.formattedAqi.category.name }}
                                </p>
                                <p>
                                    {{ pollutant.name }} <span class="secondary-text-color">({{ pollutant.desc
                                        }})</span>
                                </p>
                                <p class="small-text secondary-text-color">
                                    {{ pollutant.value }} {{ pollutant.format }}
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </template>
    </CardWeather>
</template>

<style scoped>
.aqi-wrapper {
    position: relative;
    width: 100%;
    height: 1rem;
    border-radius: 1rem;
    overflow: hidden;
}

.aqi-progress {
    inset: 0;
    position: absolute;
    height: 100%;
    z-index: 2;
}

.aqi-background {
    inset: 0;
    position: absolute;
    width: 100%;
    background-color: var(--pv-content-border-color);
    z-index: 1;
}

.pollutants {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
}

@media (min-width: 600px) {
    .pollutants {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
</style>