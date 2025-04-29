import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import '@/assets/variables.css'
import '@/assets/main.css'
import 'primeicons/primeicons.css'


const customPrimary = {
    50: 'rgb(241, 241, 241)',
    100: 'rgb(210, 210, 210)',
    200: 'rgb(190, 190, 190)',
    300: 'rgb(170, 170, 170)',
    400: 'rgb(150, 150, 150)',
    500: 'rgb(130, 130, 130)',
    600: 'rgb(110, 110, 110)',
    700: 'rgb(90, 90, 90)',
    800: 'rgb(70, 70, 70)',
    900: 'rgb(50, 50, 50)',
    950: 'rgb(27, 27, 27)'
};


const customPreset = definePreset(Aura, {
    semantic: {
        primary: customPrimary,
        colorScheme: {
            light: {
                primary: {
                    color: customPrimary[950],
                    inverseColor: customPrimary[50],
                    hoverColor: customPrimary[900],
                    activeColor: customPrimary[800]
                },
                highlight: {
                    color: customPrimary[50],
                    background: customPrimary[950],
                    focusColor: customPrimary[50],
                    focusBackground: customPrimary[700]
                }
            },
            dark: {
                primary: {
                    color: customPrimary[50],
                    inverseColor: customPrimary[950],
                    hoverColor: customPrimary[100],
                    activeColor: customPrimary[200]
                },
                highlight: {
                    color: customPrimary[950],
                    background: customPrimary[50],
                    focusColor: customPrimary[950],
                    focusBackground: customPrimary[300]
                }
            }
        }
    }
});


createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: customPreset,
            options: {
                prefix: 'pv',
                darkModeSelector: '.dark-mode'
            }
        }
    })
    .mount('#app')
