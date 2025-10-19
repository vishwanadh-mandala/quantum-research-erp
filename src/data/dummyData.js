// Comprehensive dummy data for ERP Demo

// Companies and Vendors
export const companies = [
  { id: 1, name: 'Acme Corporation', industry: 'Manufacturing', country: 'USA', city: 'New York' },
  { id: 2, name: 'Global Tech Solutions', industry: 'Technology', country: 'USA', city: 'San Francisco' },
  { id: 3, name: 'Premier Industries Ltd', industry: 'Automotive', country: 'Germany', city: 'Munich' },
  { id: 4, name: 'Sunrise Enterprises', industry: 'Retail', country: 'India', city: 'Mumbai' },
  { id: 5, name: 'Nordic Supply Co', industry: 'Logistics', country: 'Sweden', city: 'Stockholm' },
  { id: 6, name: 'Pacific Trading Group', industry: 'Import/Export', country: 'Singapore', city: 'Singapore' },
  { id: 7, name: 'Metro Construction LLC', industry: 'Construction', country: 'UAE', city: 'Dubai' },
  { id: 8, name: 'Digital Dynamics Inc', industry: 'Software', country: 'Canada', city: 'Toronto' },
  { id: 9, name: 'Euro Medical Systems', industry: 'Healthcare', country: 'France', city: 'Paris' },
  { id: 10, name: 'Green Energy Corp', industry: 'Energy', country: 'UK', city: 'London' },
]

// Purchase Orders
export const purchaseOrders = [
  {
    id: 'PO-2024-001',
    vendor: 'Acme Corporation',
    orderDate: '2024-01-15',
    expectedDelivery: '2024-02-15',
    status: 'Delivered',
    totalAmount: 45000.00,
    currency: 'USD',
    items: [
      { name: 'Industrial Machinery Parts', quantity: 50, unitPrice: 800, total: 40000 },
      { name: 'Safety Equipment', quantity: 100, unitPrice: 50, total: 5000 }
    ],
    paymentTerms: 'Net 30',
    shippingAddress: '123 Industrial Park, New York, NY 10001',
    createdBy: 'John Anderson'
  },
  {
    id: 'PO-2024-002',
    vendor: 'Global Tech Solutions',
    orderDate: '2024-01-20',
    expectedDelivery: '2024-02-20',
    status: 'In Transit',
    totalAmount: 125000.00,
    currency: 'USD',
    items: [
      { name: 'Enterprise Software Licenses', quantity: 500, unitPrice: 200, total: 100000 },
      { name: 'Cloud Storage (TB/Year)', quantity: 50, unitPrice: 500, total: 25000 }
    ],
    paymentTerms: 'Net 45',
    shippingAddress: 'Digital delivery',
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'PO-2024-003',
    vendor: 'Premier Industries Ltd',
    orderDate: '2024-02-01',
    expectedDelivery: '2024-03-01',
    status: 'Processing',
    totalAmount: 89500.00,
    currency: 'EUR',
    items: [
      { name: 'Automotive Components', quantity: 200, unitPrice: 425, total: 85000 },
      { name: 'Quality Testing Kit', quantity: 10, unitPrice: 450, total: 4500 }
    ],
    paymentTerms: 'Net 60',
    shippingAddress: '456 Manufacturing Ave, Munich, Germany',
    createdBy: 'Mike Williams'
  },
  {
    id: 'PO-2024-004',
    vendor: 'Sunrise Enterprises',
    orderDate: '2024-02-05',
    expectedDelivery: '2024-02-25',
    status: 'Pending',
    totalAmount: 32000.00,
    currency: 'USD',
    items: [
      { name: 'Office Furniture', quantity: 40, unitPrice: 750, total: 30000 },
      { name: 'Ergonomic Accessories', quantity: 100, unitPrice: 20, total: 2000 }
    ],
    paymentTerms: 'Net 30',
    shippingAddress: '789 Corporate Blvd, Mumbai, India',
    createdBy: 'John Anderson'
  },
  {
    id: 'PO-2024-005',
    vendor: 'Nordic Supply Co',
    orderDate: '2024-02-10',
    expectedDelivery: '2024-03-10',
    status: 'In Transit',
    totalAmount: 67800.00,
    currency: 'EUR',
    items: [
      { name: 'Logistics Software Suite', quantity: 1, unitPrice: 50000, total: 50000 },
      { name: 'RFID Tracking Devices', quantity: 200, unitPrice: 89, total: 17800 }
    ],
    paymentTerms: 'Net 45',
    shippingAddress: '321 Supply Chain Way, Stockholm, Sweden',
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'PO-2024-006',
    vendor: 'Pacific Trading Group',
    orderDate: '2024-02-12',
    expectedDelivery: '2024-03-15',
    status: 'Processing',
    totalAmount: 156000.00,
    currency: 'SGD',
    items: [
      { name: 'Electronic Components', quantity: 5000, unitPrice: 28, total: 140000 },
      { name: 'Packaging Materials', quantity: 1000, unitPrice: 16, total: 16000 }
    ],
    paymentTerms: 'Net 30',
    shippingAddress: '555 Trade Center, Singapore',
    createdBy: 'Mike Williams'
  },
  {
    id: 'PO-2024-007',
    vendor: 'Metro Construction LLC',
    orderDate: '2024-02-14',
    expectedDelivery: '2024-04-14',
    status: 'Pending',
    totalAmount: 234500.00,
    currency: 'AED',
    items: [
      { name: 'Construction Materials', quantity: 500, unitPrice: 450, total: 225000 },
      { name: 'Safety Gear', quantity: 200, unitPrice: 47.5, total: 9500 }
    ],
    paymentTerms: 'Net 60',
    shippingAddress: '777 Building Site, Dubai, UAE',
    createdBy: 'John Anderson'
  },
  {
    id: 'PO-2024-008',
    vendor: 'Digital Dynamics Inc',
    orderDate: '2024-02-16',
    expectedDelivery: '2024-03-01',
    status: 'Delivered',
    totalAmount: 98000.00,
    currency: 'CAD',
    items: [
      { name: 'Development Tools License', quantity: 100, unitPrice: 800, total: 80000 },
      { name: 'Technical Support (Annual)', quantity: 1, unitPrice: 18000, total: 18000 }
    ],
    paymentTerms: 'Net 30',
    shippingAddress: 'Digital delivery',
    createdBy: 'Sarah Johnson'
  },
  {
    id: 'PO-2024-009',
    vendor: 'Euro Medical Systems',
    orderDate: '2024-02-18',
    expectedDelivery: '2024-03-20',
    status: 'In Transit',
    totalAmount: 187500.00,
    currency: 'EUR',
    items: [
      { name: 'Medical Equipment', quantity: 25, unitPrice: 7000, total: 175000 },
      { name: 'Calibration Service', quantity: 1, unitPrice: 12500, total: 12500 }
    ],
    paymentTerms: 'Net 45',
    shippingAddress: '999 Healthcare Plaza, Paris, France',
    createdBy: 'Mike Williams'
  },
  {
    id: 'PO-2024-010',
    vendor: 'Green Energy Corp',
    orderDate: '2024-02-20',
    expectedDelivery: '2024-04-20',
    status: 'Processing',
    totalAmount: 445000.00,
    currency: 'GBP',
    items: [
      { name: 'Solar Panels', quantity: 500, unitPrice: 850, total: 425000 },
      { name: 'Installation Kit', quantity: 20, unitPrice: 1000, total: 20000 }
    ],
    paymentTerms: 'Net 60',
    shippingAddress: '111 Green Energy Park, London, UK',
    createdBy: 'John Anderson'
  }
]

