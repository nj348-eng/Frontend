import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import TablePage from './pages/TablePage/TablePage'

/**
 * App: Defines application routes.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="table/:tableName" element={<TablePage />} />
      </Route>
    </Routes>
  )
}
