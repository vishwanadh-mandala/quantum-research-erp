import { useState } from 'react'
import { Plus, Eye, Filter, Download, Search, Calendar } from 'lucide-react'
import { contracts } from '../data/dummyData'

const Contracts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selectedContract, setSelectedContract] = useState(null)

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'badge-success'
      case 'Pending': return 'badge-warning'
      case 'Expired': return 'badge-danger'
      default: return 'badge-info'
    }
  }

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || contract.status === statusFilter
    const matchesType = typeFilter === 'All' || contract.contractType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalValue = filteredContracts.reduce((sum, c) => sum + c.value, 0)
  const activeContracts = filteredContracts.filter(c => c.status === 'Active')
  const activeValue = activeContracts.reduce((sum, c) => sum + c.value, 0)

  // Get unique contract types for filter
  const contractTypes = [...new Set(contracts.map(c => c.contractType))]

  return (
    <div className="contracts">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Contract Management</h1>
          <p>Manage and track all contracts</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          New Contract
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Contracts</h3>
          <div className="value">{filteredContracts.length}</div>
        </div>
        <div className="stat-card">
          <h3>Active Contracts</h3>
          <div className="value" style={{ color: '#16a34a' }}>
            {activeContracts.length}
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
            ${activeValue.toLocaleString()}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <div className="value" style={{ fontSize: '24px' }}>
            ${totalValue.toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <h3>Expiring Soon</h3>
          <div className="value" style={{ color: '#d97706' }}>
            2
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
            Within 90 days
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
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Filter size={18} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              {contractTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Contracts Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Contract Name</th>
                <th>Client</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Value</th>
                <th>Status</th>
                <th>Manager</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id}>
                  <td><strong>{contract.id}</strong></td>
                  <td>{contract.contractName}</td>
                  <td>{contract.client}</td>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: '11px' }}>
                      {contract.contractType}
                    </span>
                  </td>
                  <td>{contract.startDate}</td>
                  <td>{contract.endDate}</td>
                  <td><strong>${contract.value.toLocaleString()}</strong></td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(contract.status)}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td>{contract.contractManager}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                      onClick={() => setSelectedContract(contract)}
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

      {/* Modal for Contract Details */}
      {selectedContract && (
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
          onClick={() => setSelectedContract(null)}
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
            <h2 style={{ marginBottom: '20px' }}>Contract Details - {selectedContract.id}</h2>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{selectedContract.contractName}</h3>
              <span className={`badge ${getStatusBadgeClass(selectedContract.status)}`}>
                {selectedContract.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Client</p>
                <p style={{ fontWeight: '600' }}>{selectedContract.client}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Contract Type</p>
                <p style={{ fontWeight: '600' }}>{selectedContract.contractType}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Contract Value</p>
                <p style={{ fontWeight: '700', fontSize: '18px', color: '#2563eb' }}>
                  {selectedContract.currency} ${selectedContract.value.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Payment Schedule</p>
                <p style={{ fontWeight: '600' }}>{selectedContract.paymentSchedule}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Start Date</p>
                <p style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} />
                  {selectedContract.startDate}
                </p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>End Date</p>
                <p style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} />
                  {selectedContract.endDate}
                </p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Renewal Date</p>
                <p style={{ fontWeight: '600' }}>{selectedContract.renewalDate}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Auto Renew</p>
                <p style={{ fontWeight: '600' }}>
                  {selectedContract.autoRenew ? (
                    <span className="badge badge-success">Yes</span>
                  ) : (
                    <span className="badge badge-danger">No</span>
                  )}
                </p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Contract Manager</p>
                <p style={{ fontWeight: '600' }}>{selectedContract.contractManager}</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '6px' }}>Terms & Conditions</p>
              <div style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                <p>{selectedContract.terms}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedContract(null)}>
                Close
              </button>
              <button className="btn btn-primary">
                <Download size={16} />
                Download Contract
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contracts
