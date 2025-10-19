import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingCart,
  TrendingUp,
  FileText,
  Users,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import QuantumLogo from '../Branding/QuantumLogo'
import './Layout.css'

const Layout = ({ children, currentUser, onLogout }) => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/purchase-orders', icon: ShoppingCart, label: 'Purchase Orders' },
    { path: '/sales-orders', icon: TrendingUp, label: 'Sales Orders' },
    { path: '/contracts', icon: FileText, label: 'Contracts' },
    { path: '/accounts', icon: Users, label: 'Accounts' },
  ]

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          {isSidebarOpen ? (
            <QuantumLogo size="medium" />
          ) : (
            <QuantumLogo size="small" variant="icon" />
          )}
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <button
            className="menu-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="header-right">
            <QuantumLogo size="small" />
            <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="avatar">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="user-info">
                <span className="user-name">{currentUser?.name || 'User'}</span>
                <span className="user-role">{currentUser?.role || 'Admin'}</span>
              </div>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <p><strong>{currentUser?.name}</strong></p>
                    <p className="email">{currentUser?.email}</p>
                    <p className="role">{currentUser?.role}</p>
                  </div>
                  <hr />
                  <button className="logout-btn" onClick={onLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
