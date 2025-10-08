'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapComponentProps {
  center: [number, number]
  selectedLayer: string
  layers: Array<{
    id: string
    name: string
    visible: boolean
    source: string
  }>
}

const MapComponent: React.FC<MapComponentProps> = ({ center, selectedLayer, layers }) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map
    mapRef.current = L.map(mapContainerRef.current).setView(center, 11)

    // Add base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current)

    // Add NASA imagery overlay
    const nasaImagery = L.tileLayer.wms('https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi', {
      layers: 'MODIS_Terra_CorrectedReflectance_TrueColor',
      format: 'image/png',
      transparent: true,
      version: '1.1.1',
      attribution: 'NASA Global Imagery Browse Services (GIBS)'
    })

    // Add sample data layers based on selected layer
    const addDataLayer = () => {
      if (!mapRef.current) return

      // Remove existing data layers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer.WMS || (layer.getAttribution && layer.getAttribution()?.includes('Sample Data'))) {
          mapRef.current?.removeLayer(layer)
        }
      })

      // Add selected layer
      switch (selectedLayer) {
        case 'heat':
          addHeatIslandLayer()
          break
        case 'vegetation':
          addVegetationLayer()
          break
        case 'airquality':
          addAirQualityLayer()
          break
        case 'flood':
          addFloodRiskLayer()
          break
      }
    }

    const addHeatIslandLayer = () => {
      if (!mapRef.current) return

      // Simulate heat island data with colored circles
      const heatSpots = [
        { lat: center[1] + 0.02, lng: center[0] - 0.02, temp: 95, radius: 1000 },
        { lat: center[1] - 0.01, lng: center[0] + 0.015, temp: 88, radius: 800 },
        { lat: center[1] + 0.015, lng: center[0] + 0.01, temp: 92, radius: 600 },
        { lat: center[1] - 0.02, lng: center[0] - 0.015, temp: 85, radius: 700 },
      ]

      heatSpots.forEach((spot) => {
        const color = spot.temp > 90 ? '#ff4444' : spot.temp > 85 ? '#ff8844' : '#44ff44'
        const circle = L.circle([spot.lat, spot.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.3,
          radius: spot.radius
        }).addTo(mapRef.current!)
        
        circle.bindPopup(`Temperature: ${spot.temp}°C<br/>Heat Island Intensity: ${spot.temp - 35}°C above baseline`)
      })
    }

    const addVegetationLayer = () => {
      if (!mapRef.current) return

      // Simulate vegetation data
      const vegetationAreas = [
        { lat: center[1] + 0.025, lng: center[0] - 0.025, ndvi: 0.8, name: 'City Park' },
        { lat: center[1] - 0.02, lng: center[0] + 0.02, ndvi: 0.6, name: 'Residential Green Space' },
        { lat: center[1] + 0.01, lng: center[0] + 0.025, ndvi: 0.4, name: 'Urban Forest' },
      ]

      vegetationAreas.forEach((area) => {
        const color = area.ndvi > 0.6 ? '#00ff00' : area.ndvi > 0.4 ? '#ffff00' : '#ff8800'
        const marker = L.circleMarker([area.lat, area.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.7,
          radius: 15
        }).addTo(mapRef.current!)
        
        marker.bindPopup(`${area.name}<br/>NDVI: ${area.ndvi}<br/>Vegetation Level: ${area.ndvi > 0.6 ? 'High' : area.ndvi > 0.4 ? 'Moderate' : 'Low'}`)
      })
    }

    const addAirQualityLayer = () => {
      if (!mapRef.current) return

      // Simulate air quality monitoring points
      const airQualityStations = [
        { lat: center[1] + 0.01, lng: center[0] - 0.01, aqi: 156, pollutant: 'PM2.5' },
        { lat: center[1] - 0.015, lng: center[0] + 0.01, aqi: 89, pollutant: 'Ozone' },
        { lat: center[1] + 0.02, lng: center[0] + 0.02, aqi: 134, pollutant: 'NO2' },
      ]

      airQualityStations.forEach((station) => {
        const color = station.aqi > 150 ? '#ff0000' : station.aqi > 100 ? '#ff8800' : '#00ff00'
        const marker = L.marker([station.lat, station.lng], {
          icon: L.divIcon({
            className: 'air-quality-marker',
            html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [20, 20]
          })
        }).addTo(mapRef.current!)
        
        marker.bindPopup(`Air Quality Index: ${station.aqi}<br/>Primary Pollutant: ${station.pollutant}<br/>Level: ${station.aqi > 150 ? 'Unhealthy' : station.aqi > 100 ? 'Moderate' : 'Good'}`)
      })
    }

    const addFloodRiskLayer = () => {
      if (!mapRef.current) return

      // Simulate flood risk areas
      const floodRiskAreas = [
        { lat: center[1] + 0.03, lng: center[0] - 0.03, risk: 'High', elevation: 450 },
        { lat: center[1] - 0.025, lng: center[0] + 0.025, risk: 'Medium', elevation: 520 },
        { lat: center[1] + 0.02, lng: center[0] + 0.03, risk: 'Low', elevation: 650 },
      ]

      floodRiskAreas.forEach((area) => {
        const color = area.risk === 'High' ? '#ff0000' : area.risk === 'Medium' ? '#ff8800' : '#00ff00'
        const polygon = L.polygon([
          [area.lat - 0.005, area.lng - 0.005],
          [area.lat + 0.005, area.lng - 0.005],
          [area.lat + 0.005, area.lng + 0.005],
          [area.lat - 0.005, area.lng + 0.005]
        ], {
          color: color,
          fillColor: color,
          fillOpacity: 0.3
        }).addTo(mapRef.current!)
        
        polygon.bindPopup(`Flood Risk: ${area.risk}<br/>Elevation: ${area.elevation} ft<br/>Risk Level: ${area.risk === 'High' ? 'Immediate Action Needed' : area.risk === 'Medium' ? 'Monitor Closely' : 'Low Priority'}`)
      })
    }

    // Add city center marker
    const cityMarker = L.marker(center).addTo(mapRef.current)
    const cityName = center[1] > 20 ? 'Mumbai' : center[1] > 15 ? 'Chennai' : center[1] > 10 ? 'Bangalore' : 'Delhi'
    cityMarker.bindPopup(`<b>${cityName} Center</b><br/>Urban Planning Focus Area`)

    addDataLayer()

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center, selectedLayer])

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full"
      style={{ height: '500px' }}
    />
  )
}

export default MapComponent
