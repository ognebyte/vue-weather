<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SelectButton, Button } from "primevue";
import SearchCity from '@/components/SearchCity.vue';
import LocationInfo from '@/components/LocationInfo.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import ForecastWeather from '@/components/ForecastWeather.vue';
import HourlyForecast from '@/components/HourlyForecast.vue'
import AirQuality from '@/components/AirQuality.vue';
import AstroInfo from '@/components/AstroInfo.vue';
import Alerts from '@/components/Alerts.vue';


const isCelsius = ref<boolean>(true)
const tempOptions = [
    {
        name: "°C",
        isCelsius: true
    },
    {
        name: "°F",
        isCelsius: false
    }
]
const htmlClassList = document.documentElement.classList
const isDarkMode = ref(htmlClassList.contains('dark-mode'))

onMounted(() => {
    let theme = localStorage.getItem('theme')
    if (!theme) localStorage.setItem('theme', 'light')
    else if (theme === 'dark') toggleDarkMode()
})

function toggleDarkMode() {
    htmlClassList.toggle('dark-mode');
    isDarkMode.value = htmlClassList.contains('dark-mode')
    localStorage.setItem('theme', htmlClassList.contains('dark-mode') ? 'dark' : 'light')
}
</script>

<template>
    <header>
        <div class="flex-row" style="justify-content: flex-end; gap: 1rem;">
            <Button :icon="isDarkMode ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" @click="toggleDarkMode()" />
            <SelectButton v-model:model-value="isCelsius" option-value="isCelsius" :options="tempOptions"
                option-label="name" :allow-empty="false" />
            <SearchCity />
        </div>
    </header>

    <main class="weather-wrapper">
        <LocationInfo />
        <CurrentWeather :is-celsius="isCelsius" />
        <ForecastWeather :is-celsius="isCelsius" />
        <HourlyForecast />
        <AirQuality />
        <AstroInfo />
        <Alerts />
    </main>
</template>

<style scoped>
.weather-wrapper {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(300px, 1fr);
    gap: 1rem;
}
</style>