export function calculateStats(forecast) {
  let minTemp = forecast[0].min
  let maxTemp = forecast[0].max
  let sum = 0
  let sunnyDays = 0
  let rainyDays = 0
  let cloudyDays = 0

  for (let i = 0; i < forecast.length; i++) {
    const day = forecast[i]

    if (day.min < minTemp) {
      minTemp = day.min
    }

    if (day.max > maxTemp) {
      maxTemp = day.max
    }

    sum += day.max

    if (day.status === "Soleado") sunnyDays++
    if (day.status === "Lluvioso") rainyDays++
    if (day.status === "Nublado") cloudyDays++
  }

  const avg = sum / forecast.length

  return {
    min: minTemp,
    max: maxTemp,
    avg: avg,
    sunny: sunnyDays,
    rainy: rainyDays,
    cloudy: cloudyDays
  }
}

export function getSummary(stats) {
  if (stats.sunny > stats.rainy && stats.sunny > stats.cloudy) {
    return "Semana mayormente soleada."
  }

  if (stats.rainy >= 3) {
    return "Semana lluviosa con varios días de lluvia."
  }

  if (stats.avg < 15) {
    return "Semana fría."
  }

  return "Semana con clima variable."
}

export function getAlerts(stats) {
  const alerts = []

  if (stats.avg > 28) {
    alerts.push("Alerta de calor")
  }

  if (stats.rainy >= 3) {
    alerts.push("Semana lluviosa")
  }

  if (stats.min < 5) {
    alerts.push("Alerta de bajas temperaturas")
  }

  return alerts
}