// Sales Orders
export const salesOrders = [
  {
    id: 'SO-2024-001',
    customer: 'Global Tech Solutions',
    orderDate: '2024-01-10',
    deliveryDate: '2024-02-10',
    status: 'Fulfilled',
    totalAmount: 78500.00,
    currency: 'USD',
    items: [
      { name: 'Custom Software Development', quantity: 1, unitPrice: 65000, total: 65000 },
      { name: 'Training Sessions', quantity: 5, unitPrice: 2700, total: 13500 }
    ],
    paymentStatus: 'Paid',
    salesRep: 'Mike Williams',
    shippingAddress: '100 Tech Ave, San Francisco, CA'
  },
  {
    id: 'SO-2024-002',
    customer: 'Acme Corporation',
    orderDate: '2024-01-15',
    deliveryDate: '2024-02-28',
    status: 'In Progress',
    totalAmount: 125000.00,
    currency: 'USD',
    items: [
      { name: 'Manufacturing Equipment', quantity: 10, unitPrice: 12000, total: 120000 },
      { name: 'Maintenance Contract (1 Year)', quantity: 1, unitPrice: 5000, total: 5000 }
    ],
    paymentStatus: 'Partial',
    salesRep: 'Sarah Johnson',
    shippingAddress: '123 Industrial Park, New York, NY'
  },
  {
    id: 'SO-2024-003',
    customer: 'Sunrise Enterprises',
    orderDate: '2024-01-22',
    deliveryDate: '2024-03-15',
    status: 'Pending',
    totalAmount: 56000.00,
    currency: 'USD',
    items: [
      { name: 'Retail POS Systems', quantity: 20, unitPrice: 2500, total: 50000 },
      { name: 'Implementation Service', quantity: 1, unitPrice: 6000, total: 6000 }
    ],
    paymentStatus: 'Pending',
    salesRep: 'Mike Williams',
    shippingAddress: '789 Corporate Blvd, Mumbai, India'
  },
  {
    id: 'SO-2024-004',
    customer: 'Premier Industries Ltd',
    orderDate: '2024-02-01',
    deliveryDate: '2024-03-01',
    status: 'Shipped',
    totalAmount: 234000.00,
    currency: 'EUR',
    items: [
      { name: 'Quality Control Systems', quantity: 5, unitPrice: 45000, total: 225000 },
      { name: 'Calibration Equipment', quantity: 6, unitPrice: 1500, total: 9000 }
    ],
    paymentStatus: 'Paid',
    salesRep: 'John Anderson',
    shippingAddress: '456 Manufacturing Ave, Munich, Germany'
  },
  {
    id: 'SO-2024-005',
    customer: 'Nordic Supply Co',
    orderDate: '2024-02-05',
    deliveryDate: '2024-03-20',
    status: 'In Progress',
    totalAmount: 89500.00,
    currency: 'EUR',
    items: [
      { name: 'Warehouse Management System', quantity: 1, unitPrice: 75000, total: 75000 },
      { name: 'Barcode Scanners', quantity: 50, unitPrice: 290, total: 14500 }
    ],
    paymentStatus: 'Partial',
    salesRep: 'Sarah Johnson',
    shippingAddress: '321 Supply Chain Way, Stockholm, Sweden'
  },
  {
    id: 'SO-2024-006',
    customer: 'Pacific Trading Group',
    orderDate: '2024-02-08',
    deliveryDate: '2024-03-08',
    status: 'Fulfilled',
    totalAmount: 167000.00,
    currency: 'SGD',
    items: [
      { name: 'Trading Platform License', quantity: 1, unitPrice: 150000, total: 150000 },
      { name: 'Data Analytics Module', quantity: 1, unitPrice: 17000, total: 17000 }
    ],
    paymentStatus: 'Paid',
    salesRep: 'Mike Williams',
    shippingAddress: '555 Trade Center, Singapore'
  },
  {
    id: 'SO-2024-007',
    customer: 'Metro Construction LLC',
    orderDate: '2024-02-10',
    deliveryDate: '2024-04-10',
    status: 'Pending',
    totalAmount: 198000.00,
    currency: 'AED',
    items: [
      { name: 'Project Management Software', quantity: 1, unitPrice: 180000, total: 180000 },
      { name: 'Mobile App License', quantity: 100, unitPrice: 180, total: 18000 }
    ],
    paymentStatus: 'Pending',
    salesRep: 'John Anderson',
    shippingAddress: '777 Building Site, Dubai, UAE'
  },
  {
    id: 'SO-2024-008',
    customer: 'Digital Dynamics Inc',
    orderDate: '2024-02-12',
    deliveryDate: '2024-03-12',
    status: 'Shipped',
    totalAmount: 112000.00,
    currency: 'CAD',
    items: [
      { name: 'API Integration Services', quantity: 1, unitPrice: 95000, total: 95000 },
      { name: 'Documentation & Training', quantity: 1, unitPrice: 17000, total: 17000 }
    ],
    paymentStatus: 'Paid',
    salesRep: 'Sarah Johnson',
    shippingAddress: 'Digital delivery'
  },
  {
    id: 'SO-2024-009',
    customer: 'Euro Medical Systems',
    orderDate: '2024-02-14',
    deliveryDate: '2024-03-25',
    status: 'In Progress',
    totalAmount: 345000.00,
    currency: 'EUR',
    items: [
      { name: 'Healthcare Management System', quantity: 1, unitPrice: 320000, total: 320000 },
      { name: 'Compliance Module', quantity: 1, unitPrice: 25000, total: 25000 }
    ],
    paymentStatus: 'Partial',
    salesRep: 'Mike Williams',
    shippingAddress: '999 Healthcare Plaza, Paris, France'
  },
  {
    id: 'SO-2024-010',
    customer: 'Green Energy Corp',
    orderDate: '2024-02-16',
    deliveryDate: '2024-04-30',
    status: 'Pending',
    totalAmount: 567000.00,
    currency: 'GBP',
    items: [
      { name: 'Energy Monitoring System', quantity: 1, unitPrice: 500000, total: 500000 },
      { name: 'IoT Sensors', quantity: 200, unitPrice: 335, total: 67000 }
    ],
    paymentStatus: 'Pending',
    salesRep: 'John Anderson',
    shippingAddress: '111 Green Energy Park, London, UK'
  }
]

// Contracts
export const contracts = [
  {
    id: 'CTR-2024-001',
    contractName: 'Annual Software Maintenance - Acme Corp',
    client: 'Acme Corporation',
    contractType: 'Maintenance',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    value: 125000.00,
    currency: 'USD',
    status: 'Active',
    renewalDate: '2024-11-01',
    contractManager: 'Sarah Johnson',
    paymentSchedule: 'Quarterly',
    terms: 'Standard maintenance terms with 24/7 support',
    autoRenew: true
  },
  {
    id: 'CTR-2024-002',
    contractName: 'Enterprise License Agreement - Global Tech',
    client: 'Global Tech Solutions',
    contractType: 'License',
    startDate: '2024-02-01',
    endDate: '2027-01-31',
    value: 1500000.00,
    currency: 'USD',
    status: 'Active',
    renewalDate: '2026-11-01',
    contractManager: 'John Anderson',
    paymentSchedule: 'Annual',
    terms: 'Multi-year enterprise license with unlimited users',
    autoRenew: false
  },
  {
    id: 'CTR-2024-003',
    contractName: 'Supply Agreement - Premier Industries',
    client: 'Premier Industries Ltd',
    contractType: 'Supply',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    value: 850000.00,
    currency: 'EUR',
    status: 'Active',
    renewalDate: '2024-12-15',
    contractManager: 'Mike Williams',
    paymentSchedule: 'Monthly',
    terms: 'Exclusive supplier agreement for automotive components',
    autoRenew: true
  },
  {
    id: 'CTR-2024-004',
    contractName: 'Service Level Agreement - Nordic Supply',
    client: 'Nordic Supply Co',
    contractType: 'Service',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    value: 245000.00,
    currency: 'EUR',
    status: 'Pending',
    renewalDate: '2025-01-01',
    contractManager: 'Sarah Johnson',
    paymentSchedule: 'Quarterly',
    terms: '99.9% uptime guarantee with dedicated support',
    autoRenew: true
  },
  {
    id: 'CTR-2024-005',
    contractName: 'Partnership Agreement - Pacific Trading',
    client: 'Pacific Trading Group',
    contractType: 'Partnership',
    startDate: '2024-01-20',
    endDate: '2026-01-19',
    value: 2300000.00,
    currency: 'SGD',
    status: 'Active',
    renewalDate: '2025-10-20',
    contractManager: 'John Anderson',
    paymentSchedule: 'Bi-Annual',
    terms: 'Strategic partnership with revenue sharing model',
    autoRenew: false
  },
  {
    id: 'CTR-2024-006',
    contractName: 'Construction Services - Metro LLC',
    client: 'Metro Construction LLC',
    contractType: 'Service',
    startDate: '2024-02-15',
    endDate: '2024-12-31',
    value: 3450000.00,
    currency: 'AED',
    status: 'Active',
    renewalDate: '2024-11-15',
    contractManager: 'Mike Williams',
    paymentSchedule: 'Monthly',
    terms: 'Fixed-price contract with milestone payments',
    autoRenew: false
  },
  {
    id: 'CTR-2024-007',
    contractName: 'Development Services - Digital Dynamics',
    client: 'Digital Dynamics Inc',
    contractType: 'Development',
    startDate: '2024-01-10',
    endDate: '2024-07-10',
    value: 675000.00,
    currency: 'CAD',
    status: 'Active',
    renewalDate: 'N/A',
    contractManager: 'Sarah Johnson',
    paymentSchedule: 'Monthly',
    terms: 'Time and materials contract with monthly cap',
    autoRenew: false
  },
  {
    id: 'CTR-2024-008',
    contractName: 'Medical Equipment Lease - Euro Medical',
    client: 'Euro Medical Systems',
    contractType: 'Lease',
    startDate: '2024-02-01',
    endDate: '2029-01-31',
    value: 4500000.00,
    currency: 'EUR',
    status: 'Active',
    renewalDate: '2028-11-01',
    contractManager: 'John Anderson',
    paymentSchedule: 'Monthly',
    terms: '5-year lease with purchase option at end of term',
    autoRenew: false
  },
  {
    id: 'CTR-2024-009',
    contractName: 'Energy Consulting - Green Energy',
    client: 'Green Energy Corp',
    contractType: 'Consulting',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    value: 890000.00,
    currency: 'GBP',
    status: 'Pending',
    renewalDate: '2024-12-01',
    contractManager: 'Mike Williams',
    paymentSchedule: 'Quarterly',
    terms: 'Renewable energy consulting with performance bonuses',
    autoRenew: true
  },
  {
    id: 'CTR-2024-010',
    contractName: 'Retail Systems Support - Sunrise',
    client: 'Sunrise Enterprises',
    contractType: 'Support',
    startDate: '2024-02-10',
    endDate: '2025-02-09',
    value: 156000.00,
    currency: 'USD',
    status: 'Active',
    renewalDate: '2024-12-10',
    contractManager: 'Sarah Johnson',
    paymentSchedule: 'Annual',
    terms: 'Premium support package with on-site visits',
    autoRenew: true
  },
  {
    id: 'CTR-2023-015',
    contractName: 'Legacy System Migration - Acme',
    client: 'Acme Corporation',
    contractType: 'Development',
    startDate: '2023-06-01',
    endDate: '2024-01-31',
    value: 456000.00,
    currency: 'USD',
    status: 'Expired',
    renewalDate: 'N/A',
    contractManager: 'John Anderson',
    paymentSchedule: 'Monthly',
    terms: 'Fixed-price project with acceptance milestones',
    autoRenew: false
  }
]

