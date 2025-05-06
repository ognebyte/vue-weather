<script setup lang="ts">
import { computed, h } from 'vue';
import { Divider } from 'primevue';
import moment from 'moment';
import type { Astro } from '@/utils/weatherInterface';
import CardWeather from '@/components/CardWeather.vue';
import CardWeatherBottom from '@/components/CardWeatherBottom.vue';

import FirstQuarter from '@/components/icons/moonPhases/FirstQuarter.vue';
import FullMoon from '@/components/icons/moonPhases/FullMoon.vue';
import LastQuarter from '@/components/icons/moonPhases/LastQuarter.vue';
import WaningCrescent from '@/components/icons/moonPhases/WaningCrescent.vue';
import WaningGibbous from '@/components/icons/moonPhases/WaningGibbous.vue';
import WaxingCrescent from '@/components/icons/moonPhases/WaxingCrescent.vue';
import WaxingGibbous from '@/components/icons/moonPhases/WaxingGibbous.vue';
import IconSunrise from '@/components/icons/IconSunrise.vue';
import IconSunset from '@/components/icons/IconSunset.vue';
import IconMoonrise from '@/components/icons/IconMoonrise.vue';
import IconMoonset from '@/components/icons/IconMoonset.vue';


const props = defineProps<{
    loading: boolean
    astro: Astro
    minHeight: string
}>()


const moonPhaseIcon = computed(() => {
    switch (props.astro.moon_phase) {
        case 'New Moon':
            return h(FullMoon, { size: moonIconSize });
        case 'Waxing Crescent':
            return h(WaxingCrescent, { size: moonIconSize });
        case 'First Quarter':
            return h(FirstQuarter, { size: moonIconSize });
        case 'Waxing Gibbous':
            return h(WaxingGibbous, { size: moonIconSize });
        case 'Full Moon':
            return h(FullMoon, { size: moonIconSize });
        case 'Waning Gibbous':
            return h(WaningGibbous, { size: moonIconSize });
        case 'Last Quarter':
            return h(LastQuarter, { size: moonIconSize });
        case 'Waning Crescent':
            return h(WaningCrescent, { size: moonIconSize })
        default:
            return h(FullMoon, { size: moonIconSize });
    }
})
const moonIconSize = <string>"4rem"
</script>

<template>
    <CardWeather :loading="loading" label="Sun" :min-height="minHeight" style="grid-column: 2 span;">
        <template v-slot:icon>
            <i class="pi pi-sun"></i>
        </template>
        <template v-slot:addition>
            <CardWeatherBottom>
                <template v-slot:addition>
                    <div class="flex-row">
                        <div class="flex-column gap" style="flex: 1; align-items: center;">
                            <p class="secondary-text-color">Sunrise</p>
                            <IconSunrise />
                            <p class="h3-style bold-text">{{ moment(astro.sunrise, 'hh:mm A').format('HH:mm') }}</p>
                        </div>
                        <Divider layout="vertical" />
                        <div class="flex-column gap" style="flex: 1; align-items: center;">
                            <p class="secondary-text-color">Sunset</p>
                            <IconSunset />
                            <p class="h3-style bold-text">{{ moment(astro.sunset, 'hh:mm A').format('HH:mm') }}</p>
                        </div>
                    </div>
                </template>
            </CardWeatherBottom>
        </template>
    </CardWeather>

    <CardWeather :loading="loading" label="Moon" :min-height="minHeight" style="grid-column: 2 span;">
        <template v-slot:icon>
            <i class="pi pi-moon"></i>
        </template>
        <template v-slot:addition>
            <CardWeatherBottom>
                <template v-slot:addition>
                    <div class="flex-row">
                        <div class="flex-column gap" style="flex: 1; align-items: center;">
                            <p class="secondary-text-color">Moonrise</p>
                            <IconMoonrise />
                            <p class="h3-style bold-text">{{ moment(astro.moonrise, 'hh:mm A').format('HH:mm') }}</p>
                        </div>
                        <Divider layout="vertical" />
                        <div class="flex-column gap" style="flex: 1; align-items: center;">
                            <p class="secondary-text-color">Moonset</p>
                            <IconMoonset />
                            <p class="h3-style bold-text">{{ moment(astro.moonset, 'hh:mm A').format('HH:mm') }}</p>
                        </div>
                    </div>
                </template>
            </CardWeatherBottom>
        </template>
    </CardWeather>

    <CardWeather :loading="loading" label="Lunar phase" :min-height="minHeight" style="grid-column: 2 span;">
        <template v-slot:icon>
            <i class="pi pi-circle"></i>
        </template>
        <template v-slot:addition>
            <CardWeatherBottom>
                <template v-slot:addition>
                    <div class="flex-row gap">
                        <component :is="moonPhaseIcon"
                            style="color: var(--pv-surface-950); transform: rotate(-20deg);" />
                        <div class="flex-column gap">
                            <p class="h3-style bold-text">{{ astro.moon_phase }}</p>
                            <div class="h4-style flex-row gap">
                                <span class="secondary-text-color">Moon illumination:</span>
                                <p class="bold-text">{{ astro.moon_illumination }}%</p>
                            </div>
                        </div>
                    </div>
                </template>
            </CardWeatherBottom>
        </template>
    </CardWeather>
</template>