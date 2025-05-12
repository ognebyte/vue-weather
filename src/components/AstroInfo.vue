<script setup lang="ts">
import moment from 'moment';
import type { Astro } from '@/utils/weatherInterface';
import CardWeather from '@/components/CardWeather.vue';
import CardWeatherBottom from '@/components/CardWeatherBottom.vue';

import IconSunrise from '@/components/icons/IconSunrise.vue';
import IconSunset from '@/components/icons/IconSunset.vue';
import IconMoonrise from '@/components/icons/IconMoonrise.vue';
import IconMoonset from '@/components/icons/IconMoonset.vue';


defineProps<{
    loading: boolean
    astro: Astro
    minHeight: string
}>()

const iconSize = <string>"1.5rem"
</script>

<template>
    <CardWeather :loading="loading" label="Sun" :min-height="minHeight" style="grid-column: 1 span;">
        <template v-slot:icon>
            <i class="pi pi-sun"></i>
        </template>
        <template v-slot:addition>
            <CardWeatherBottom>
                <template v-slot:addition>
                    <div class="flex-column gap-small">
                        <div class="flex-row gap" style="flex: 1; justify-content: space-between;">
                            <div class="flex-row gap">
                                <IconSunrise :size="iconSize" class="secondary-text-color" />
                                <p class="small-text secondary-text-color">Rise:</p>
                            </div>
                            <p class="h4-style bold-text">{{ moment(astro.sunrise, 'hh:mm A').format('HH:mm') }}</p>
                        </div>
                        <div class="flex-row gap" style="flex: 1; justify-content: space-between;">
                            <div class="flex-row gap">
                                <IconSunset :size="iconSize" class="secondary-text-color" />
                                <p class="small-text secondary-text-color">Set:</p>
                            </div>
                            <p class="h4-style bold-text">{{ moment(astro.sunset, 'hh:mm A').format('HH:mm') }}</p>
                        </div>
                    </div>
                </template>
            </CardWeatherBottom>
        </template>
    </CardWeather>

    <CardWeather :loading="loading" label="Moon" :min-height="minHeight" style="grid-column: 1 span;">
        <template v-slot:icon>
            <i class="pi pi-moon"></i>
        </template>
        <template v-slot:addition>
            <CardWeatherBottom>
                <template v-slot:addition>
                    <div class="flex-column gap-small">
                        <div class="flex-row gap" style="flex: 1; justify-content: space-between;">
                            <div class="flex-row gap">
                                <IconMoonrise :size="iconSize" class="secondary-text-color" />
                                <p class="small-text secondary-text-color">Rise:</p>
                            </div>
                            <p class="h4-style bold-text">{{ moment(astro.moonrise, 'hh:mm A').format('HH:mm') }}</p>
                        </div>
                        <div class="flex-row gap" style="flex: 1; justify-content: space-between;">
                            <div class="flex-row gap">
                                <IconMoonset :size="iconSize" class="secondary-text-color" />
                                <p class="small-text secondary-text-color">Set:</p>
                            </div>
                            <p class="h4-style bold-text">{{ moment(astro.moonset, 'hh:mm A').format('HH:mm') }}</p>
                        </div>
                    </div>
                </template>
            </CardWeatherBottom>
        </template>
    </CardWeather>
</template>