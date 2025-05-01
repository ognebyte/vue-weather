<script setup lang="ts">
import { onMounted, ref } from "vue";
import { SelectButton, Button, Message, Skeleton } from "primevue";
import SearchLocation from '@/components/SearchLocation.vue';
import { storeWeather } from "@/store/store";
import IconLogo from "@/components/icons/IconLogo.vue";


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
    localStorage.setItem('isCelsius', storeWeather.isCelsius ? 'true' : 'false')
}

function toggleDarkMode() {
    htmlClassList.toggle('dark-mode');
    isDarkMode.value = htmlClassList.contains('dark-mode')
    localStorage.setItem('theme', htmlClassList.contains('dark-mode') ? 'dark' : 'light')
}

onMounted(() => {
    let temp = localStorage.getItem('isCelsius')
    if (!temp) localStorage.setItem('isCelsius', 'true')
    else storeWeather.isCelsius = JSON.parse(temp)

    let theme = localStorage.getItem('theme')
    if (!theme) localStorage.setItem('theme', 'light')
    else if (theme === 'dark') toggleDarkMode()
})
</script>

<template>
    <div class="flex-row" style="justify-content: space-between; align-items: center; gap: .5rem;">
        <div class="header-content">
            <Message severity="secondary" variant="simple">
                <IconLogo />
            </Message>
            <Message icon="pi pi-map-marker" severity="secondary" variant="simple">
                <Skeleton v-if="storeWeather.loading" width="200px"></Skeleton>
                <span v-else>{{ storeWeather.data.location.name }}, {{ storeWeather.data.location.country }}</span>
            </Message>
        </div>
        <div class="header-content">
            <SearchLocation />
            <SelectButton v-model:model-value="storeWeather.isCelsius" option-value="isCelsius" :options="tempOptions"
                option-label="name" :allow-empty="false" @change="toggleTempType()" />
            <Button :icon="isDarkMode ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" @click="toggleDarkMode()" />
        </div>
    </div>
</template>

<style scoped>
.header-content {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>