// NASA API Integration Service
// This service handles integration with various NASA Earth observation APIs

export interface NASADataLayer {
  id: string
  name: string
  description: string
  source: string
  url: string
  parameters: Record<string, any>
}

export interface TemperatureData {
  lat: number
  lng: number
  temperature: number
  timestamp: string
  source: string
}

export interface VegetationData {
  lat: number
  lng: number
  ndvi: number
  timestamp: string
  source: string
}

export interface AirQualityData {
  lat: number
  lng: number
  aqi: number
  pollutant: string
  timestamp: string
  source: string
}

export interface FloodRiskData {
  lat: number
  lng: number
  riskLevel: 'low' | 'medium' | 'high'
  elevation: number
  timestamp: string
  source: string
}

class NASAApiService {
  private readonly baseUrl = 'https://gibs.earthdata.nasa.gov'
  private readonly worldviewUrl = 'https://worldview.earthdata.nasa.gov'

  // NASA GIBS WMS layers for different data types
  private readonly dataLayers: NASADataLayer[] = [
    {
      id: 'landsat_temperature',
      name: 'Landsat 8 Land Surface Temperature',
      description: 'Land Surface Temperature from Landsat 8 TIRS',
      source: 'NASA Landsat 8',
      url: `${this.baseUrl}/wms/epsg4326/best/wms.cgi`,
      parameters: {
        layers: 'MODIS_Terra_Land_Surface_Temperature_Day',
        format: 'image/png',
        transparent: true,
        version: '1.1.1'
      }
    },
    {
      id: 'modis_ndvi',
      name: 'MODIS Vegetation Index',
      description: 'Normalized Difference Vegetation Index from MODIS',
      source: 'NASA MODIS',
      url: `${this.baseUrl}/wms/epsg4326/best/wms.cgi`,
      parameters: {
        layers: 'MODIS_Terra_NDVI',
        format: 'image/png',
        transparent: true,
        version: '1.1.1'
      }
    },
    {
      id: 'modis_aerosol',
      name: 'MODIS Aerosol Optical Depth',
      description: 'Air quality monitoring from MODIS',
      source: 'NASA MODIS',
      url: `${this.baseUrl}/wms/epsg4326/best/wms.cgi`,
      parameters: {
        layers: 'MODIS_Terra_Aerosol_Optical_Depth',
        format: 'image/png',
        transparent: true,
        version: '1.1.1'
      }
    },
    {
      id: 'srtm_elevation',
      name: 'SRTM Elevation Data',
      description: 'Topographical data for flood risk assessment',
      source: 'NASA SRTM',
      url: `${this.baseUrl}/wms/epsg4326/best/wms.cgi`,
      parameters: {
        layers: 'SRTM30_Color_Index',
        format: 'image/png',
        transparent: true,
        version: '1.1.1'
      }
    }
  ]

  /**
   * Get available NASA data layers
   */
  getDataLayers(): NASADataLayer[] {
    return this.dataLayers
  }

  /**
   * Generate WMS URL for a specific layer and bounding box
   */
  getLayerUrl(layerId: string, bbox: [number, number, number, number], width: number = 512, height: number = 512): string {
    const layer = this.dataLayers.find(l => l.id === layerId)
    if (!layer) {
      throw new Error(`Layer ${layerId} not found`)
    }

    const params = new URLSearchParams({
      ...layer.parameters,
      bbox: bbox.join(','),
      width: width.toString(),
      height: height.toString(),
      crs: 'EPSG:4326'
    })

    return `${layer.url}?${params.toString()}`
  }

  /**
   * Simulate temperature data retrieval (in production, this would call actual NASA APIs)
   */
  async getTemperatureData(city: string, dateRange: { start: string, end: string }): Promise<TemperatureData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock data - in production, this would be real NASA data
    const mockData: TemperatureData[] = [
      {
        lat: 19.0760,
        lng: 72.8777,
        temperature: 85.2,
        timestamp: new Date().toISOString(),
        source: 'Landsat 8 TIRS'
      },
      {
        lat: 19.0860,
        lng: 72.8877,
        temperature: 88.1,
        timestamp: new Date().toISOString(),
        source: 'Landsat 8 TIRS'
      },
      {
        lat: 19.0660,
        lng: 72.8677,
        temperature: 82.8,
        timestamp: new Date().toISOString(),
        source: 'Landsat 8 TIRS'
      }
    ]

