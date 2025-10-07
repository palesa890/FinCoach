import React from 'react'

export function Progress({ value = 0, className = '' }) {
  const clamped = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-emerald-500"
        style={{ width: `${clamped}%`, height: '100%' }}
      />
    </div>
  )
}

