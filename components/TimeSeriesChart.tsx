import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface TimeSeriesChartProps {
  data: Array<{
    date: string
    temperature?: number
    aqi?: number
    ndvi?: number
    [key: string]: any
  }>
  title: string
  metrics: string[]
  colors: { [key: string]: string }
  className?: string
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  title,
  metrics,
  colors,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case 'temperature':
        return `${value}°C`
      case 'aqi':
        return value.toString()
      case 'ndvi':
        return value.toFixed(2)
      default:
        return value.toString()
    }
  }

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'temperature':
        return 'Temperature (°C)'
      case 'aqi':
        return 'AQI'
      case 'ndvi':
        return 'NDVI'
      default:
        return metric
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#666"
              fontSize={12}
            />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip 
              formatter={(value: number, name: string) => [
                formatValue(value, name),
                getMetricLabel(name)
              ]}
              labelFormatter={(label) => `Date: ${formatDate(label)}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            {metrics.map((metric) => (
              <Line
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={colors[metric]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TimeSeriesChart
