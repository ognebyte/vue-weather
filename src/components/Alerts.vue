<script setup lang="ts">
import { computed } from 'vue';
import { Divider } from 'primevue';
import moment from 'moment';
import { storeWeather } from '@/store/store';
import CardWeather from '@/components/CardWeather.vue';


const storeWeatherLoading = computed(() => storeWeather.loading);
const currentAlerts = computed(() => storeWeather.data.alerts.alert);
</script>

<template>
    <CardWeather :loading="storeWeatherLoading" label="Alerts" min-height="9rem">
        <template v-slot:icon>
            <i class="pi pi-exclamation-triangle"></i>
        </template>
        <template v-slot:addition>
            <div v-if="currentAlerts.length == 0" style="display: flex; align-items: center; align-self: center; height: 100%;">
                <p class="h4-style secondary-text-color">No alerts</p>
            </div>
            <div v-else class="alerts-wrapper">
                <div v-for="(alert, index) in currentAlerts">
                    <Divider v-if="index != 0" />
                    <div class="flex-column gap">
                        <p class="h4-style">{{ alert.headline }}</p>
                        <div class="flex-row gap" style="flex-wrap: wrap; justify-content: space-between;">
                            <p>{{ moment.parseZone(alert.effective).format('dddd, D MMM, HH:mm') }}</p>
                            <p v-if="alert.expires" class="secondary-text-color">Expires: {{ moment.parseZone(alert.expires).format('dddd, D MMM, HH:mm') }}</p>
                        </div>
                        <p class="small-text secondary-text-color">{{ alert.desc }}</p>
                    </div>
                </div>
            </div>
        </template>
    </CardWeather>
</template>

<style scoped></style>
