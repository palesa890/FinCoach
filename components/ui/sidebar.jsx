import React from 'react'

function cn(...parts) { return parts.filter(Boolean).join(' ') }

export function SidebarProvider({ children }) {
  return <>{children}</>
}

export function Sidebar({ className = '', children }) {
  return <aside className={cn('w-72 hidden md:block', className)}>{children}</aside>
}

export function SidebarHeader({ className = '', children }) {
  return <div className={cn('p-4', className)}>{children}</div>
}

export function SidebarContent({ className = '', children }) {
  return <div className={cn('p-2', className)}>{children}</div>
}

export function SidebarGroup({ className = '', children }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function SidebarGroupLabel({ className = '', children }) {
  return <div className={cn('text-xs uppercase text-slate-500', className)}>{children}</div>
}

export function SidebarGroupContent({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarMenu({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarMenuItem({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export function SidebarMenuButton({ className = '', asChild, children, ...rest }) {
  // Ignore asChild for simplicity; just wrap children
  return (
    <div className={cn('cursor-pointer', className)} {...rest}>
      {children}
    </div>
  )
}

export function SidebarFooter({ className = '', children }) {
  return <div className={cn('p-2', className)}>{children}</div>
}

export function SidebarTrigger({ className = '', children, ...rest }) {
  return (
    <button type="button" className={cn('inline-flex items-center', className)} {...rest}>
      {children}
    </button>
  )
}

