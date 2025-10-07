import React from 'react'

export function Label({ className = '', htmlFor, children, ...rest }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-slate-700 ${className}`}
      {...rest}
    >
      {children}
    </label>
  )
}

