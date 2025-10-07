import React, { createContext, useContext, useState } from 'react'

const TabsContext = createContext()

export function Tabs({ defaultValue, children, className = '' }) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export function TabsTrigger({ value, children, className = '' }) {
  const { value: active, setValue } = useContext(TabsContext)
  const activeClasses = active === value ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
  return (
    <button
      type="button"
      onClick={() => setValue(value)}
      className={`px-3 py-2 text-sm rounded-md border ${activeClasses} ${className}`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className = '' }) {
  const { value: active } = useContext(TabsContext)
  if (active !== value) return null
  return <div className={className}>{children}</div>
}

