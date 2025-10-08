import React, { useState } from 'react'
import { dataSources } from '@/lib/dataSources'
import { ChevronDownIcon, ChevronUpIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

const DataSourcesSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        aria-expanded={isExpanded}
        aria-controls="data-sources-content"
      >
        <h3 className="text-lg font-medium text-gray-900">Data Sources & Transparency</h3>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
        )}
      </button>
      
      {isExpanded && (
        <div id="data-sources-content" className="px-6 pb-6 border-t border-gray-200">
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-600">
              This dashboard integrates multiple NASA Earth observation datasets to provide comprehensive urban planning insights. 
              All data is processed and updated regularly to ensure accuracy and relevance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(dataSources).map(([key, source]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{source.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        <span className="font-medium">Dataset:</span> {source.dataset}
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Units:</span> {source.units}
                      </p>
                      {source.uncertainty && (
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Uncertainty:</span> {source.uncertainty}
                        </p>
                      )}
                    </div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-nasa-600 hover:text-nasa-700"
                      aria-label={`Visit ${source.name} website`}
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>
                        <span className="font-medium">Last Updated:</span> {formatTimestamp(source.lastUpdated)}
                      </p>
                      <p>
                        <span className="font-medium">Processing Time:</span> {formatTimestamp(source.processingTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-nasa-50 rounded-lg">
              <h4 className="font-medium text-nasa-900 mb-2">Data Processing Pipeline</h4>
              <p className="text-sm text-nasa-700">
                All NASA data undergoes rigorous quality control, calibration, and validation processes. 
                Local sensor data is integrated where available to enhance accuracy and provide real-time updates. 
                The processing pipeline ensures data consistency and reliability for urban planning applications.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataSourcesSection
