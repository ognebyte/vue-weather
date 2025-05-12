<template>
    <div class="footer-wrapper">
        <div class="flex-row">
            <p class="secondary-text-color">
                &copy;{{ new Date().getFullYear() }} VueWeather
            </p>
        </div>
        <div class="flex-row gap">
            <a class="secondary-text-color" href="https://github.com/ognebyte/vue-weather" target="_blank">
                GitHub
            </a>
            <a class="secondary-text-color" href="https://www.weatherapi.com/" target="_blank">
                Data source: WeatherAPI
            </a>
        </div>
    </div>
</template>

<style scoped>
.footer-wrapper {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: var(--max-width);
    margin: auto;
    padding: var(--gap-large);
    gap: var(--gap-large);
}
</style>