import React from 'react'

export function Button({ className = '', variant = 'default', size = 'md', children, ...rest }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

