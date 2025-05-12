import { h } from 'vue';

import FirstQuarter from '@/components/icons/moonPhases/FirstQuarter.vue';
import FullMoon from '@/components/icons/moonPhases/FullMoon.vue';
import LastQuarter from '@/components/icons/moonPhases/LastQuarter.vue';
import WaningCrescent from '@/components/icons/moonPhases/WaningCrescent.vue';
import WaningGibbous from '@/components/icons/moonPhases/WaningGibbous.vue';
import WaxingCrescent from '@/components/icons/moonPhases/WaxingCrescent.vue';
import WaxingGibbous from '@/components/icons/moonPhases/WaxingGibbous.vue';


export function getMoonPhaseIcon(moon_phase: string, iconSize: string) {
    switch (moon_phase) {
        case 'New Moon':
            return h(FullMoon, { size: iconSize });
        case 'Waxing Crescent':
            return h(WaxingCrescent, { size: iconSize });
        case 'First Quarter':
            return h(FirstQuarter, { size: iconSize });
        case 'Waxing Gibbous':
            return h(WaxingGibbous, { size: iconSize });
        case 'Full Moon':
            return h(FullMoon, { size: iconSize });
        case 'Waning Gibbous':
            return h(WaningGibbous, { size: iconSize });
        case 'Last Quarter':
            return h(LastQuarter, { size: iconSize });
        case 'Waning Crescent':
            return h(WaningCrescent, { size: iconSize })
        default:
            return h(FullMoon, { size: iconSize });
    }
}