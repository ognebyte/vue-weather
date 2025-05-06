<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { SelectButton, Button, Skeleton } from "primevue";
import { storeWeather } from "@/store/store";
import SearchLocation from '@/components/SearchLocation.vue';
import IconLogo from "@/components/icons/IconLogo.vue";


const currentLocation = computed(() => storeWeather.data.location);
const storeWeatherError = computed(() => storeWeather.error);
const storeWeatherLoading = computed(() => storeWeather.loading);
const storeWeatherIsCelsius = computed({
    get() {
        return storeWeather.isCelsius
    },
    set(newValue) {
        storeWeather.isCelsius = newValue
    }
});
const htmlClassList = document.documentElement.classList
const isDarkMode = ref(htmlClassList.contains('dark-mode'))
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


function toggleTempType() {
    localStorage.setItem('isCelsius', storeWeatherIsCelsius ? 'true' : 'false')
}

function toggleDarkMode() {
    htmlClassList.toggle('dark-mode');
    isDarkMode.value = htmlClassList.contains('dark-mode')
    localStorage.setItem('theme', htmlClassList.contains('dark-mode') ? 'dark' : 'light')
}

onMounted(() => {
    let temp = localStorage.getItem('isCelsius')
    if (!temp) localStorage.setItem('isCelsius', 'true')
    else storeWeatherIsCelsius.value = JSON.parse(temp)

    let theme = localStorage.getItem('theme')
    if (!theme) localStorage.setItem('theme', 'light')
    else if (theme === 'dark') toggleDarkMode()
})
</script>

<template>
    <div class="header-wrapper">
        <div class="flex-row wrap gap-large" style="justify-content: space-between;">
            <div class="flex-row gap" style="gap: 1.5rem;">
                <IconLogo class="secondary-text-color" />
                <div v-if="!storeWeatherError" class="secondary-text-color" icon="pi pi-map-marker">
                    <Skeleton v-if="storeWeatherLoading" width="200px"></Skeleton>
                    <p v-else class="flex-row gap">
                        <i class="pi pi-map-marker"></i>
                        <span>{{ currentLocation.name }}, {{ currentLocation.country }}</span>
                    </p>
                </div>
            </div>
            <div class="flex-row gap">
                <SearchLocation />
                <SelectButton v-model:model-value="storeWeatherIsCelsius" option-value="isCelsius"
                    :options="tempOptions" option-label="name" :allow-empty="false" @change="toggleTempType()" />
                <Button :icon="isDarkMode ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary"
                    @click="toggleDarkMode()" />
            </div>
        </div>
    </div>
</template>