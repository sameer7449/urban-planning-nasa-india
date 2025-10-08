import React, { useState } from 'react'
import { 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface StakeholderEngagementProps {
  selectedCity: string
}

interface Stakeholder {
  id: string
  name: string
  role: string
  department: string
  contactInfo: string
  engagementLevel: 'high' | 'medium' | 'low'
  lastContact: string
  priority: 'high' | 'medium' | 'low'
}

interface CommunityReport {
  id: string
  type: 'heat_concern' | 'green_space' | 'air_quality' | 'infrastructure' | 'other'
  location: string
  description: string
  reporter: string
  status: 'new' | 'in_review' | 'addressed' | 'closed'
  date: string
  priority: 'high' | 'medium' | 'low'
}

const StakeholderEngagement: React.FC<StakeholderEngagementProps> = ({ selectedCity }) => {
  const [activeTab, setActiveTab] = useState('stakeholders')
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const stakeholders: Stakeholder[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Director of Urban Planning',
      department: 'Planning & Development',
      contactInfo: 'sarah.johnson@city.gov',
      engagementLevel: 'high',
      lastContact: '2 days ago',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Parks & Recreation Manager',
      department: 'Parks Department',
      contactInfo: 'm.chen@city.gov',
      engagementLevel: 'high',
      lastContact: '1 week ago',
      priority: 'high'
    },
    {
      id: '3',
      name: 'Dr. Lisa Rodriguez',
      role: 'Public Health Director',
      department: 'Health Department',
      contactInfo: 'l.rodriguez@city.gov',
      engagementLevel: 'medium',
      lastContact: '2 weeks ago',
      priority: 'medium'
    },
    {
      id: '4',
      name: 'James Wilson',
      role: 'Environmental Coordinator',
      department: 'Environmental Services',
      contactInfo: 'j.wilson@city.gov',
      engagementLevel: 'high',
      lastContact: '3 days ago',
      priority: 'high'
    },
    {
      id: '5',
      name: 'Maria Garcia',
      role: 'Community Outreach Coordinator',
      department: 'Community Services',
      contactInfo: 'm.garcia@city.gov',
      engagementLevel: 'medium',
      lastContact: '1 week ago',
      priority: 'medium'
    }
  ]

  const communityReports: CommunityReport[] = [
    {
      id: '1',
      type: 'heat_concern',
      location: 'Downtown District',
      description: 'Extreme heat near the convention center making it difficult for pedestrians',
      reporter: 'Anonymous Resident',
      status: 'new',
      date: '2 hours ago',
      priority: 'high'
    },
    {
      id: '2',
      type: 'green_space',
      location: 'Eastside Neighborhood',
      description: 'Request for additional trees and green space in residential area',
      reporter: 'Community Association',
      status: 'in_review',
      date: '1 day ago',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'air_quality',
      location: 'Industrial Zone',
      description: 'Concerns about air quality near manufacturing facilities',
      reporter: 'Environmental Group',
      status: 'addressed',
      date: '3 days ago',
      priority: 'high'
    },
    {
      id: '4',
      type: 'infrastructure',
      location: 'Riverside Area',
      description: 'Flood risk concerns with current drainage system',
      reporter: 'Property Owner',
      status: 'closed',
      date: '1 week ago',
      priority: 'high'
    }
  ]

  const upcomingMeetings = [
    {
      title: 'City Council Planning Committee',
      date: '2024-01-15',
      time: '2:00 PM',
      attendees: ['Sarah Johnson', 'Michael Chen', 'Dr. Lisa Rodriguez'],
      agenda: ['Urban Heat Island Mitigation', 'Green Infrastructure Planning']
    },
    {
      title: 'Community Stakeholder Workshop',
      date: '2024-01-18',
      time: '6:00 PM',
      attendees: ['Maria Garcia', 'Community Leaders', 'Residents'],
      agenda: ['Public Input Session', 'Priority Setting']
    },
    {
      title: 'Environmental Advisory Board',
      date: '2024-01-22',
      time: '10:00 AM',
      attendees: ['James Wilson', 'Environmental Groups', 'Scientists'],
      agenda: ['NASA Data Analysis', 'Climate Adaptation Strategies']
    }
  ]

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <ClockIcon className="h-4 w-4 text-blue-500" />
      case 'in_review': return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
      case 'addressed': return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case 'closed': return <CheckCircleIcon className="h-4 w-4 text-gray-500" />
      default: return <ClockIcon className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'heat_concern': return '🌡️'
      case 'green_space': return '🌳'
      case 'air_quality': return '💨'
      case 'infrastructure': return '🏗️'
      default: return '📝'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Stakeholder Engagement - {selectedCity}
        </h2>
        <p className="text-gray-600">
          Coordinate with city leaders, departments, and community members for data-driven urban planning
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'stakeholders', label: 'City Leaders', icon: UserGroupIcon },
              { id: 'reports', label: 'Community Reports', icon: DocumentTextIcon },
              { id: 'meetings', label: 'Upcoming Meetings', icon: CalendarDaysIcon },
              { id: 'engagement', label: 'Engagement Metrics', icon: ChatBubbleLeftRightIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-nasa-500 text-nasa-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'stakeholders' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Key Stakeholders</h3>
                <button className="bg-nasa-600 text-white px-4 py-2 rounded-lg hover:bg-nasa-700 transition-colors">
                  Add Stakeholder
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stakeholders.map((stakeholder) => (
                  <div key={stakeholder.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{stakeholder.name}</h4>
                        <p className="text-sm text-gray-600">{stakeholder.role}</p>
                        <p className="text-xs text-gray-500">{stakeholder.department}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${getEngagementColor(stakeholder.engagementLevel)}`}>
                          {stakeholder.engagementLevel} engagement
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(stakeholder.priority)}`}>
                          {stakeholder.priority} priority
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      Contact: {stakeholder.contactInfo}
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      Last contact: {stakeholder.lastContact}
                    </div>
                    <button className="w-full text-sm bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors">
                      Schedule Meeting
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Community Reports</h3>
                <div className="flex space-x-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    New Report
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Export
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {communityReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg">{getTypeIcon(report.type)}</span>
                          <h4 className="font-medium text-gray-900 capitalize">
                            {report.type.replace('_', ' ')} Report
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(report.priority)}`}>
                            {report.priority} priority
                          </span>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(report.status)}
                            <span className="text-xs text-gray-500 capitalize">{report.status.replace('_', ' ')}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          <MapPinIcon className="h-4 w-4 inline mr-1" />
                          {report.location}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">{report.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Reported by: {report.reporter}</span>
                          <span>{report.date}</span>
                        </div>
                      </div>
                      <button className="ml-4 text-nasa-600 hover:text-nasa-700 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'meetings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Meetings</h3>
                <button className="bg-nasa-600 text-white px-4 py-2 rounded-lg hover:bg-nasa-700 transition-colors">
                  Schedule Meeting
                </button>
              </div>

              <div className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                        <p className="text-sm text-gray-600">
                          <CalendarDaysIcon className="h-4 w-4 inline mr-1" />
                          {meeting.date} at {meeting.time}
                        </p>
                      </div>
                      <button className="text-nasa-600 hover:text-nasa-700 text-sm font-medium">
                        Join Meeting
                      </button>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Attendees:</h5>
                      <p className="text-sm text-gray-600">{meeting.attendees.join(', ')}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Agenda:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {meeting.agenda.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-nasa-500 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'engagement' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Engagement Metrics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Community Participation</h4>
                  <p className="text-2xl font-bold text-blue-600">89%</p>
                  <p className="text-sm text-blue-700">Resident engagement in planning</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Stakeholder Response</h4>
                  <p className="text-2xl font-bold text-green-600">94%</p>
                  <p className="text-sm text-green-700">City department participation</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-medium text-purple-900 mb-2">Report Resolution</h4>
                  <p className="text-2xl font-bold text-purple-600">76%</p>
                  <p className="text-sm text-purple-700">Community reports addressed</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Engagement Strategies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">City Leadership</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Monthly planning committee meetings</li>
                      <li>• Quarterly city council briefings</li>
                      <li>• Department head coordination</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Community Outreach</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Public workshops and forums</li>
                      <li>• Online feedback platforms</li>
                      <li>• Neighborhood association partnerships</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StakeholderEngagement
