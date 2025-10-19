import './QuantumLogo.css'

const QuantumLogo = ({ size = 'medium', variant = 'full' }) => {
  const sizeClasses = {
    small: 'logo-small',
    medium: 'logo-medium',
    large: 'logo-large',
    xlarge: 'logo-xlarge'
  }

  if (variant === 'icon') {
    return (
      <div className={`quantum-logo-icon ${sizeClasses[size]}`}>
        <div className="quantum-q">Q</div>
      </div>
    )
  }

  return (
    <div className={`quantum-logo ${sizeClasses[size]}`}>
      <div className="logo-icon">
        <div className="quantum-symbol">
          <div className="quantum-ring"></div>
          <div className="quantum-core">Q</div>
        </div>
      </div>
      <div className="logo-text">
        <span className="company-name">QUANTUM</span>
        <span className="company-tagline">Research</span>
      </div>
    </div>
  )
}

export default QuantumLogo
