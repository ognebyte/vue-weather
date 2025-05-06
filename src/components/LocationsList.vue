<script setup lang="ts">
import { Button, Divider } from 'primevue';
import type { SearchLocation } from '@/utils/weatherInterface';

defineProps<{
    locations: SearchLocation[]
    isRecent: boolean
    locationClick: (location: SearchLocation) => void
    deleteRecent: (location: SearchLocation) => void
}>()
</script>

<template>
    <div v-for="(location, index) in locations" :key="location.id">
        <Divider v-if="index != 0" />
        <div class="flex-row gap">
            <Button class="flex-column" variant="text" fluid style="align-items: flex-start; white-space: nowrap;"
                @click="locationClick(location)">
                <h2><i v-if="isRecent" class="pi pi-history"></i> {{ location.name }}</h2>
                <div class="flex-row">
                    <p>{{ location.country }}</p>
                    <p v-if="location.region">, {{ location.region }}</p>
                </div>
            </Button>
            <Button v-if="isRecent" icon="pi pi-trash" severity="secondary" @click="deleteRecent(location)"></Button>
        </div>
    </div>
</template>