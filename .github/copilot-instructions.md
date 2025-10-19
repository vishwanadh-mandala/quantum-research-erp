## Quick context

This is a **React-based Mini ERP Application** - UI Layer demonstration for client presentations.

**Project Type:** Frontend React application built with Vite
**Purpose:** Comprehensive ERP system demo showcasing Purchase Orders, Sales Orders, Contracts, and Account Management
**Tech Stack:** React 18.3, React Router 6, Vite, Lucide Icons

Key files:
- `package.json` — Build scripts and dependencies (Vite + React)
- `README.md` — Comprehensive project documentation and demo guide
- `src/main.jsx` — React application entry point
- `src/App.jsx` — Main app component with routing
- `vite.config.js` — Vite build configuration

## Available Commands

```bash
npm install         # Install dependencies
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Create production build
npm run preview    # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── Auth/Login.jsx           # Login page with demo accounts
│   └── Layout/Layout.jsx        # Main layout with sidebar & header
├── pages/
│   ├── Dashboard.jsx            # Main dashboard with statistics
│   ├── PurchaseOrders.jsx       # Purchase Order management
│   ├── SalesOrders.jsx          # Sales Order management
│   ├── Contracts.jsx            # Contract management
│   └── Accounts.jsx             # Account management
├── data/
│   └── dummyData.js             # All dummy data for demo
├── App.jsx                      # Main routing component
├── main.jsx                     # React entry point
└── index.css                    # Global styles
```

## Application Architecture

**Authentication Flow:**
- Login screen with 3 demo accounts (Admin, Manager, User)
- State managed in `App.jsx` with `isAuthenticated` and `currentUser`
- Click demo account cards to auto-fill credentials

**Routing:**
- React Router 6 handles navigation
- Protected routes require authentication
- Sidebar navigation with icons

**Data Layer:**
- **Current:** Static dummy data in `src/data/dummyData.js`
- **Future:** Will integrate with API layer (not implemented yet)
- All data is imported directly into page components

**Key Modules:**
1. **Purchase Orders** - 10 sample POs with various statuses
2. **Sales Orders** - 10 sample SOs with payment tracking
3. **Contracts** - 12 sample contracts with different types
4. **Accounts** - 12 customer/vendor accounts

## Customization Points

**Logo Placeholders:**
- Sidebar: `Layout.jsx` line ~17
- Header: `Layout.jsx` line ~60
- Login: `Login.jsx` line ~35

**Color Scheme:**
- Primary: `#2563eb` (blue)
- Success: `#16a34a` (green)
- Warning: `#d97706` (orange)
- Gradient: `#667eea` to `#764ba2`

**Dummy Data:**
- Edit `src/data/dummyData.js` to modify sample data
- Includes companies, POs, SOs, contracts, accounts

## Development Guidelines

**Code Style:**
- Use functional React components with hooks
- Consistent naming: PascalCase for components, camelCase for functions/variables
- Import React icons from `lucide-react`
- Keep component files with their corresponding CSS files

**State Management:**
- Currently using React `useState` for local state
- No external state management library (Redux, Zustand, etc.)
- Authentication state in App.jsx

**Adding New Features:**
- Add dummy data to `src/data/dummyData.js` first
- Create page component in `src/pages/`
- Add route in `App.jsx`
- Add navigation item in `Layout.jsx`

## Demo Account Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@erpdemo.com | admin123 | System Administrator |
| manager@erpdemo.com | manager123 | Operations Manager |
| user@erpdemo.com | user123 | Sales Executive |

## Important Notes

- **No API Integration:** This is UI-only. No backend calls are made.
- **No Environment Variables:** All configuration is hardcoded for demo purposes.
- **No Tests:** This is a demo project without test coverage.
- **No Git History:** Fresh project for client demonstration.

## Future Integration Points

When connecting to API and DB layers:
- Replace dummy data imports with API calls
- Add `src/api/` directory for API client functions
- Add environment variables for API endpoints
- Implement proper error handling and loading states

---

**Updated:** Project setup complete with full ERP demo application.
