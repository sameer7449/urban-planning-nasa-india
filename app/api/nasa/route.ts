import { NextRequest, NextResponse } from 'next/server'
import { nasaApiService } from '@/lib/nasa-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const city = searchParams.get('city') || 'Austin, TX'
    const layerId = searchParams.get('layerId')
    const bbox = searchParams.get('bbox')?.split(',').map(Number) as [number, number, number, number]

    switch (action) {
      case 'layers':
        const layers = nasaApiService.getDataLayers()
        return NextResponse.json({ layers })

      case 'layer-url':
        if (!layerId || !bbox) {
          return NextResponse.json({ error: 'Missing layerId or bbox parameter' }, { status: 400 })
        }
        const url = nasaApiService.getLayerUrl(layerId, bbox)
        return NextResponse.json({ url })

      case 'temperature':
        const tempData = await nasaApiService.getTemperatureData(city, {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        })
        return NextResponse.json({ data: tempData })

      case 'vegetation':
        const vegData = await nasaApiService.getVegetationData(city, {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        })
        return NextResponse.json({ data: vegData })

      case 'airquality':
        const airData = await nasaApiService.getAirQualityData(city, {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        })
        return NextResponse.json({ data: airData })

      case 'floodrisk':
        const floodData = await nasaApiService.getFloodRiskData(city, {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        })
        return NextResponse.json({ data: floodData })

      case 'insights':
        const insights = await nasaApiService.getCityInsights(city)
        return NextResponse.json({ insights })

      case 'historical':
        const metric = searchParams.get('metric') as 'temperature' | 'vegetation' | 'airquality'
        const months = parseInt(searchParams.get('months') || '12')
        const historicalData = await nasaApiService.getHistoricalData(city, metric, months)
        return NextResponse.json({ data: historicalData })

      default:
        return NextResponse.json({ error: 'Invalid action parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('NASA API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch NASA data' },
      { status: 500 }
    )
  }
}
