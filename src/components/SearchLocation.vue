<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Drawer, IconField, InputIcon, InputText, ProgressSpinner } from 'primevue';
import { storeSearchLocations } from '@/store/store';
import type { SearchLocation } from '@/utils/weatherInterface';
import LocationsList from '@/components/LocationsList.vue';


const router = useRouter()
const visible = ref(false)
const recentSearches = ref<SearchLocation[]>([])
const inputSearch = ref<string>('')
const showLoading = ref(false)
var debounceTimeout: ReturnType<typeof setTimeout>

const isRecent = computed(() => inputSearch.value.length === 0)
const displayLocations = computed(() => isRecent.value ? recentSearches.value : storeSearchLocations.data)


function drawerAfterHide() {
    storeSearchLocations.initialStateData()
    inputSearch.value = ''
}

function updateRecentSearches(location: SearchLocation, removeOnly = false) {
    const index = recentSearches.value.findIndex(el => el.id === location.id)
    if (index !== -1) recentSearches.value.splice(index, 1)
    if (!removeOnly) {
        if (recentSearches.value.length > 7) {
            recentSearches.value.pop()
        }
        recentSearches.value.unshift(location)
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value))
}

function locationClick(location: SearchLocation) {
    updateRecentSearches(location)
    visible.value = false
    router.push({ query: { lat: location.lat, lon: location.lon } })
}

function deleteRecent(location: SearchLocation) {
    updateRecentSearches(location, true)
}

watch(inputSearch, (val) => {
    clearTimeout(debounceTimeout)
    showLoading.value = true

    debounceTimeout = setTimeout(() => {
        storeSearchLocations.searchLocation(val).finally(() => {
            showLoading.value = false
        })
    }, 300)
})

onMounted(() => {
    let localStore = localStorage.getItem('recentSearches')
    if (localStore) recentSearches.value = JSON.parse(localStore);
})
</script>

<template>
    <Button severity="secondary" label="Search" icon="pi pi-search" @click="() => visible = true"></Button>

    <Drawer :block-scroll="true" v-bind:class="$style.drawer" @after-hide="drawerAfterHide()" v-model:visible="visible"
        position="top">
        <template #header>
            <div class="flex-column" style="flex: 1;">
                <IconField>
                    <InputIcon class="pi pi-search" />
                    <InputText v-model="inputSearch" id="search-location" type="text" size="large" fluid autofocus
                        autocomplete="off" placeholder="Search" />
                </IconField>
            </div>
        </template>

        <template #closebutton>
            <Button label="Close" size="large" style="margin-left: 0.5rem;" @click="visible = false"></Button>
        </template>

        <template #footer>
            <p class="small-text secondary-text-color">
                Pass city name, Latitude/Longitude (decimal degree), US Zipcode, UK Postcode, Canada Postalcode or IP
                address.
            </p>
        </template>


        <div v-if="isRecent" v-bind:class="$style['drawer-content']" class="flex-row">
            <p class="secondary-text-color"
                v-bind:class="[{ [$style['drawer-content-center']]: recentSearches.length === 0 }]">
                {{ recentSearches.length === 0 ? 'No recent searches' : 'Recent' }}
            </p>
        </div>
        <div v-else-if="storeSearchLocations.data.length === 0" v-bind:class="$style['drawer-content']">
            <ProgressSpinner v-if="showLoading" v-bind:class="$style['drawer-content-center']"
                style="width: 64px; height: 64px;" />
            <p v-else class="secondary-text-color" v-bind:class="$style['drawer-content-center']">
                No results for "{{ inputSearch }}"
            </p>
        </div>

        <LocationsList :locations="displayLocations" :location-click="locationClick" :is-recent="isRecent"
            :delete-recent="deleteRecent" />
    </Drawer>
</template>

<style module>
.drawer {
    height: 100vh !important;
}

.drawer-content {
    display: flex;
    padding: 0.5rem 0.75rem;
}

.drawer-content-center {
    margin: auto;
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