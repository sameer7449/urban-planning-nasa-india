'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="map-container bg-gray-200 flex items-center justify-center">
    <div className="text-gray-500">Loading map...</div>
  </div>
})

interface InteractiveMapProps {
  selectedCity: string
}

interface MapLayer {
  id: string
  name: string
  description: string
  visible: boolean
  source: string
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ selectedCity }) => {
  const [selectedLayer, setSelectedLayer] = useState('heat')
  const [layers, setLayers] = useState<MapLayer[]>([
    {
      id: 'heat',
      name: 'Surface Temperature',
      description: 'ECOSTRESS surface temperature data',
      visible: true,
      source: 'NASA ECOSTRESS L2'
    },
    {
      id: 'ndvi',
      name: 'Vegetation Index (NDVI)',
      description: 'Green space coverage from Landsat',
      visible: false,
      source: 'NASA Landsat 8/9 OLI'
    },
    {
      id: 'nightlights',
      name: 'Nighttime Lights',
      description: 'Urban growth patterns from VIIRS',
      visible: false,
      source: 'NASA VIIRS Day/Night Band'
    },
    {
      id: 'aqi',
      name: 'Air Quality Distribution',
      description: 'AQI levels from MODIS + sensors',
      visible: false,
      source: 'NASA MODIS MAIAC + Local Sensors'
    },
    {
      id: 'impervious',
      name: 'Impervious Surfaces',
      description: 'Built-up area coverage',
      visible: false,
      source: 'NASA Landsat 8/9'
    },
    {
      id: 'soil',
      name: 'Soil Moisture',
      description: 'Ground moisture levels from SMAP',
      visible: false,
      source: 'NASA SMAP L3'
    }
  ])

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible }
        : layer
    ))
    setSelectedLayer(layerId)
  }

  const getCityCoordinates = (city: string) => {
    const coordinates: { [key: string]: [number, number] } = {
      'Mumbai, Maharashtra': [72.8777, 19.0760],
      'Delhi, NCT': [77.1025, 28.7041],
      'Bangalore, Karnataka': [77.5946, 12.9716],
      'Chennai, Tamil Nadu': [80.2707, 13.0827],
      'Kolkata, West Bengal': [88.3639, 22.5726]
    }
    return coordinates[city] || [72.8777, 19.0760]
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Interactive Map - {selectedCity}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Data Layers</h3>
            <div className="space-y-2">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    layer.visible 
                      ? 'border-nasa-500 bg-nasa-50 text-nasa-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium">{layer.name}</p>
                    <p className="text-xs text-gray-500">{layer.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="map-container">
              <MapComponent 
                center={getCityCoordinates(selectedCity)}
                selectedLayer={selectedLayer}
                layers={layers}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          NASA Data Sources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">GIBS (Global Imagery Browse Services)</h4>
            <p className="text-sm text-gray-600 mt-1">Real-time satellite imagery and data layers</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900">Landsat 8/9</h4>
            <p className="text-sm text-gray-600 mt-1">Land Surface Temperature and land cover data</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveMap
