import React from 'react'

export function Badge({ className = '', variant = 'default', children, ...rest }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}

