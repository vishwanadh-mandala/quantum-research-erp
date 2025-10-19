import { TrendingUp, ShoppingCart, FileText, Users, DollarSign, AlertCircle } from 'lucide-react'
import { purchaseOrders, salesOrders, contracts, accounts } from '../data/dummyData'

const Dashboard = () => {
  // Calculate statistics
  const totalPurchaseOrders = purchaseOrders.length
  const totalSalesOrders = salesOrders.length
  const totalContracts = contracts.filter(c => c.status === 'Active').length
  const totalActiveAccounts = accounts.filter(a => a.status === 'Active').length

  const totalPOValue = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0)
  const totalSOValue = salesOrders.reduce((sum, so) => sum + so.totalAmount, 0)
  const totalContractValue = contracts.filter(c => c.status === 'Active').reduce((sum, c) => sum + c.value, 0)

  const pendingPOs = purchaseOrders.filter(po => po.status === 'Pending' || po.status === 'Processing').length
  const pendingSOs = salesOrders.filter(so => so.status === 'Pending' || so.status === 'In Progress').length

  const recentActivities = [
    { type: 'PO', id: 'PO-2024-010', action: 'Created', date: '2024-02-20', user: 'John Anderson' },
    { type: 'SO', id: 'SO-2024-010', action: 'Updated', date: '2024-02-19', user: 'Mike Williams' },
    { type: 'Contract', id: 'CTR-2024-009', action: 'Pending Approval', date: '2024-02-18', user: 'Sarah Johnson' },
    { type: 'Account', id: 'ACC-011', action: 'New Account', date: '2024-02-17', user: 'Sarah Johnson' },
    { type: 'SO', id: 'SO-2024-009', action: 'Payment Received', date: '2024-02-16', user: 'Mike Williams' },
  ]

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your ERP system</p>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Purchase Orders</h3>
              <div className="value">{totalPurchaseOrders}</div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                {pendingPOs} pending processing
              </p>
            </div>
            <ShoppingCart size={32} style={{ color: '#2563eb' }} />
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Sales Orders</h3>
              <div className="value">{totalSalesOrders}</div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                {pendingSOs} in progress
              </p>
            </div>
            <TrendingUp size={32} style={{ color: '#16a34a' }} />
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Active Contracts</h3>
              <div className="value">{totalContracts}</div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                Total contracts: {contracts.length}
              </p>
            </div>
            <FileText size={32} style={{ color: '#d97706' }} />
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Active Accounts</h3>
              <div className="value">{totalActiveAccounts}</div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                Total accounts: {accounts.length}
              </p>
            </div>
            <Users size={32} style={{ color: '#7c3aed' }} />
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Total PO Value</h3>
              <div className="value" style={{ fontSize: '24px' }}>
                ${totalPOValue.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                Across all purchase orders
              </p>
            </div>
            <DollarSign size={28} style={{ color: '#dc2626' }} />
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Total SO Value</h3>
              <div className="value" style={{ fontSize: '24px' }}>
                ${totalSOValue.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                Across all sales orders
              </p>
            </div>
            <DollarSign size={28} style={{ color: '#16a34a' }} />
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h3>Active Contract Value</h3>
              <div className="value" style={{ fontSize: '24px' }}>
                ${totalContractValue.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                From active contracts only
              </p>
            </div>
            <DollarSign size={28} style={{ color: '#2563eb' }} />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={24} />
          Recent Activities
        </h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>ID</th>
                <th>Action</th>
                <th>User</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, index) => (
                <tr key={index}>
                  <td>
                    <span className={`badge ${
                      activity.type === 'PO' ? 'badge-info' :
                      activity.type === 'SO' ? 'badge-success' :
                      activity.type === 'Contract' ? 'badge-warning' :
                      'badge-info'
                    }`}>
                      {activity.type}
                    </span>
                  </td>
                  <td><strong>{activity.id}</strong></td>
                  <td>{activity.action}</td>
                  <td>{activity.user}</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Alerts */}
      <div className="card" style={{ backgroundColor: '#fef3c7', borderLeft: '4px solid #d97706' }}>
        <h3 style={{ marginBottom: '12px', color: '#92400e' }}>Alerts & Notifications</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #fde68a' }}>
            {pendingPOs} Purchase Orders require attention
          </li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid #fde68a' }}>
            2 Contracts expiring within 90 days
          </li>
          <li style={{ padding: '8px 0' }}>
            {pendingSOs} Sales Orders in progress
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
