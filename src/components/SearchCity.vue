<script setup lang="ts">
import { storeLocation, storeWeather } from '@/store/store';
import { Button, Drawer, IconField, InputIcon, InputText, Message, Divider } from 'primevue';
import { ref, type VNodeRef } from 'vue';


const visible = ref(false)

function locationClick(lat: number, lon: number) {
    storeWeather.changeLocation(`${lat},${lon}`)
    visible.value = false
}
</script>

<template>
    <Button severity="secondary" label="Search" icon="pi pi-search" @click="visible = true"></Button>

    <Drawer :block-scroll="true" v-bind:class="$style.drawer" v-on:after-hide="storeLocation.initialStateData()"
        v-model:visible="visible" position="top">
        <template #header>
            <div class="flex-column" style="flex: 1;">
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText id="search-location" type="text" size="large" fluid autocomplete="off"
                        placeholder="Search" autofocus @value-change="event => storeLocation.searchLocation(event)" />
                </IconField>
            </div>
        </template>
        
        <template #closebutton>
            <Button label="Close" size="large" style="margin-left: 0.5rem;" @click="visible = false"></Button>
        </template>
        
        <template #footer>
            <Message size="small" severity="secondary" variant="simple">
                Pass city name, Latitude/Longitude (decimal degree), US Zipcode, UK Postcode, Canada Postalcode or IP
                address.
            </Message>
        </template>


        <div v-bind:class="$style.emptySearch">
            <Message v-if="storeLocation.data.length == 0" severity="secondary" variant="simple" style="margin: auto;">
                No recent searches
            </Message>
        </div>
        <div v-for="(location, index) in storeLocation.data" :key="location.id">
            <Divider v-if="index != 0" />
            <Button class="flex-column" variant="text" fluid style="align-items: flex-start;"
                @click="locationClick(location.lat, location.lon)">
                <h2>{{ location.name }}</h2>
                <div class="flex-row">
                    <p>{{ location.country }}</p>
                    <p v-if="location.region">, {{ location.region }}</p>
                </div>
            </Button>
        </div>
    </Drawer>
</template>

<style module>
.drawer {
    height: 100vh !important;
}

.emptySearch {
    display: flex;
    margin-top: 2rem;
}

@media (min-width: 600px) {
    .drawer {
        margin-top: 1.5rem;
        height: auto !important;
        max-width: 550px;
        min-height: 300px;
        max-height: 60vh;
    }
}
</style>