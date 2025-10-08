'use client'

import React, { useState, useEffect } from 'react'
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  UserGroupIcon,
  MapIcon,
  CloudIcon
} from '@heroicons/react/24/outline'

interface SurveyResponse {
  id: string
  timestamp: Date
  responses: { [key: string]: any }
  location: string
  userType: string
}

interface SurveyQuestion {
  id: string
  type: 'multiple-choice' | 'rating' | 'text' | 'location'
  question: string
  options?: string[]
  required: boolean
  category: 'heat' | 'green-space' | 'air-quality' | 'infrastructure' | 'community'
}

const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'heat-1',
    type: 'rating',
    question: 'How would you rate the temperature comfort in your area during peak summer?',
    required: true,
    category: 'heat'
  },
  {
    id: 'heat-2',
    type: 'multiple-choice',
    question: 'What cooling methods do you primarily use?',
    options: ['Air Conditioning', 'Fans', 'Natural ventilation', 'Cooling centers', 'Other'],
    required: true,
    category: 'heat'
  },
  {
    id: 'green-1',
    type: 'rating',
    question: 'How satisfied are you with the amount of green space in your neighborhood?',
    required: true,
    category: 'green-space'
  },
  {
    id: 'green-2',
    type: 'multiple-choice',
    question: 'What type of green spaces do you use most?',
    options: ['Parks', 'Street trees', 'Community gardens', 'Rooftop gardens', 'None available'],
    required: true,
    category: 'green-space'
  },
  {
    id: 'air-1',
    type: 'rating',
    question: 'How would you rate the air quality in your area?',
    required: true,
    category: 'air-quality'
  },
  {
    id: 'air-2',
    type: 'multiple-choice',
    question: 'What air quality issues do you notice most?',
    options: ['Vehicle emissions', 'Industrial pollution', 'Dust/construction', 'Burning waste', 'None'],
    required: true,
    category: 'air-quality'
  },
  {
    id: 'infra-1',
    type: 'rating',
    question: 'How would you rate the flood risk management in your area?',
    required: true,
    category: 'infrastructure'
  },
  {
    id: 'infra-2',
    type: 'multiple-choice',
    question: 'What infrastructure improvements are most needed?',
    options: ['Better drainage', 'Flood barriers', 'Water storage', 'Emergency systems', 'None needed'],
    required: true,
    category: 'infrastructure'
  },
  {
    id: 'community-1',
    type: 'text',
    question: 'What specific urban planning concerns do you have?',
    required: false,
    category: 'community'
  },
  {
    id: 'location',
    type: 'location',
    question: 'Select your area of residence',
    options: ['Mumbai, Maharashtra', 'Delhi, NCT', 'Bangalore, Karnataka', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal'],
    required: true,
    category: 'community'
  }
]

export default function SurveySystem() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<{ [key: string]: any }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([])
  const [showAnalysis, setShowAnalysis] = useState(false)

  useEffect(() => {
    // Load existing survey data from localStorage
    const savedData = localStorage.getItem('urban-planning-surveys')
    if (savedData) {
      setSurveyData(JSON.parse(savedData))
    }
  }, [])

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const submitSurvey = () => {
    const newResponse: SurveyResponse = {
      id: Date.now().toString(),
      timestamp: new Date(),
      responses,
      location: responses.location || 'Unknown',
      userType: 'Resident'
    }

    const updatedData = [...surveyData, newResponse]
    setSurveyData(updatedData)
    localStorage.setItem('urban-planning-surveys', JSON.stringify(updatedData))
    setIsSubmitted(true)
  }

  const resetSurvey = () => {
    setCurrentQuestion(0)
    setResponses({})
    setIsSubmitted(false)
    setShowAnalysis(false)
  }

  const getAnalysisData = () => {
    const totalResponses = surveyData.length
    const categoryScores: { [key: string]: number[] } = {
      heat: [],
      'green-space': [],
      'air-quality': [],
      infrastructure: []
    }

    surveyData.forEach(response => {
      Object.entries(response.responses).forEach(([questionId, value]) => {
        const question = surveyQuestions.find(q => q.id === questionId)
        if (question && typeof value === 'number' && question.category !== 'community') {
          categoryScores[question.category].push(value)
        }
      })
    })

    return {
      totalResponses,
      categoryAverages: Object.entries(categoryScores).map(([category, scores]) => ({
        category,
        average: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
        count: scores.length
      }))
    }
  }

  const currentQ = surveyQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Survey Submitted Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your valuable input. Your responses will help improve urban planning decisions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="flex items-center justify-center px-4 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 transition-colors"
            >
              <ChartBarIcon className="h-5 w-5 mr-2" />
              {showAnalysis ? 'Hide Analysis' : 'View Analysis'}
            </button>
            <button
              onClick={resetSurvey}
              className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
              Take Another Survey
            </button>
          </div>

          {showAnalysis && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Survey Analysis</h3>
              {(() => {
                const analysis = getAnalysisData()
                return (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-nasa-600">{analysis.totalResponses}</p>
                      <p className="text-gray-600">Total Responses</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {analysis.categoryAverages.map(({ category, average, count }) => (
                        <div key={category} className="text-center p-3 bg-white rounded-lg">
                          <p className="text-lg font-semibold">{average.toFixed(1)}/5</p>
                          <p className="text-sm text-gray-600 capitalize">{category.replace('-', ' ')}</p>
                          <p className="text-xs text-gray-500">{count} responses</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900">Urban Planning Survey</h2>
          <span className="text-sm text-gray-500">
            {currentQuestion + 1} of {surveyQuestions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-nasa-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQ.question}
        </h3>
        
        {currentQ.type === 'rating' && (
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleResponse(currentQ.id, rating)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-semibold transition-colors ${
                  responses[currentQ.id] === rating
                    ? 'bg-nasa-600 text-white border-nasa-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-nasa-300'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        )}

        {currentQ.type === 'multiple-choice' && (
          <div className="space-y-2">
            {currentQ.options?.map((option) => (
              <label key={option} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option}
                  checked={responses[currentQ.id] === option}
                  onChange={(e) => handleResponse(currentQ.id, e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {currentQ.type === 'text' && (
          <textarea
            value={responses[currentQ.id] || ''}
            onChange={(e) => handleResponse(currentQ.id, e.target.value)}
            placeholder="Enter your response..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nasa-500 focus:border-transparent"
            rows={4}
          />
        )}

        {currentQ.type === 'location' && (
          <div className="space-y-2">
            {currentQ.options?.map((option) => (
              <label key={option} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option}
                  checked={responses[currentQ.id] === option}
                  onChange={(e) => handleResponse(currentQ.id, e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentQuestion === surveyQuestions.length - 1 ? (
          <button
            onClick={submitSurvey}
            className="px-6 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 transition-colors"
          >
            Submit Survey
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-nasa-600 text-white rounded-lg hover:bg-nasa-700 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
