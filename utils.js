export function createPageUrl(name) {
  const map = {
    Dashboard: '/dashboard',
    Courses: '/courses',
    Budget: '/budget',
    Debts: '/debts',
    Stokvels: '/stokvels',
    Challenges: '/challenges'
  }
  return map[name] || '/'
}

