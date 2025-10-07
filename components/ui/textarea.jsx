import React from 'react'

export function Textarea({ className = '', rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full px-3 py-2 border border-slate-200 rounded-md text-sm ${className}`}
      {...props}
    />
  )
}

