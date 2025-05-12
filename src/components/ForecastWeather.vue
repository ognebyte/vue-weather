<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';
import { storeWeather } from '@/store/store';
import type { ForecastDay } from '@/utils/weatherInterface';
import { getFormattedTemp } from '@/utils/getFormattedTemp';
import IconSnow from '@/components/icons/IconSnow.vue';
import IconDroplets from '@/components/icons/IconDroplets.vue';


defineProps<{
    forecastDay: ForecastDay
}>()


const storeWeatherIsCelsius = computed(() => storeWeather.isCelsius);
const iconSize = "1rem";
</script>

<template>
    <p class="secondary-text-color" style="align-self: center;">
        {{ moment(forecastDay.date, 'YYYY-MM-DD').format('ddd') }}
    </p>
    <img width="64" height="64" :src="'https:' + forecastDay.day.condition.icon.replace('64x64', '128x128')"
        class="forecast-condition-icon" :alt="forecastDay.day.condition.text">
    <ul class="ul-list flex-column gap">
        <li class="flex-column h4-style bold-text" style="align-items: flex-start; gap: 0;">
            {{ getFormattedTemp(storeWeatherIsCelsius, forecastDay.day.maxtemp_c, forecastDay.day.maxtemp_f) }}
            <span class="small-text secondary-text-color">
                {{ getFormattedTemp(storeWeatherIsCelsius, forecastDay.day.mintemp_c, forecastDay.day.mintemp_f) }}
            </span>
        </li>
        <li class="small-text secondary-text-color">
            <IconSnow v-if="forecastDay.day.daily_chance_of_snow" :size="iconSize" />
            <IconDroplets v-else :size="iconSize" />
            {{
                forecastDay.day.daily_chance_of_snow ?
                    forecastDay.day.daily_chance_of_snow :
                    forecastDay.day.daily_chance_of_rain
            }}%
        </li>
    </ul>
</template>

<style scoped>
.forecast-condition-icon {
    width: 4rem;
    height: 4rem;
}
</style>