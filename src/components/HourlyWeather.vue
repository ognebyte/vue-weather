<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Button, Divider, Message } from 'primevue';
import moment from 'moment';
import { storeWeather } from '@/store/store';
import { formatTemp } from '@/utils/formatTemp';
import type { ForecastDay, HourlyForecast } from '@/utils/weatherInterface';
import IconDroplets from './icons/IconDroplets.vue';


const props = defineProps<{
    hourlyForecast: HourlyForecast[]
    dayForecast: ForecastDay[]
}>()

const scrollContainer = ref<HTMLElement | null>(null);
const isCelsius = computed(() => storeWeather.isCelsius);


const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainer.value;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
};

const formatTime = (time: string) => {
    const m = moment(time, storeWeather.dateFormat);
    return m.format('HH:mm') === '00:00' ? m.format('ddd, HH:mm') : m.format('HH:mm');
};

const isNewDay = (time: string) => {
    return moment(time, storeWeather.dateFormat).format('HH:mm') === '00:00';
};
</script>

<template>
    <div class="flex-row hourly-wrapper">
        <Button class="scroll-btn" icon="pi pi-chevron-left" severity="secondary" @click="scroll('left')" />

        <div class="hourly-scroll" ref="scrollContainer">
            <div v-for="(hour, index) in hourlyForecast" :key="hour.time" class="flex-row" style="flex-shrink: 0;">
                <Divider v-if="index !== 0 && isNewDay(hour.time)" layout="vertical" />
                <div class="flex-column hourly-content">
                    <Message severity="secondary" variant="simple">
                        {{ formatTime(hour.time) }}
                    </Message>
                    <img :src="'https:' + hour.condition.icon" :alt="hour.condition.text" />
                    <p class="h4-style">{{ formatTemp(isCelsius, hour.temp_c, hour.temp_f) }}</p>
                    <Message v-if="hour.chance_of_rain != 0" severity="secondary" variant="simple" size="small">
                        <div class="flex-row" style="align-items: center; gap: .25rem;">
                            <IconDroplets size="1rem"/>
                            {{ hour.chance_of_rain }}
                        </div>
                    </Message>
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

.hourly-content {
    align-items: center;
    gap: .25rem;
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
    .scroll-btn {
        display: none;
    }
}
</style>
