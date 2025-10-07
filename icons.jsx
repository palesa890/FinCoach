import React from 'react'

function makeIcon(label) {
  return function Icon({ className = '' }) {
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{ display: 'inline-block' }}
        title={label}
      >
        {/* simple placeholder dot */}
        ●
      </span>
    )
  }
}

export const LayoutDashboard = makeIcon('Dashboard')
export const BookOpen = makeIcon('Courses')
export const Wallet = makeIcon('Budget')
export const Banknote = makeIcon('Debts')
export const Users = makeIcon('Stokvels')
export const Trophy = makeIcon('Challenges')
export const Menu = makeIcon('Menu')
export const TrendingUp = makeIcon('TrendingUp')
export const Shield = makeIcon('Shield')
export const Target = makeIcon('Target')

