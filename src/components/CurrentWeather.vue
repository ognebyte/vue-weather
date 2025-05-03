<script setup lang="ts">
import { computed } from 'vue'
import { Message, Skeleton } from 'primevue';
import moment from 'moment';
import { storeWeather } from '@/store/store';
import { formatTemp } from '@/utils/formatTemp';
import IconWind from '@/components/icons/IconWind.vue';
import IconWater from '@/components/icons/IconWater.vue';
import IconPressure from '@/components/icons/IconPressure.vue';
import IconDirection from '@/components/icons/IconDirection.vue';


const currentWeather = computed(() => storeWeather.data.current);
const currentLocation = computed(() => storeWeather.data.location);
const isCelsius = computed(() => storeWeather.isCelsius);
const iconSize = "1.5rem";
</script>

<template>
    <div class="card" style="min-height: 200px;">
        <Skeleton v-if="storeWeather.loading" height="100%" />
        <div class="card-content" v-else>
            <Message severity="secondary" variant="simple">
                <span class="h3-style">
                    {{ moment(currentWeather.last_updated, storeWeather.dateFormat).format('dddd') }}
                </span>
                <br>
                Now {{ moment(storeWeather.data.location.localtime, storeWeather.dateFormat).format('HH:mm') }}
            </Message>
            <div class="flex-row wrap" style="align-items: center; gap: .5rem;">
                <p class="h1-style">{{ formatTemp(isCelsius, currentWeather.temp_c, currentWeather.temp_f) }}</p>

                <picture>
                    <source media="(min-width: 900px)"
                        :srcset="'https:' + currentWeather.condition.icon.replace('64x64', '128x128')">
                    <img :src="'https:' + currentWeather.condition.icon" :alt="currentWeather.condition.text" />
                </picture>

                <div class="flex-column">
                    <p class="h2-style">{{ currentWeather.condition.text }}</p>
                    <Message severity="secondary" variant="simple">
                        feels like {{ formatTemp(isCelsius, currentWeather.feelslike_c, currentWeather.feelslike_f) }}
                    </Message>
                </div>
            </div>

            <ul class="ul-list flex-row wrap" style="align-items: center; gap: 1rem;">
                <li>
                    <IconWind :size="iconSize" />
                    <p>{{ currentWeather.wind_kph }} km/h</p>
                    <IconDirection :size="iconSize" :rotate="currentWeather.wind_degree" />
                </li>
                <li>
                    <IconWater :size="iconSize" />
                    <p>Humidity: {{ currentWeather.humidity }}%</p>
                </li>
                <li>
                    <IconPressure :size="iconSize" />
                    Pressure: {{ currentWeather.pressure_mb }} mb
                </li>
            </ul>

            <Message severity="secondary" variant="simple" style="align-self: flex-end;">
                last updated: {{ moment(currentWeather.last_updated, storeWeather.dateFormat).format('HH:mm') }}
            </Message>
        </div>
    </div>
</template>