# Quantum Research - ERP Management System

![Quantum Research](https://img.shields.io/badge/Quantum-Research-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.3-646cff?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)

A comprehensive **Enterprise Resource Planning (ERP)** system built with React, featuring complete Purchase Order and Sales Order management with professional Quantum Research branding and advanced validation.

## 🎯 Overview

This is a **demonstration UI layer** for a complete ERP system featuring:

- **Purchase Order Management** - Track and manage purchase orders from vendors
- **Sales Order Management** - Handle customer sales orders and invoices
- **Contract Management** - Manage business contracts and agreements
- **Account Management** - Maintain customer and vendor account information
- **User Authentication** - Secure login system with role-based access
- **Dashboard** - Comprehensive overview with statistics and analytics

## Features

### Complete ERP Modules

1. **Dashboard**
   - Real-time statistics and KPIs
   - Recent activity tracking
   - Financial overview
   - Alert notifications

2. **Purchase Orders**
   - Create, view, and track purchase orders
   - Filter by status (Pending, Processing, In Transit, Delivered)
   - Search functionality
   - Detailed PO view with line items
   - Export capabilities

3. **Sales Orders**
   - Manage sales orders and customer transactions
   - Payment status tracking
   - Sales representative assignment
   - Invoice generation

4. **Contract Management**
   - Track active, pending, and expired contracts
   - Contract value and renewal management
   - Multiple contract types (License, Maintenance, Service, etc.)
   - Auto-renewal tracking

5. **Account Management**
   - Customer and vendor account profiles
   - Credit limit and balance tracking
   - Contact information management
   - Account activity history

### UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Professional Interface** - Modern, clean design with gradients
- **Logo Placeholders** - Ready for your company branding
- **User Profile Menu** - Top-right corner with logged-in user details
- **Intuitive Navigation** - Collapsible sidebar with icons
- **Rich Dummy Data** - Extensive dataset for realistic demonstrations

## Technology Stack

- **React 18.3** - Modern React with hooks
- **React Router 6** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library
- **CSS3** - Custom styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't, manually navigate to the URL shown in the terminal

### Demo Accounts

Use these credentials to login and explore different user roles:

| Name | Email | Password | Role |
|------|-------|----------|------|
| John Anderson | admin@erpdemo.com | admin123 | System Administrator |
| Sarah Johnson | manager@erpdemo.com | manager123 | Operations Manager |
| Mike Williams | user@erpdemo.com | user123 | Sales Executive |

**Tip:** Click on any demo account card on the login screen to auto-fill credentials!

## Project Structure

```
po-demo-client/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   └── Layout/
│   │       ├── Layout.jsx
│   │       └── Layout.css
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── PurchaseOrders.jsx
│   │   ├── SalesOrders.jsx
│   │   ├── Contracts.jsx
│   │   └── Accounts.jsx
│   ├── data/
│   │   └── dummyData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Dummy Data

The application includes extensive dummy data for demonstration purposes:

- **10 Purchase Orders** - Various statuses, vendors, and values
- **10 Sales Orders** - Different customers and payment statuses
- **12 Contracts** - Multiple types and contract values
- **12 Accounts** - Mix of customers, vendors, and combined accounts
- **10+ Companies** - International vendors and customers
- **3 User Profiles** - Different roles and departments

All data is stored in `src/data/dummyData.js` and can be easily customized.

## Customization Guide

### Adding Your Logo

Replace the logo placeholders in:

1. **Sidebar Logo** - `src/components/Layout/Layout.jsx` (line ~17)
   ```jsx
   <div className="logo-placeholder">YOUR LOGO HERE</div>
   ```

2. **Header Company Logo** - `src/components/Layout/Layout.jsx` (line ~60)
   ```jsx
   <div className="company-logo-placeholder">COMPANY LOGO</div>
   ```

3. **Login Screen Logo** - `src/components/Auth/Login.jsx` (line ~35)
   ```jsx
   <div className="login-logo-placeholder">YOUR BRAND</div>
   ```

### Customizing Colors

Main colors are defined in `src/index.css` and component CSS files:

- **Primary Blue:** `#2563eb`
- **Success Green:** `#16a34a`
- **Warning Orange:** `#d97706`
- **Danger Red:** `#dc2626`
- **Gradient Purple:** `#667eea` to `#764ba2`

### Modifying Data

Edit `src/data/dummyData.js` to customize:
- Company names and details
- Order amounts and statuses
- Contract values and terms
- Account information

## Building for Production

Create an optimized production build:

```bash
npm run build
```

The build files will be in the `dist/` directory, ready for deployment.

Preview the production build:

```bash
npm run preview
```

## Deployment

This is a static React application that can be deployed to:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop the `dist` folder
- **GitHub Pages** - Use gh-pages package
- **Any static hosting** - Upload the `dist` folder

## Features Roadmap

This is currently the **UI Layer** demonstration. Future integrations:

- [ ] API Layer integration
- [ ] Database layer connection
- [ ] Real-time data updates
- [ ] Advanced reporting and analytics
- [ ] Document management
- [ ] Notification system
- [ ] Multi-language support
- [ ] Dark mode theme

## Client Demo Tips

1. **Start with Login** - Show the professional login screen and demo accounts
2. **Dashboard Overview** - Highlight the comprehensive statistics
3. **Navigate Modules** - Walk through each management module
4. **Detail Views** - Click "View" buttons to show detailed modals
5. **Search & Filter** - Demonstrate the filtering capabilities
6. **Responsive Design** - Resize browser to show mobile responsiveness
7. **User Profile** - Click top-right profile to show user menu

## Support

For questions or customization requests, please contact your development team.

## License

This is a proprietary demonstration application. All rights reserved.

---

**Built with React & Vite** | **Ready for Client Presentation** | **UI Layer Demo v1.0**
