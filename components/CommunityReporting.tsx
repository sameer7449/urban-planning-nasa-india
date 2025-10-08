import React, { useState } from 'react'
import { 
  MapPinIcon, 
  ExclamationTriangleIcon, 
  CloudIcon, 
  SunIcon,
  SparklesIcon,
  PhotoIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

interface ReportFormData {
  issueType: string
  location: string
  description: string
  severity: string
  contactEmail: string
  photos: FileList | null
}

const CommunityReporting: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState<ReportFormData>({
    issueType: '',
    location: '',
    description: '',
    severity: 'medium',
    contactEmail: '',
    photos: null
  })

  const issueTypes = [
    { id: 'heat', label: 'Heat Island Effect', icon: SunIcon, description: 'Excessive heat in urban areas' },
    { id: 'air', label: 'Air Quality Issues', icon: CloudIcon, description: 'Poor air quality or pollution' },
    { id: 'greenspace', label: 'Lack of Green Space', icon: SparklesIcon, description: 'Need for more vegetation' },
    { id: 'flooding', label: 'Flooding Risk', icon: ExclamationTriangleIcon, description: 'Water management issues' },
    { id: 'other', label: 'Other Urban Issue', icon: MapPinIcon, description: 'Other planning concerns' }
  ]

  const severityLevels = [
    { id: 'low', label: 'Low', description: 'Minor issue, can wait' },
    { id: 'medium', label: 'Medium', description: 'Moderate concern' },
    { id: 'high', label: 'High', description: 'Urgent attention needed' },
    { id: 'critical', label: 'Critical', description: 'Immediate action required' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Report submitted:', formData)
    alert('Thank you for your report! We will review it and take appropriate action.')
    setIsFormOpen(false)
    setFormData({
      issueType: '',
      location: '',
      description: '',
      severity: 'medium',
      contactEmail: '',
      photos: null
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, photos: e.target.files }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Community Reporting</h2>
            <p className="text-green-100">
              Help improve your city by reporting urban planning issues and participating in citizen science
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
          >
            Report Local Issue
          </button>
        </div>
      </div>

      {/* GLOBE Observer Integration */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <GlobeAltIcon className="h-8 w-8 text-nasa-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">GLOBE Observer Integration</h3>
            <p className="text-gray-600 mb-4">
              Contribute to NASA's citizen science program by collecting environmental data in your neighborhood. 
              Your observations help scientists understand urban environments better.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://observer.globe.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 transition-colors"
              >
                <GlobeAltIcon className="h-4 w-4 mr-2" />
                Download GLOBE Observer App
              </a>
              <a
                href="https://observer.globe.gov/observe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-nasa-600 text-nasa-600 rounded-lg hover:bg-nasa-50 transition-colors"
              >
                Learn How to Observe
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Report Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Report Local Issue</h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close form"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Issue Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of issue are you reporting?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {issueTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <label
                          key={type.id}
                          className={`relative flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                            formData.issueType === type.id ? 'border-nasa-500 bg-nasa-50' : 'border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="issueType"
                            value={type.id}
                            checked={formData.issueType === type.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <Icon className="h-5 w-5 text-nasa-600 mt-0.5 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{type.label}</p>
                            <p className="text-sm text-gray-500">{type.description}</p>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location (Address or Landmark)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nasa-500 focus:border-nasa-500"
                    placeholder="e.g., Near Phoenix MarketCity, Kurla"
                  />
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How urgent is this issue?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {severityLevels.map((level) => (
                      <label
                        key={level.id}
                        className={`relative flex flex-col p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                          formData.severity === level.id ? 'border-nasa-500 bg-nasa-50' : 'border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="severity"
                          value={level.id}
                          checked={formData.severity === level.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <p className="font-medium text-gray-900">{level.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{level.description}</p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nasa-500 focus:border-nasa-500"
                    placeholder="Please provide details about the issue..."
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nasa-500 focus:border-nasa-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Photos */}
                <div>
                  <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-2">
                    Photos (Optional)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="photos"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <PhotoIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload photos or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 10MB each</p>
                    </label>
                    <input
                      id="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 transition-colors"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommunityReporting
