# Quick Start Guide - ERP Demo Client

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Login and Explore
- Open your browser at `http://localhost:3000`
- Click any demo account to auto-fill credentials
- Or use: **admin@erpdemo.com** / **admin123**

## What to Show Your Client

### 1. Professional Login Screen
- 3 different user roles with profile cards
- Click any card to auto-fill credentials instantly
- Modern gradient design with logo placeholder

### 2. Comprehensive Dashboard
- Real-time statistics and KPIs
- Purchase Orders, Sales Orders, Contracts, Accounts overview
- Financial summaries with total values
- Recent activity feed
- Alert notifications

### 3. Purchase Order Management
- View 10 sample purchase orders
- Filter by status: Pending, Processing, In Transit, Delivered
- Search by PO ID or vendor name
- Click "View" to see detailed modal with line items
- Export functionality (UI ready)

### 4. Sales Order Management
- 10 sample sales orders with different statuses
- Payment status tracking (Paid, Partial, Pending)
- Customer information and sales rep assignment
- Detailed order view with invoicing capability

### 5. Contract Management
- 12 contracts with various types (License, Service, Maintenance, etc.)
- Active/Pending/Expired status tracking
- Contract value and renewal date management
- Auto-renewal indicators
- Multi-filter options (Status + Type)

### 6. Account Management
- 12 customer and vendor accounts
- International companies across different industries
- Credit limit and current balance tracking
- Detailed company profiles with contact information
- Revenue and employee count statistics

### 7. User Profile & Navigation
- Top-right user profile menu
- Collapsible sidebar navigation
- Role-based user display
- Logout functionality
- Responsive design (works on mobile!)

## Demo Flow Suggestion

**5-Minute Demo:**
1. Login screen (0:30)
2. Dashboard overview (1:00)
3. Purchase Orders with detail view (1:00)
4. Sales Orders with detail view (1:00)
5. Contracts overview (0:45)
6. Accounts with profile view (0:45)

**Key Points to Highlight:**
- ✅ Professional, modern UI design
- ✅ Comprehensive data management
- ✅ Rich dummy data (50+ records)
- ✅ Search and filter capabilities
- ✅ Detailed views with modals
- ✅ Responsive design
- ✅ Role-based access (demo users)
- ✅ Ready for API integration

## Customization Before Demo

### Add Your Branding

**Replace Logo Placeholders:**

1. **Sidebar Logo** - [Layout.jsx:17](src/components/Layout/Layout.jsx#L17)
2. **Header Logo** - [Layout.jsx:60](src/components/Layout/Layout.jsx#L60)
3. **Login Logo** - [Login.jsx:35](src/components/Auth/Login.jsx#L35)

### Modify Demo Data

Edit [dummyData.js](src/data/dummyData.js) to customize:
- Company names
- Order values
- Contract terms
- Account details

### Adjust Colors

Main theme colors in [index.css](src/index.css):
- Primary: `#2563eb`
- Success: `#16a34a`
- Warning: `#d97706`

## Troubleshooting

**Port 3000 already in use?**
```bash
# Vite will automatically try port 3001, 3002, etc.
# Or specify a custom port in vite.config.js
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Application not loading?**
```bash
# Check Node.js version (requires 16+)
node --version

# Update if needed, then reinstall
npm install
```

## Building for Deployment

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Deploy the 'dist' folder to any static hosting
```

## Next Steps After Demo

1. **Client Approval** - Get feedback on UI/UX
2. **API Integration** - Connect to backend services
3. **Database Layer** - Implement real data persistence
4. **Additional Features** - Based on client requirements
5. **Testing** - Add unit and integration tests
6. **Deployment** - Production hosting setup

---

**Ready to impress your client!** 🚀
