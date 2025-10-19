import { useState } from 'react'
import { Plus, Eye, Filter, Download, Search, Building, Phone, Mail, DollarSign } from 'lucide-react'
import { accounts } from '../data/dummyData'

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedAccount, setSelectedAccount] = useState(null)

  const getStatusBadgeClass = (status) => {
    return status === 'Active' ? 'badge-success' : 'badge-danger'
  }

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Customer': return 'badge-success'
      case 'Vendor': return 'badge-info'
      case 'Both': return 'badge-warning'
      default: return 'badge-info'
    }
  }

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'All' || account.accountType === typeFilter
    const matchesStatus = statusFilter === 'All' || account.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const totalRevenue = filteredAccounts.reduce((sum, acc) => sum + acc.revenue, 0)
  const totalBalance = filteredAccounts.reduce((sum, acc) => sum + acc.currentBalance, 0)
  const activeAccounts = filteredAccounts.filter(a => a.status === 'Active')

  return (
    <div className="accounts">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Account Management</h1>
          <p>Manage customer and vendor accounts</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Account
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Accounts</h3>
          <div className="value">{filteredAccounts.length}</div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
            {activeAccounts.length} active
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="value" style={{ fontSize: '22px' }}>
            ${(totalRevenue / 1000000).toFixed(1)}M
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
            Combined revenue
          </p>
        </div>
        <div className="stat-card">
          <h3>Outstanding Balance</h3>
          <div className="value" style={{ fontSize: '22px', color: '#d97706' }}>
            ${totalBalance.toLocaleString()}
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
            Across all accounts
          </p>
        </div>
        <div className="stat-card">
          <h3>Customers</h3>
          <div className="value" style={{ color: '#16a34a' }}>
            {accounts.filter(a => a.accountType === 'Customer' || a.accountType === 'Both').length}
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
            {accounts.filter(a => a.accountType === 'Vendor').length} vendors
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Filter size={18} />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Customer">Customer</option>
              <option value="Vendor">Vendor</option>
              <option value="Both">Both</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Account Name</th>
                <th>Type</th>
                <th>Industry</th>
                <th>Contact Person</th>
                <th>Location</th>
                <th>Revenue</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account.id}>
                  <td><strong>{account.id}</strong></td>
                  <td>{account.accountName}</td>
                  <td>
                    <span className={`badge ${getTypeBadgeClass(account.accountType)}`}>
                      {account.accountType}
                    </span>
                  </td>
                  <td>{account.industry}</td>
                  <td>{account.contactPerson}</td>
                  <td>{account.city}, {account.country}</td>
                  <td>${(account.revenue / 1000000).toFixed(1)}M</td>
                  <td><strong>${account.currentBalance.toLocaleString()}</strong></td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(account.status)}`}>
                      {account.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => setSelectedAccount(account)}
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Account Details */}
      {selectedAccount && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}
          onClick={() => setSelectedAccount(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
              margin: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginBottom: '8px' }}>{selectedAccount.accountName}</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={16} />
              {selectedAccount.id}
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <span className={`badge ${getTypeBadgeClass(selectedAccount.accountType)}`}>
                {selectedAccount.accountType}
              </span>
              <span className={`badge ${getStatusBadgeClass(selectedAccount.status)}`}>
                {selectedAccount.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Company Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Industry</p>
                    <p style={{ fontWeight: '600' }}>{selectedAccount.industry}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Location</p>
                    <p style={{ fontWeight: '600' }}>{selectedAccount.city}, {selectedAccount.country}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Employees</p>
                    <p style={{ fontWeight: '600' }}>{selectedAccount.employees.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Annual Revenue</p>
                    <p style={{ fontWeight: '700', fontSize: '18px', color: '#2563eb' }}>
                      ${selectedAccount.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Contact Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Contact Person</p>
                    <p style={{ fontWeight: '600' }}>{selectedAccount.contactPerson}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Email</p>
                    <p style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={14} />
                      {selectedAccount.email}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Phone</p>
                    <p style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={14} />
                      {selectedAccount.phone}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>Account Manager</p>
                    <p style={{ fontWeight: '600' }}>{selectedAccount.accountManager}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Credit Limit</p>
                <p style={{ fontWeight: '700', fontSize: '18px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={18} />
                  ${selectedAccount.creditLimit.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Current Balance</p>
                <p style={{ fontWeight: '700', fontSize: '18px', color: '#d97706', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={18} />
                  ${selectedAccount.currentBalance.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Customer Since</p>
                <p style={{ fontWeight: '600' }}>{selectedAccount.since}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Last Activity</p>
                <p style={{ fontWeight: '600' }}>{selectedAccount.lastActivity}</p>
              </div>
            </div>

            {selectedAccount.notes && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>Notes</p>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '6px',
                  border: '1px solid #fde68a'
                }}>
                  <p>{selectedAccount.notes}</p>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedAccount(null)}>
                Close
              </button>
              <button className="btn btn-primary">
                Edit Account
              </button>
              <button className="btn btn-success">
                <Download size={16} />
                Export Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Accounts
