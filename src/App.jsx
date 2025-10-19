import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Auth/Login'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import PurchaseOrders from './pages/PurchaseOrders'
import CreatePO from './pages/CreatePO'
import EditPO from './pages/EditPO'
import SalesOrders from './pages/SalesOrders'
import CreateSO from './pages/CreateSO'
import EditSO from './pages/EditSO'
import Contracts from './pages/Contracts'
import Accounts from './pages/Accounts'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (user) => {
    setIsAuthenticated(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Router>
      <Layout currentUser={currentUser} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/purchase-orders" element={<PurchaseOrders />} />
          <Route path="/purchase-orders/create" element={<CreatePO />} />
          <Route path="/purchase-orders/edit/:id" element={<EditPO />} />
          <Route path="/sales-orders" element={<SalesOrders />} />
          <Route path="/sales-orders/create" element={<CreateSO />} />
          <Route path="/sales-orders/edit/:id" element={<EditSO />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
