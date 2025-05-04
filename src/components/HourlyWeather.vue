<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button, Divider } from 'primevue';
import moment from 'moment';
import { storeWeather } from '@/store/store';
import type { HourlyForecast } from '@/utils/weatherInterface';
import { formatTemp } from '@/utils/formatTemp';
import IconSnow from '@/components/icons/IconSnow.vue';
import IconDroplet from '@/components/icons/IconDroplet.vue';


defineProps<{
    hourlyForecast: HourlyForecast[]
}>()

const scrollContainer = ref<HTMLElement | null>(null);
const storeWeatherDateFormat = computed(() => storeWeather.dateFormat);
const storeWeatherIsCelsius = computed(() => storeWeather.isCelsius);


function scroll(direction: 'left' | 'right') {
    const container = scrollContainer.value;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
};

function formatTime(time: string) {
    const m = moment(time, storeWeatherDateFormat.value);
    return m.format('HH:mm') === '00:00' ? m.format('ddd, HH:mm') : m.format('HH:mm');
};

function isNewDay(time: string) {
    return moment(time, storeWeatherDateFormat.value).format('HH:mm') === '00:00';
};
</script>

<template>
    <div class="flex-row hourly-wrapper">
        <Button class="scroll-btn" icon="pi pi-chevron-left" severity="secondary" @click="scroll('left')" />

        <div class="hourly-scroll" ref="scrollContainer">
            <div v-for="(hour, index) in hourlyForecast" :key="hour.time" class="flex-row" style="flex-shrink: 0;">
                <Divider v-if="index !== 0 && isNewDay(hour.time)" layout="vertical" />
                <div class="flex-column gap-small" style="align-items: center;">
                    <p class="secondary-text-color">
                        {{ formatTime(hour.time) }}
                    </p>
                    <img :src="'https:' + hour.condition.icon" :alt="hour.condition.text" />
                    <p class="h4-style">
                        {{ formatTemp(storeWeatherIsCelsius, hour.temp_c, hour.temp_f) }}
                    </p>
                    <span v-if="hour.chance_of_snow || hour.chance_of_rain"
                        class="flex-row secondary-text-color small-text gap-small" style="align-items: center;">
                        <IconSnow v-if="hour.chance_of_snow" size="1rem" />
                        <IconDroplet v-else size="1rem" />
                        {{ hour.chance_of_snow ? hour.chance_of_snow : hour.chance_of_rain }}%
                    </span>
                </div>
            </div>
        </div>

        <Button class="scroll-btn" icon="pi pi-chevron-right" severity="secondary" @click="scroll('right')" />
    </div>
</template>

<style scoped>
.hourly-wrapper {
    position: relative;
    align-items: stretch;
    gap: .5rem;
}

.hourly-scroll {
    flex: 1;
    display: flex;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    scroll-behavior: smooth;
    overflow-x: auto;
}

.scroll-btn {
    flex-shrink: 0;
    opacity: .4;
}

@media (width < 600px) {
    .hourly-scroll {
        padding-inline: 0;
    }

    .scroll-btn {
        display: none;
    }
}
</style>
