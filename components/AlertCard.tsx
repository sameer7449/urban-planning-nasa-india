import React from 'react'
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

export type AlertSeverity = 'info' | 'warning' | 'critical' | 'success'

interface AlertCardProps {
  type: AlertSeverity
  title: string
  message: string
  action?: string
  location?: string
  timestamp: string
  className?: string
}

const AlertCard: React.FC<AlertCardProps> = ({
  type,
  title,
  message,
  action,
  location,
  timestamp,
  className = ''
}) => {
  const getAlertConfig = (alertType: AlertSeverity) => {
    switch (alertType) {
      case 'critical':
        return {
          icon: XCircleIcon,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          textColor: 'text-red-900',
          severity: 'Critical'
        }
      case 'warning':
        return {
          icon: ExclamationTriangleIcon,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-900',
          severity: 'Warning'
        }
      case 'success':
        return {
          icon: CheckCircleIcon,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          textColor: 'text-green-900',
          severity: 'Success'
        }
      case 'info':
      default:
        return {
          icon: InformationCircleIcon,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-900',
          severity: 'Info'
        }
    }
  }

  const config = getAlertConfig(type)
  const Icon = config.icon

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div 
      className={`flex items-start space-x-3 p-4 rounded-lg border ${config.bgColor} ${config.borderColor} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`h-5 w-5 mt-0.5 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`font-medium ${config.textColor}`}>{title}</p>
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.iconColor} ${config.bgColor}`}>
              {config.severity}
            </span>
            <span className="text-xs text-gray-500">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
        <p className={`text-sm ${config.textColor} mt-1`}>{message}</p>
        {location && (
          <p className="text-xs text-gray-600 mt-1">
            <span className="font-medium">Location:</span> {location}
          </p>
        )}
        {action && (
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-700">
              <span className="font-semibold">Recommended Action:</span> {action}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertCard
