import { useState } from 'react'
import { LogIn } from 'lucide-react'
import QuantumLogo from '../Branding/QuantumLogo'
import './Login.css'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Demo users
  const demoUsers = [
    { email: 'admin@quantumresearch.com', password: 'admin123', name: 'John Anderson', role: 'System Administrator' },
    { email: 'manager@quantumresearch.com', password: 'manager123', name: 'Sarah Johnson', role: 'Operations Manager' },
    { email: 'user@quantumresearch.com', password: 'user123', name: 'Mike Williams', role: 'Sales Executive' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = demoUsers.find(u => u.email === email && u.password === password)

    if (user) {
      onLogin(user)
    } else {
      alert('Invalid credentials. Try one of the demo accounts.')
    }
  }

  const handleDemoLogin = (user) => {
    setEmail(user.email)
    setPassword(user.password)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <QuantumLogo size="xlarge" />
          <h1>Welcome to Quantum Research</h1>
          <p>Enterprise Resource Planning System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            <LogIn size={18} />
            Sign In
          </button>
        </form>

        <div className="demo-accounts">
          <p className="demo-title">Demo Accounts (Click to auto-fill)</p>
          {demoUsers.map((user, index) => (
            <div
              key={index}
              className="demo-account-card"
              onClick={() => handleDemoLogin(user)}
            >
              <div className="demo-avatar">{user.name.charAt(0)}</div>
              <div className="demo-info">
                <strong>{user.name}</strong>
                <span className="demo-role">{user.role}</span>
                <span className="demo-email">{user.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="login-footer">
        <p>&copy; 2024 Quantum Research. All rights reserved.</p>
        <p className="demo-notice">Enterprise Resource Planning System - Demo Version</p>
      </div>
    </div>
  )
}

export default Login
