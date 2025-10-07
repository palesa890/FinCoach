import React from 'react'

export function Card({ className = '', children }) {
  return <div className={`rounded-xl border bg-white ${className}`}>{children}</div>
}

export function CardHeader({ className = '', children }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>
}

export function CardContent({ className = '', children }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

export function CardTitle({ className = '', children }) {
  return <div className={`text-base font-semibold ${className}`}>{children}</div>
}
