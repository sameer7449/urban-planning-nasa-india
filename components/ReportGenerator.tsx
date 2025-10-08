'use client'

import React, { useState, useEffect } from 'react'
import {
  DocumentArrowDownIcon,
  PrinterIcon,
  ShareIcon,
  CalendarIcon,
  MapPinIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

interface ReportData {
  title: string
  generatedAt: Date
  location: string
  summary: {
    totalSurveys: number
    averageScore: number
    keyFindings: string[]
    recommendations: string[]
  }
  categoryAnalysis: {
    category: string
    score: number
    trend: string
    insights: string[]
    priority: string
  }[]
  charts: {
    type: string
    data: any[]
    title: string
  }[]
}

export default function ReportGenerator() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('All Cities')
  const [reportFormat, setReportFormat] = useState('comprehensive')

  const locations = ['All Cities', 'Mumbai, Maharashtra', 'Delhi, NCT', 'Bangalore, Karnataka', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal']

  const generateReport = async () => {
    setIsGenerating(true)
    
    // Simulate report generation time
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const surveyData = getSurveyData()
    const analysis = analyzeSurveyData(surveyData)
    
    const report: ReportData = {
      title: `Urban Planning Analysis Report - ${selectedLocation}`,
      generatedAt: new Date(),
      location: selectedLocation,
      summary: {
        totalSurveys: surveyData.length,
        averageScore: analysis.averageScore,
        keyFindings: analysis.keyFindings,
        recommendations: analysis.recommendations
      },
      categoryAnalysis: analysis.categories,
      charts: generateChartData(surveyData)
    }
    
    setReportData(report)
    setIsGenerating(false)
  }

  const getSurveyData = () => {
    const savedData = localStorage.getItem('urban-planning-surveys')
    if (!savedData) return []
    
    const data = JSON.parse(savedData).map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }))
    
    if (selectedLocation === 'All Cities') {
      return data
    }
    
    return data.filter((item: any) => item.location === selectedLocation)
  }

  const analyzeSurveyData = (data: any[]) => {
    const categories = ['heat', 'green-space', 'air-quality', 'infrastructure']
    const categoryAnalysis = categories.map(category => {
      const categoryData = data.filter(survey => 
        Object.keys(survey.responses).some(key => key.startsWith(category))
      )
      
      let totalScore = 0
      let responseCount = 0
      
      categoryData.forEach(survey => {
        Object.entries(survey.responses).forEach(([key, value]) => {
          if (key.startsWith(category) && typeof value === 'number') {
            totalScore += value
            responseCount++
          }
        })
      })
      
      const averageScore = responseCount > 0 ? totalScore / responseCount : 0
      const trend = averageScore >= 4 ? 'improving' : averageScore <= 2 ? 'declining' : 'stable'
      const priority = averageScore <= 2 ? 'high' : averageScore <= 3 ? 'medium' : 'low'
      
      return {
        category,
        score: Math.round(averageScore * 10) / 10,
        trend,
        insights: generateCategoryInsights(category, averageScore, categoryData.length),
        priority
      }
    })
    
    const averageScore = categoryAnalysis.reduce((sum, cat) => sum + cat.score, 0) / categoryAnalysis.length
    
    return {
      averageScore: Math.round(averageScore * 10) / 10,
      keyFindings: generateKeyFindings(categoryAnalysis),
      recommendations: generateRecommendations(categoryAnalysis),
      categories: categoryAnalysis
    }
  }

  const generateCategoryInsights = (category: string, score: number, count: number): string[] => {
    const insights: string[] = []
    
    if (count < 3) {
      insights.push(`Limited data available (${count} responses)`)
    }
    
    switch (category) {
      case 'heat':
        if (score <= 2) insights.push('Severe heat stress reported by residents')
        else if (score >= 4) insights.push('Heat management strategies are effective')
        else insights.push('Moderate heat concerns identified')
        break
      case 'green-space':
        if (score <= 2) insights.push('Insufficient green space coverage')
        else if (score >= 4) insights.push('Adequate green space availability')
        else insights.push('Green space needs improvement')
        break
      case 'air-quality':
        if (score <= 2) insights.push('Poor air quality affecting health')
        else if (score >= 4) insights.push('Air quality standards met')
        else insights.push('Air quality requires attention')
        break
      case 'infrastructure':
        if (score <= 2) insights.push('Infrastructure needs major upgrades')
        else if (score >= 4) insights.push('Infrastructure is well-maintained')
        else insights.push('Infrastructure improvements needed')
        break
    }
    
    return insights
  }

  const generateKeyFindings = (categories: any[]): string[] => {
    const findings: string[] = []
    const highPriority = categories.filter(c => c.priority === 'high')
    const declining = categories.filter(c => c.trend === 'declining')
    
    if (highPriority.length > 0) {
      findings.push(`${highPriority.length} categories require immediate attention`)
    }
    
    if (declining.length > 0) {
      findings.push(`${declining.length} categories showing declining trends`)
    }
    
    const avgScore = categories.reduce((sum, cat) => sum + cat.score, 0) / categories.length
    if (avgScore < 3) {
      findings.push('Overall urban planning satisfaction is below average')
    } else if (avgScore > 4) {
      findings.push('Urban planning initiatives are well-received')
    }
    
    return findings
  }

  const generateRecommendations = (categories: any[]): string[] => {
    const recommendations: string[] = []
    
    categories.forEach(cat => {
      if (cat.priority === 'high') {
        switch (cat.category) {
          case 'heat':
            recommendations.push('Implement comprehensive heat island mitigation strategy')
            break
          case 'green-space':
            recommendations.push('Launch major green space expansion program')
            break
          case 'air-quality':
            recommendations.push('Enact strict air quality improvement measures')
            break
          case 'infrastructure':
            recommendations.push('Prioritize infrastructure modernization projects')
            break
        }
      }
    })
    
    if (recommendations.length === 0) {
      recommendations.push('Continue current urban planning strategies')
      recommendations.push('Monitor trends and adjust policies as needed')
    }
    
    return recommendations
  }

  const generateChartData = (data: any[]) => {
    const timeLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    const categories = ['heat', 'green-space', 'air-quality', 'infrastructure']
    
    const trendData = timeLabels.map(week => {
      const dataPoint: any = { week }
      categories.forEach(category => {
        dataPoint[category] = Math.random() * 2 + 2.5
      })
      return dataPoint
    })
    
    const priorityData = categories.map(category => {
      const categoryData = data.filter(survey => 
        Object.keys(survey.responses).some(key => key.startsWith(category))
      )
      
      let totalScore = 0
      let responseCount = 0
      
      categoryData.forEach(survey => {
        Object.entries(survey.responses).forEach(([key, value]) => {
          if (key.startsWith(category) && typeof value === 'number') {
            totalScore += value
            responseCount++
          }
        })
      })
      
      return {
        category: category.replace('-', ' '),
        score: responseCount > 0 ? totalScore / responseCount : 0,
        responses: responseCount
      }
    })
    
    return [
      {
        type: 'line',
        data: trendData,
        title: 'Category Trends Over Time'
      },
      {
        type: 'bar',
        data: priorityData,
        title: 'Category Performance Scores'
      }
    ]
  }

  const downloadPDF = () => {
    // In a real implementation, this would generate a PDF
    const element = document.createElement('a')
    const file = new Blob([generateTextReport()], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `urban-planning-report-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const generateTextReport = () => {
    if (!reportData) return ''
    
    let report = `${reportData.title}\n`
    report += `Generated: ${reportData.generatedAt.toLocaleDateString()}\n`
    report += `Location: ${reportData.location}\n\n`
    
    report += `EXECUTIVE SUMMARY\n`
    report += `================\n`
    report += `Total Surveys: ${reportData.summary.totalSurveys}\n`
    report += `Average Score: ${reportData.summary.averageScore}/5\n\n`
    
    report += `Key Findings:\n`
    reportData.summary.keyFindings.forEach(finding => {
      report += `• ${finding}\n`
    })
    
    report += `\nRecommendations:\n`
    reportData.summary.recommendations.forEach(rec => {
      report += `• ${rec}\n`
    })
    
    report += `\nCATEGORY ANALYSIS\n`
    report += `=================\n`
    reportData.categoryAnalysis.forEach(category => {
      report += `\n${category.category.toUpperCase().replace('-', ' ')}\n`
      report += `Score: ${category.score}/5\n`
      report += `Trend: ${category.trend}\n`
      report += `Priority: ${category.priority}\n`
      report += `Insights:\n`
      category.insights.forEach(insight => {
        report += `  • ${insight}\n`
      })
    })
    
    return report
  }

  const printReport = () => {
    window.print()
  }

  const shareReport = () => {
    if (navigator.share) {
      navigator.share({
        title: reportData?.title,
        text: `Urban Planning Analysis Report for ${selectedLocation}`,
        url: window.location.href
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert('Report URL copied to clipboard!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <DocumentArrowDownIcon className="h-6 w-6 mr-2 text-nasa-600" />
          Report Generator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Format</label>
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-500"
            >
              <option value="comprehensive">Comprehensive</option>
              <option value="summary">Executive Summary</option>
              <option value="detailed">Detailed Analysis</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className="w-full px-4 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <ChartBarIcon className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        {reportData && (
          <div className="space-y-6">
            {/* Report Header */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{reportData.title}</h3>
                  <div className="flex items-center text-gray-600 mt-2">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span className="mr-4">{reportData.generatedAt.toLocaleDateString()}</span>
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{reportData.location}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadPDF}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm"
                  >
                    <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                    Download
                  </button>
                  <button
                    onClick={printReport}
                    className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center text-sm"
                  >
                    <PrinterIcon className="h-4 w-4 mr-1" />
                    Print
                  </button>
                  <button
                    onClick={shareReport}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center text-sm"
                  >
                    <ShareIcon className="h-4 w-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-nasa-600" />
                Executive Summary
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-nasa-600">{reportData.summary.totalSurveys}</p>
                  <p className="text-gray-600">Total Surveys</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-nasa-600">{reportData.summary.averageScore}/5</p>
                  <p className="text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-nasa-600">
                    {reportData.categoryAnalysis.filter(c => c.priority === 'high').length}
                  </p>
                  <p className="text-gray-600">High Priority Areas</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <ExclamationTriangleIcon className="h-4 w-4 mr-1 text-yellow-500" />
                    Key Findings
                  </h5>
                  <ul className="space-y-2">
                    {reportData.summary.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <LightBulbIcon className="h-4 w-4 mr-1 text-green-500" />
                    Recommendations
                  </h5>
                  <ul className="space-y-2">
                    {reportData.summary.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reportData.charts.map((chart, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">{chart.title}</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    {chart.type === 'line' ? (
                      <LineChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="heat" stroke="#ef4444" strokeWidth={2} name="Heat" />
                        <Line type="monotone" dataKey="green-space" stroke="#22c55e" strokeWidth={2} name="Green Space" />
                        <Line type="monotone" dataKey="air-quality" stroke="#3b82f6" strokeWidth={2} name="Air Quality" />
                        <Line type="monotone" dataKey="infrastructure" stroke="#8b5cf6" strokeWidth={2} name="Infrastructure" />
                      </LineChart>
                    ) : (
                      <BarChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#1d4ed8" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              ))}
            </div>

            {/* Category Analysis */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Detailed Category Analysis</h4>
              {reportData.categoryAnalysis.map((category, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold text-gray-900 capitalize">
                      {category.category.replace('-', ' ')}
                    </h5>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-nasa-600">{category.score}/5</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.priority === 'high' ? 'bg-red-100 text-red-800' :
                        category.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {category.priority} priority
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-nasa-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(category.score / 5) * 100}%` }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-gray-900 mb-2">Insights</h6>
                      <ul className="space-y-1">
                        {category.insights.map((insight, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
