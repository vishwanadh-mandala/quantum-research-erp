import './PageBanner.css'
import QuantumLogo from './QuantumLogo'

const PageBanner = ({ title, subtitle, variant = 'default', children }) => {
  const variants = {
    default: 'banner-default',
    gradient: 'banner-gradient',
    primary: 'banner-primary',
    success: 'banner-success',
    info: 'banner-info'
  }

  return (
    <div className={`page-banner ${variants[variant]}`}>
      <div className="banner-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>

      <div className="banner-branding">
        <QuantumLogo size="large" />
      </div>

      <div className="banner-content-wrapper">
        <div className="banner-text">
          <h1 className="banner-title">{title}</h1>
          {subtitle && <p className="banner-subtitle">{subtitle}</p>}
        </div>
        {children && <div className="banner-actions">{children}</div>}
      </div>

      <div className="banner-pattern"></div>
    </div>
  )
}

export default PageBanner
