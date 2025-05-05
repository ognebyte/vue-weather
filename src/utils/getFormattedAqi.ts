interface Breakpoint {
    low: number;
    high: number;
}

interface AqiCategory {
    name: string;
    color: string;
}

interface AqiResult {
    aqi: number;
    aqiMax: number;
    category: AqiCategory;
}

const aqiBreakpoints: Breakpoint[] = [
    { low: 0, high: 50 },
    { low: 51, high: 100 },
    { low: 101, high: 150 },
    { low: 151, high: 200 },
    { low: 201, high: 300 },
    { low: 301, high: 500 }
]

const aqiCategories: AqiCategory[] = [
    { name: "Good", color: "#00e400" },
    { name: "Moderate", color: "#ffff00" },
    { name: "Sensitive", color: "#ff7e00" },
    { name: "Unhealthy", color: "#ff0000" },
    { name: "Very Unhealthy", color: "#8f3f97" },
    { name: "Hazardous", color: "#7e0023" }
]

function createAqiEvaluator(pollutantBreakpoints: Breakpoint[]): (value: number) => AqiResult {
    const aqiMax = aqiBreakpoints[aqiBreakpoints.length - 1].high

    return (value: number) => {
        for (let i = 0; i < pollutantBreakpoints.length; i++) {
            const bp = pollutantBreakpoints[i]
            if (Math.round(value) >= bp.low && Math.round(value) <= bp.high) {
                const aqiRange = aqiBreakpoints[i]
                const aqi = ((aqiRange.high - aqiRange.low) / (bp.high - bp.low)) * (value - bp.low) + aqiRange.low
                return {
                    aqi: Math.round(aqi * 10) / 10,
                    aqiMax: aqiMax,
                    category: aqiCategories[i]
                }
            }
        }
        return {
            aqi: aqiMax,
            aqiMax: aqiMax,
            category: aqiCategories[aqiCategories.length - 1]
        }
    }
}


export const getFormattedAqi = {
    pm2_5: createAqiEvaluator([
        { low: 0, high: 12 },
        { low: 13, high: 35 },
        { low: 36, high: 55 },
        { low: 56, high: 150 },
        { low: 151, high: 250 },
        { low: 251, high: 500 }
    ]),
    pm10: createAqiEvaluator([
        { low: 0, high: 54 },
        { low: 55, high: 154 },
        { low: 155, high: 254 },
        { low: 255, high: 354 },
        { low: 355, high: 424 },
        { low: 425, high: 604 }
    ]),
    co: createAqiEvaluator([
        { low: 0, high: 5000 },
        { low: 5001, high: 10000 },
        { low: 10001, high: 15000 },
        { low: 15001, high: 20000 },
        { low: 20001, high: 30000 },
        { low: 30001, high: 50000 }
    ]),
    no2: createAqiEvaluator([
        { low: 0, high: 53 },
        { low: 54, high: 100 },
        { low: 101, high: 360 },
        { low: 361, high: 649 },
        { low: 650, high: 1249 },
        { low: 1250, high: 2049 }
    ]),
    o3: createAqiEvaluator([
        { low: 0, high: 100 },
        { low: 101, high: 160 },
        { low: 161, high: 220 },
        { low: 221, high: 290 },
        { low: 291, high: 400 },
        { low: 401, high: 604 }
    ]),
    so2: createAqiEvaluator([
        { low: 0, high: 35 },
        { low: 36, high: 75 },
        { low: 76, high: 185 },
        { low: 186, high: 304 },
        { low: 305, high: 604 },
        { low: 605, high: 1004 }
    ])
}