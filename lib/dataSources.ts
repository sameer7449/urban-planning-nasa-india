export interface DataSource {
  name: string
  description: string
  url: string
  lastUpdated: string
  processingTime: string
  dataset: string
  units: string
  uncertainty?: string
}

export interface MetricData {
  value: number | string
  unit: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  source: DataSource
  timestamp: string
  uncertainty?: string
}

export const dataSources: Record<string, DataSource> = {
  ecostress: {
    name: 'ECOSTRESS',
    description: 'Surface Temperature and Urban Heat Index',
    url: 'https://ecostress.jpl.nasa.gov/',
    lastUpdated: '2025-01-20T10:30:00Z',
    processingTime: '2025-01-20T14:00:00Z',
    dataset: 'ECOSTRESS L2 Surface Temperature',
    units: '°C',
    uncertainty: '±1.5°C'
  },
  landsat: {
    name: 'Landsat 8/9',
    description: 'Green Space Coverage and NDVI',
    url: 'https://landsat.gsfc.nasa.gov/',
    lastUpdated: '2025-01-19T15:45:00Z',
    processingTime: '2025-01-20T08:30:00Z',
    dataset: 'Landsat 8/9 OLI/TIRS',
    units: '%',
    uncertainty: '±2%'
  },
  viirs: {
    name: 'VIIRS',
    description: 'Nighttime Lights and Urban Growth',
    url: 'https://viirsland.gsfc.nasa.gov/',
    lastUpdated: '2025-01-20T02:15:00Z',
    processingTime: '2025-01-20T06:00:00Z',
    dataset: 'VIIRS Day/Night Band',
    units: 'index',
    uncertainty: '±5%'
  },
  modis: {
    name: 'MODIS/MAIAC',
    description: 'Air Quality and Aerosol Optical Depth',
    url: 'https://modis.gsfc.nasa.gov/',
    lastUpdated: '2025-01-20T12:00:00Z',
    processingTime: '2025-01-20T16:30:00Z',
    dataset: 'MODIS MAIAC AOD + Local Sensors',
    units: 'AQI',
    uncertainty: '±10 AQI'
  },
  grace: {
    name: 'GRACE-FO',
    description: 'Groundwater Trends',
    url: 'https://gracefo.jpl.nasa.gov/',
    lastUpdated: '2025-01-18T09:20:00Z',
    processingTime: '2025-01-19T11:45:00Z',
    dataset: 'GRACE-FO Level-2',
    units: 'cm',
    uncertainty: '±2cm'
  },
  smap: {
    name: 'SMAP',
    description: 'Soil Moisture',
    url: 'https://smap.jpl.nasa.gov/',
    lastUpdated: '2025-01-20T07:30:00Z',
    processingTime: '2025-01-20T10:15:00Z',
    dataset: 'SMAP L3 Soil Moisture',
    units: '%',
    uncertainty: '±3%'
  }
}

export const aqiRanges = [
  { min: 0, max: 50, level: 'Good', color: 'green', guidance: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
  { min: 51, max: 100, level: 'Moderate', color: 'yellow', guidance: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.' },
  { min: 101, max: 150, level: 'Unhealthy for Sensitive Groups', color: 'orange', guidance: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' },
  { min: 151, max: 200, level: 'Unhealthy', color: 'red', guidance: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.' },
  { min: 201, max: 300, level: 'Very Unhealthy', color: 'purple', guidance: 'Health alert: The risk of health effects is increased for everyone.' },
  { min: 301, max: 500, level: 'Hazardous', color: 'maroon', guidance: 'Health warning of emergency conditions: everyone is more likely to be affected.' }
]

export const getAQIInfo = (aqi: number) => {
  const range = aqiRanges.find(r => aqi >= r.min && aqi <= r.max)
  return range || aqiRanges[aqiRanges.length - 1]
}

export const getAQIColor = (aqi: number) => {
  const info = getAQIInfo(aqi)
  const colorMap = {
    green: 'bg-green-100 text-green-800 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    maroon: 'bg-red-900 text-white border-red-900'
  }
  return colorMap[info.color as keyof typeof colorMap] || colorMap.red
}
