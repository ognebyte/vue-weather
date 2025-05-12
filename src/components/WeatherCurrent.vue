<script setup lang="ts">
import { computed, h } from 'vue'
import moment from 'moment';
import { storeWeather } from '@/store/store';
import { getFormattedTemp } from '@/utils/getFormattedTemp';
import CardWeather from '@/components/CardWeather.vue';

import IconWind from '@/components/icons/IconWind.vue';
import IconDroplets from '@/components/icons/IconDroplets.vue';
import IconPressure from '@/components/icons/IconPressure.vue';
import IconDirection from '@/components/icons/IconDirection.vue';
import { getMoonPhaseIcon } from '@/utils/getMoonPhaseIcon';


const storeWeatherLoading = computed(() => storeWeather.loading);
const storeWeatherIsCelsius = computed(() => storeWeather.isCelsius);
const storeWeatherDateFormat = computed(() => storeWeather.dateFormat);
const storeWeatherCurrent = computed(() => storeWeather.current);
const storeWeatherCurrentHour = computed(() => storeWeather.currentHour);
const iconSize = "1.5rem";
</script>

<template>
    <CardWeather :loading="storeWeatherLoading" min-height="12rem">
        <template v-slot:addition>
            <h3><span class="secondary-text-color">Forecast for</span> {{ moment(storeWeatherCurrentHour.time,
                storeWeatherDateFormat).format('dddd, D MMM, HH:mm (UTCZ)') }}</h3>
            <div class="weather-main-info flex-column wrap gap" style="align-items: center;">
                <p class="h2-style secondary-text-color">{{ storeWeatherCurrentHour.condition.text }}</p>

                <img class="weather-condition-icon" width="128" height="128"
                    :src="'https:' + storeWeatherCurrentHour.condition.icon.replace('64x64', '128x128')"
                    :alt="storeWeatherCurrentHour.condition.text" />

                <div class="flex-column">
                    <p class="h1-style">
                        {{ getFormattedTemp(storeWeatherIsCelsius, storeWeatherCurrentHour.temp_c,
                            storeWeatherCurrentHour.temp_f) }}
                    </p>
                    <p class="secondary-text-color">
                        feels like {{ getFormattedTemp(storeWeatherIsCelsius, storeWeatherCurrentHour.feelslike_c,
                            storeWeatherCurrentHour.feelslike_f) }}
                    </p>
                </div>
            </div>

            <ul class="ul-list flex-column wrap gap-large">
                <li>
                    <IconWind :size="iconSize" />
                    {{ storeWeatherCurrentHour.wind_kph }} kph
                    <IconDirection :size="iconSize" :rotate="storeWeatherCurrentHour.wind_degree" />
                </li>
                <li>
                    <IconDroplets :size="iconSize" />
                    <span class="secondary-text-color">
                        Chance of rain:
                    </span>
                    {{ storeWeatherCurrentHour.chance_of_rain }}%
                </li>
                <li>
                    <component :is="getMoonPhaseIcon(storeWeatherCurrent.astro.moon_phase, iconSize)"
                        style="color: var(--pv-surface-950);" />
                    {{ storeWeatherCurrent.astro.moon_phase }}
                    <span class="secondary-text-color">
                        (illumination {{ storeWeatherCurrent.astro.moon_illumination }}%)
                    </span>
                </li>
            </ul>
        </template>
    </CardWeather>
</template>

<style scoped>
@media (min-width: 500px) {

    .weather-main-info,
    .ul-list {
        flex-direction: row;
    }
}

@media (min-width: 900px) {
    @media (min-width: 600px) {

        .weather-main-info,
        .ul-list {
            flex-direction: inherit;
        }
    }

    .weather-condition-icon {
        width: 128px;
        height: 128px;
    }
}
</style>