// Accounts (Customer/Vendor Accounts)
export const accounts = [
  {
    id: 'ACC-001',
    accountName: 'Acme Corporation',
    accountType: 'Customer',
    industry: 'Manufacturing',
    revenue: 12500000,
    employees: 450,
    country: 'USA',
    city: 'New York',
    contactPerson: 'Robert Martinez',
    email: 'r.martinez@acmecorp.com',
    phone: '+1-212-555-0101',
    accountManager: 'John Anderson',
    status: 'Active',
    creditLimit: 500000,
    currentBalance: 145000,
    since: '2019-03-15',
    lastActivity: '2024-02-18',
    notes: 'Key account with strong growth potential'
  },
  {
    id: 'ACC-002',
    accountName: 'Global Tech Solutions',
    accountType: 'Both',
    industry: 'Technology',
    revenue: 45000000,
    employees: 1200,
    country: 'USA',
    city: 'San Francisco',
    contactPerson: 'Jennifer Lee',
    email: 'j.lee@globaltech.com',
    phone: '+1-415-555-0202',
    accountManager: 'Sarah Johnson',
    status: 'Active',
    creditLimit: 1000000,
    currentBalance: 325000,
    since: '2017-08-20',
    lastActivity: '2024-02-20',
    notes: 'Strategic partner and major client'
  },
  {
    id: 'ACC-003',
    accountName: 'Premier Industries Ltd',
    accountType: 'Customer',
    industry: 'Automotive',
    revenue: 78000000,
    employees: 2500,
    country: 'Germany',
    city: 'Munich',
    contactPerson: 'Hans Mueller',
    email: 'h.mueller@premier.de',
    phone: '+49-89-555-0303',
    accountManager: 'Mike Williams',
    status: 'Active',
    creditLimit: 750000,
    currentBalance: 234000,
    since: '2018-11-10',
    lastActivity: '2024-02-15',
    notes: 'International key account with multi-year contracts'
  },
  {
    id: 'ACC-004',
    accountName: 'Sunrise Enterprises',
    accountType: 'Customer',
    industry: 'Retail',
    revenue: 23000000,
    employees: 680,
    country: 'India',
    city: 'Mumbai',
    contactPerson: 'Priya Sharma',
    email: 'p.sharma@sunrise.in',
    phone: '+91-22-555-0404',
    accountManager: 'Sarah Johnson',
    status: 'Active',
    creditLimit: 400000,
    currentBalance: 89000,
    since: '2020-05-22',
    lastActivity: '2024-02-12',
    notes: 'Growing account with expansion plans'
  },
  {
    id: 'ACC-005',
    accountName: 'Nordic Supply Co',
    accountType: 'Vendor',
    industry: 'Logistics',
    revenue: 34000000,
    employees: 890,
    country: 'Sweden',
    city: 'Stockholm',
    contactPerson: 'Erik Andersson',
    email: 'e.andersson@nordicsupply.se',
    phone: '+46-8-555-0505',
    accountManager: 'John Anderson',
    status: 'Active',
    creditLimit: 600000,
    currentBalance: 156000,
    since: '2019-02-14',
    lastActivity: '2024-02-19',
    notes: 'Reliable vendor with excellent track record'
  },
  {
    id: 'ACC-006',
    accountName: 'Pacific Trading Group',
    accountType: 'Both',
    industry: 'Import/Export',
    revenue: 56000000,
    employees: 1100,
    country: 'Singapore',
    city: 'Singapore',
    contactPerson: 'Michelle Tan',
    email: 'm.tan@pacifictrading.sg',
    phone: '+65-6555-0606',
    accountManager: 'Mike Williams',
    status: 'Active',
    creditLimit: 850000,
    currentBalance: 412000,
    since: '2016-09-30',
    lastActivity: '2024-02-17',
    notes: 'Long-term partnership with high volume'
  },
  {
    id: 'ACC-007',
    accountName: 'Metro Construction LLC',
    accountType: 'Customer',
    industry: 'Construction',
    revenue: 125000000,
    employees: 3200,
    country: 'UAE',
    city: 'Dubai',
    contactPerson: 'Ahmed Al-Rashid',
    email: 'a.alrashid@metroconstruction.ae',
    phone: '+971-4-555-0707',
    accountManager: 'John Anderson',
    status: 'Active',
    creditLimit: 2000000,
    currentBalance: 875000,
    since: '2018-04-18',
    lastActivity: '2024-02-16',
    notes: 'Major construction projects account'
  },
  {
    id: 'ACC-008',
    accountName: 'Digital Dynamics Inc',
    accountType: 'Vendor',
    industry: 'Software',
    revenue: 18000000,
    employees: 320,
    country: 'Canada',
    city: 'Toronto',
    contactPerson: 'David Chen',
    email: 'd.chen@digitaldynamics.ca',
    phone: '+1-416-555-0808',
    accountManager: 'Sarah Johnson',
    status: 'Active',
    creditLimit: 300000,
    currentBalance: 98000,
    since: '2020-07-25',
    lastActivity: '2024-02-14',
    notes: 'Preferred software vendor'
  },
  {
    id: 'ACC-009',
    accountName: 'Euro Medical Systems',
    accountType: 'Customer',
    industry: 'Healthcare',
    revenue: 95000000,
    employees: 1800,
    country: 'France',
    city: 'Paris',
    contactPerson: 'Sophie Dubois',
    email: 's.dubois@euromedical.fr',
    phone: '+33-1-555-0909',
    accountManager: 'Mike Williams',
    status: 'Active',
    creditLimit: 1500000,
    currentBalance: 645000,
    since: '2017-12-08',
    lastActivity: '2024-02-13',
    notes: 'Healthcare sector leader with compliance requirements'
  },
  {
    id: 'ACC-010',
    accountName: 'Green Energy Corp',
    accountType: 'Customer',
    industry: 'Energy',
    revenue: 67000000,
    employees: 1450,
    country: 'UK',
    city: 'London',
    contactPerson: 'Oliver Thompson',
    email: 'o.thompson@greenenergy.co.uk',
    phone: '+44-20-555-1010',
    accountManager: 'John Anderson',
    status: 'Active',
    creditLimit: 1200000,
    currentBalance: 567000,
    since: '2019-06-12',
    lastActivity: '2024-02-11',
    notes: 'Renewable energy sector with government contracts'
  },
  {
    id: 'ACC-011',
    accountName: 'TechStart Innovations',
    accountType: 'Customer',
    industry: 'Technology',
    revenue: 3500000,
    employees: 85,
    country: 'USA',
    city: 'Austin',
    contactPerson: 'Lisa Rodriguez',
    email: 'l.rodriguez@techstart.com',
    phone: '+1-512-555-1111',
    accountManager: 'Sarah Johnson',
    status: 'Active',
    creditLimit: 150000,
    currentBalance: 45000,
    since: '2023-01-20',
    lastActivity: '2024-02-10',
    notes: 'Startup with high growth potential'
  },
  {
    id: 'ACC-012',
    accountName: 'Midwest Manufacturing Co',
    accountType: 'Customer',
    industry: 'Manufacturing',
    revenue: 28000000,
    employees: 560,
    country: 'USA',
    city: 'Chicago',
    contactPerson: 'Michael Johnson',
    email: 'm.johnson@midwestmfg.com',
    phone: '+1-312-555-1212',
    accountManager: 'Mike Williams',
    status: 'Inactive',
    creditLimit: 400000,
    currentBalance: 0,
    since: '2015-03-15',
    lastActivity: '2023-08-22',
    notes: 'Account on hold - merger in progress'
  }
]

// Users for the system
export const users = [
  {
    id: 1,
    name: 'John Anderson',
    email: 'admin@erpdemo.com',
    role: 'System Administrator',
    department: 'IT',
    phone: '+1-555-0001',
    joinDate: '2018-01-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'manager@erpdemo.com',
    role: 'Operations Manager',
    department: 'Operations',
    phone: '+1-555-0002',
    joinDate: '2019-03-22',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Mike Williams',
    email: 'user@erpdemo.com',
    role: 'Sales Executive',
    department: 'Sales',
    phone: '+1-555-0003',
    joinDate: '2020-06-10',
    status: 'Active'
  }
]
