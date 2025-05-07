<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment';
import { storeWeather } from '@/store/store';
import type { HourlyForecast } from '@/utils/weatherInterface';
import { getFormattedTemp } from '@/utils/getFormattedTemp';

import IconWind from '@/components/icons/IconWind.vue';
import IconWater from '@/components/icons/IconWater.vue';
import IconPressure from '@/components/icons/IconPressure.vue';
import IconDirection from '@/components/icons/IconDirection.vue';


defineProps<{
    currentHour: HourlyForecast
}>()


const storeWeatherIsCelsius = computed(() => storeWeather.isCelsius);
const storeWeatherDateFormat = computed(() => storeWeather.dateFormat);
const iconSize = "1.5rem";
</script>

<template>
    <h3><span class="secondary-text-color">Forecast for</span> {{ moment(currentHour.time,
        storeWeatherDateFormat).format('dddd, D MMM, HH:mm (UTCZ)') }}</h3>
    <div class="flex-row wrap gap">
        <div class="flex-column">
            <p class="h1-style">
                {{ getFormattedTemp(storeWeatherIsCelsius, currentHour.temp_c, currentHour.temp_f) }}
            </p>
            <p class="secondary-text-color">
                feels like {{ getFormattedTemp(storeWeatherIsCelsius, currentHour.feelslike_c,
                    currentHour.feelslike_f) }}
            </p>
        </div>

        <img class="weather-condition-icon" width="64" height="64"
            :src="'https:' + currentHour.condition.icon.replace('64x64', '128x128')"
            :alt="currentHour.condition.text" />

        <p class="h2-style">{{ currentHour.condition.text }}</p>

    </div>

    <ul class="ul-list flex-row wrap gap-large">
        <li>
            <IconWind :size="iconSize" />
            {{ currentHour.wind_kph }} kph / {{ currentHour.wind_mph }} mph
            <IconDirection :size="iconSize" :rotate="currentHour.wind_degree" />
        </li>
        <li>
            <IconWater :size="iconSize" />
            Humidity: {{ currentHour.humidity }}%
        </li>
        <li>
            <IconPressure :size="iconSize" />
            Pressure: {{ currentHour.pressure_mb }} mb / {{ currentHour.pressure_in }} in
        </li>
    </ul>

    <!-- <p class="small-text secondary-text-color" style="align-self: flex-end;">
                        Updated: {{ moment(currentHour.last_updated, storeWeatherDateFormat).format('MMM D, HH:mm') }}
                    </p> -->
</template>

<style scoped>
@media (min-width: 900px) {
    .weather-condition-icon {
        width: 128px;
        height: 128px;
    }
}
</style>