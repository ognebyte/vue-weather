export function getFormattedTemp(isCelsius: boolean, tempC: number, tempF: number): string {
    const temp = Math.round(isCelsius ? tempC : tempF)
    return `${temp > 0 ? '+' : ''}${temp}${isCelsius ? '°C' : '°F'}`
}