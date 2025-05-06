<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment';
import { storeWeather } from '@/store/store';
import { getFormattedTemp } from '@/utils/getFormattedTemp';
import CardWeather from '@/components/CardWeather.vue';

import IconWind from '@/components/icons/IconWind.vue';
import IconWater from '@/components/icons/IconWater.vue';
import IconPressure from '@/components/icons/IconPressure.vue';
import IconDirection from '@/components/icons/IconDirection.vue';


const currentWeather = computed(() => storeWeather.data.current);
const storeWeatherIsCelsius = computed(() => storeWeather.isCelsius);
const storeWeatherLoading = computed(() => storeWeather.loading);
const storeWeatherDateFormat = computed(() => storeWeather.dateFormat);
const iconSize = "1.5rem";
</script>

<template>
    <CardWeather :loading="storeWeatherLoading" min-height="220px">
        <template v-slot:addition>
            <h3>{{ moment(currentWeather.last_updated, storeWeatherDateFormat).format('dddd, HH:mm (UTCZ)') }}</h3>
            <div class="flex-row wrap gap">
                <h1>{{ getFormattedTemp(storeWeatherIsCelsius, currentWeather.temp_c, currentWeather.temp_f) }}</h1>

                <picture>
                    <source media="(min-width: 900px)"
                        :srcset="'https:' + currentWeather.condition.icon.replace('64x64', '128x128')">
                    <img :src="'https:' + currentWeather.condition.icon" :alt="currentWeather.condition.text" />
                </picture>

                <div class="flex-column">
                    <h2>{{ currentWeather.condition.text }}</h2>
                    <p class="secondary-text-color">
                        feels like {{ getFormattedTemp(storeWeatherIsCelsius, currentWeather.feelslike_c,
                            currentWeather.feelslike_f) }}
                    </p>
                </div>
            </div>

            <ul class="ul-list flex-row wrap gap-large">
                <li>
                    <IconWind :size="iconSize" />
                    {{ currentWeather.wind_kph }} kph / {{ currentWeather.wind_mph }} mph
                    <IconDirection :size="iconSize" :rotate="currentWeather.wind_degree" />
                </li>
                <li>
                    <IconWater :size="iconSize" />
                    Humidity: {{ currentWeather.humidity }}%
                </li>
                <li>
                    <IconPressure :size="iconSize" />
                    Pressure: {{ currentWeather.pressure_mb }} mb / {{ currentWeather.pressure_in }} in
                </li>
            </ul>

            <p class="small-text secondary-text-color" style="align-self: flex-end;">
                Updated: {{ moment(currentWeather.last_updated, storeWeatherDateFormat).format('MMM D, HH:mm') }}
            </p>
        </template>
    </CardWeather>
</template>