<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';
import { storeWeather } from '@/store/store';
import type { ForecastDay } from '@/utils/weatherInterface';
import { getFormattedTemp } from '@/utils/getFormattedTemp';
import IconWind from '@/components/icons/IconWind.vue';
import IconWater from '@/components/icons/IconWater.vue';
import IconRain from '@/components/icons/IconRain.vue';


defineProps<{
    forecastDay: ForecastDay
}>()


const storeWeatherIsCelsius = computed(() => storeWeather.isCelsius);
const iconSize = "1.5rem";
</script>

<template>
    <div class="flex-row secondary-text-color" style="justify-content: space-between;">
        <h3>{{ moment(forecastDay.date, 'YYYY-MM-DD').format('dddd') }}</h3>
        <p>{{ moment(forecastDay.date, 'YYYY-MM-DD').format('MMMM D') }}</p>
    </div>
    <div class="flex-row gap wrap">
        <img width="64" height="64" :src="'https:' + forecastDay.day.condition.icon.replace('64x64', '128x128')"
            :alt="forecastDay.day.condition.text">
        <div class="flex-column gap">
            <p>{{ forecastDay.day.condition.text }}</p>
            <p class="h3-style bold-text">
                {{ getFormattedTemp(storeWeatherIsCelsius, forecastDay.day.maxtemp_c, forecastDay.day.maxtemp_f) }}
                <span class="small-text secondary-text-color">
                    / {{ getFormattedTemp(storeWeatherIsCelsius, forecastDay.day.mintemp_c, forecastDay.day.mintemp_f)
                    }}
                </span>
            </p>
        </div>
    </div>
    <ul class="ul-list flex-column gap-large">
        <li>
            <IconWind :size="iconSize" />
            {{ forecastDay.day.maxwind_kph }} kph / {{ forecastDay.day.maxwind_mph }} mph
        </li>
        <li>
            <IconWater :size="iconSize" />
            Humidity: {{ forecastDay.day.avghumidity }}%
        </li>
        <li>
            <IconRain :size="iconSize" />
            Chance of rain: {{ forecastDay.day.daily_chance_of_rain }}%
        </li>
    </ul>
</template>