    return mockData
  }

  /**
   * Simulate vegetation data retrieval
   */
  async getVegetationData(city: string, dateRange: { start: string, end: string }): Promise<VegetationData[]> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockData: VegetationData[] = [
      {
        lat: 19.0760,
        lng: 72.8777,
        ndvi: 0.45,
        timestamp: new Date().toISOString(),
        source: 'MODIS NDVI'
      },
      {
        lat: 19.0860,
        lng: 72.8877,
        ndvi: 0.35,
        timestamp: new Date().toISOString(),
        source: 'MODIS NDVI'
      },
      {
        lat: 19.0660,
        lng: 72.8677,
        ndvi: 0.68,
        timestamp: new Date().toISOString(),
        source: 'MODIS NDVI'
      }
    ]

    return mockData
  }

  /**
   * Simulate air quality data retrieval
   */
  async getAirQualityData(city: string, dateRange: { start: string, end: string }): Promise<AirQualityData[]> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockData: AirQualityData[] = [
      {
        lat: 19.0760,
        lng: 72.8777,
        aqi: 198,
        pollutant: 'PM2.5',
        timestamp: new Date().toISOString(),
        source: 'MODIS Aerosol'
      },
      {
        lat: 19.0860,
        lng: 72.8877,
        aqi: 156,
        pollutant: 'PM10',
        timestamp: new Date().toISOString(),
        source: 'MODIS Aerosol'
      },
      {
        lat: 19.0660,
        lng: 72.8677,
        aqi: 178,
        pollutant: 'NO2',
        timestamp: new Date().toISOString(),
        source: 'MODIS Aerosol'
      }
    ]

    return mockData
  }

  /**
   * Simulate flood risk data retrieval
   */
  async getFloodRiskData(city: string, dateRange: { start: string, end: string }): Promise<FloodRiskData[]> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockData: FloodRiskData[] = [
      {
        lat: 19.0760,
        lng: 72.8777,
        riskLevel: 'high',
        elevation: 14,
        timestamp: new Date().toISOString(),
        source: 'SRTM'
      },
      {
        lat: 19.0860,
        lng: 72.8877,
        riskLevel: 'medium',
        elevation: 18,
        timestamp: new Date().toISOString(),
        source: 'SRTM'
      },
      {
        lat: 19.0660,
        lng: 72.8677,
        riskLevel: 'low',
        elevation: 25,
        timestamp: new Date().toISOString(),
        source: 'SRTM'
      }
    ]

    return mockData
  }

  /**
   * Get NASA data insights for a specific city
   */
  async getCityInsights(city: string): Promise<{
    heatIslandIntensity: number
    greenSpaceDeficit: number
    airQualityIndex: number
    floodRiskAreas: number
    dataSources: string[]
  }> {
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock insights based on city
    const insights = {
      'Mumbai, Maharashtra': {
        heatIslandIntensity: 5.8,
        greenSpaceDeficit: 35,
        airQualityIndex: 198,
        floodRiskAreas: 28,
        dataSources: ['Landsat 8 TIRS', 'MODIS NDVI', 'SRTM']
      },
      'Delhi, NCT': {
        heatIslandIntensity: 7.2,
        greenSpaceDeficit: 42,
        airQualityIndex: 285,
        floodRiskAreas: 15,
        dataSources: ['Landsat 8 TIRS', 'MODIS Aerosol', 'SRTM']
      },
      'Bangalore, Karnataka': {
        heatIslandIntensity: 4.1,
        greenSpaceDeficit: 28,
        airQualityIndex: 156,
        floodRiskAreas: 8,
        dataSources: ['Landsat 8 TIRS', 'MODIS NDVI', 'SRTM']
      },
      'Chennai, Tamil Nadu': {
        heatIslandIntensity: 5.3,
        greenSpaceDeficit: 31,
        airQualityIndex: 178,
        floodRiskAreas: 35,
        dataSources: ['Landsat 8 TIRS', 'MODIS NDVI', 'SRTM']
      },
      'Kolkata, West Bengal': {
        heatIslandIntensity: 4.7,
        greenSpaceDeficit: 38,
        airQualityIndex: 201,
        floodRiskAreas: 42,
        dataSources: ['Landsat 8 TIRS', 'MODIS NDVI', 'SRTM']
      }
    }

    return insights[city as keyof typeof insights] || insights['Mumbai, Maharashtra']
  }

  /**
   * Get historical climate data for trend analysis
   */
  async getHistoricalData(city: string, metric: 'temperature' | 'vegetation' | 'airquality', months: number = 12): Promise<Array<{ date: string, value: number }>> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate mock historical data
    const data = []
    const now = new Date()
    
    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      let value = 0

      switch (metric) {
        case 'temperature':
          value = 65 + Math.sin((i / 12) * Math.PI * 2) * 15 + Math.random() * 5
          break
        case 'vegetation':
          value = 20 + Math.sin((i / 12) * Math.PI * 2) * 15 + Math.random() * 10
          break
        case 'airquality':
          value = 100 + Math.random() * 80
          break
      }

      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(value * 10) / 10
      })
    }

    return data
  }
}

export const nasaApiService = new NASAApiService()
