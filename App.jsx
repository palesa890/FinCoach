import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'

// Page components (simple placeholders)
import Dashboard from './Pages/Dashboard.jsx'
import Courses from './Pages/Courses.jsx'
import Budget from './Pages/Budget.jsx'
import Debts from './Pages/Debts.jsx'
import Stokvels from './Pages/Stokvels.jsx'
import Challenges from './Pages/Challenges.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/debts" element={<Debts />} />
        <Route path="/stokvels" element={<Stokvels />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Routes>
    </Layout>
  )
}
