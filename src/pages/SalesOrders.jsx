import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, Filter, Download, Search, Edit } from 'lucide-react'
import { salesOrders } from '../data/dummyData'

const SalesOrders = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedSO, setSelectedSO] = useState(null)

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Fulfilled': return 'badge-success'
      case 'Shipped': return 'badge-info'
      case 'In Progress': return 'badge-warning'
      case 'Pending': return 'badge-danger'
      default: return 'badge-info'
    }
  }

  const getPaymentBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'badge-success'
      case 'Partial': return 'badge-warning'
      case 'Pending': return 'badge-danger'
      default: return 'badge-info'
    }
  }

  const filteredSOs = salesOrders.filter(so => {
    const matchesSearch = so.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         so.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || so.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalValue = filteredSOs.reduce((sum, so) => sum + so.totalAmount, 0)
  const paidOrders = filteredSOs.filter(so => so.paymentStatus === 'Paid')
  const totalPaidValue = paidOrders.reduce((sum, so) => sum + so.totalAmount, 0)

  return (
    <div className="sales-orders">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Sales Orders</h1>
          <p>Manage and track all sales orders</p>
        </div>
        <button className="btn btn-success" onClick={() => navigate('/sales-orders/create')}>
          <Plus size={18} />
          New Sales Order
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total SOs</h3>
          <div className="value">{filteredSOs.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <div className="value" style={{ fontSize: '24px' }}>
            ${totalValue.toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <h3>Paid Orders</h3>
          <div className="value" style={{ color: '#16a34a' }}>
            {paidOrders.length}
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
            ${totalPaidValue.toLocaleString()}
          </p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="value" style={{ color: '#dc2626' }}>
            {filteredSOs.filter(so => so.status === 'Pending').length}
          </div>
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
                placeholder="Search by SO ID or Customer..."
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
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Shipped">Shipped</option>
              <option value="Fulfilled">Fulfilled</option>
            </select>
          </div>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Sales Orders Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>SO ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Payment Status</th>
                <th>Total Amount</th>
                <th>Sales Rep</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSOs.map((so) => (
                <tr key={so.id}>
                  <td><strong>{so.id}</strong></td>
                  <td>{so.customer}</td>
                  <td>{so.orderDate}</td>
                  <td>{so.deliveryDate}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(so.status)}`}>
                      {so.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getPaymentBadgeClass(so.paymentStatus)}`}>
                      {so.paymentStatus}
                    </span>
                  </td>
                  <td><strong>${so.totalAmount.toLocaleString()}</strong></td>
                  <td>{so.salesRep}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-success"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => setSelectedSO(so)}
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => navigate(`/sales-orders/edit/${so.id}`)}
                      >
                        <Edit size={14} />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for SO Details */}
      {selectedSO && (
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
          onClick={() => setSelectedSO(null)}
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
            <h2 style={{ marginBottom: '20px' }}>Sales Order Details - {selectedSO.id}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Customer</p>
                <p style={{ fontWeight: '600' }}>{selectedSO.customer}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Status</p>
                <span className={`badge ${getStatusBadgeClass(selectedSO.status)}`}>
                  {selectedSO.status}
                </span>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Order Date</p>
                <p style={{ fontWeight: '600' }}>{selectedSO.orderDate}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Delivery Date</p>
                <p style={{ fontWeight: '600' }}>{selectedSO.deliveryDate}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Payment Status</p>
                <span className={`badge ${getPaymentBadgeClass(selectedSO.paymentStatus)}`}>
                  {selectedSO.paymentStatus}
                </span>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Sales Rep</p>
                <p style={{ fontWeight: '600' }}>{selectedSO.salesRep}</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>Shipping Address</p>
              <p style={{ fontWeight: '600' }}>{selectedSO.shippingAddress}</p>
            </div>

            <h3 style={{ marginBottom: '12px' }}>Items</h3>
            <table style={{ marginBottom: '20px' }}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedSO.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.unitPrice.toLocaleString()}</td>
                    <td><strong>${item.total.toLocaleString()}</strong></td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #e5e7eb' }}>
                  <td colSpan="3" style={{ textAlign: 'right', fontWeight: '600' }}>Total Amount:</td>
                  <td><strong style={{ fontSize: '18px', color: '#16a34a' }}>
                    {selectedSO.currency} ${selectedSO.totalAmount.toLocaleString()}
                  </strong></td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedSO(null)}>
                Close
              </button>
              <button className="btn btn-success">
                <Download size={16} />
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SalesOrders
