import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Eye, Filter, Download, Search, Edit } from 'lucide-react'
import { purchaseOrders } from '../data/dummyData'

const PurchaseOrders = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedPO, setSelectedPO] = useState(null)

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered': return 'badge-success'
      case 'In Transit': return 'badge-info'
      case 'Processing': return 'badge-warning'
      case 'Pending': return 'badge-danger'
      default: return 'badge-info'
    }
  }

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || po.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalValue = filteredPOs.reduce((sum, po) => sum + po.totalAmount, 0)

  return (
    <div className="purchase-orders">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Purchase Orders</h1>
          <p>Manage and track all purchase orders</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/purchase-orders/create')}>
          <Plus size={18} />
          New Purchase Order
        </button>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total POs</h3>
          <div className="value">{filteredPOs.length}</div>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <div className="value" style={{ fontSize: '24px' }}>
            ${totalValue.toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <div className="value" style={{ color: '#dc2626' }}>
            {filteredPOs.filter(po => po.status === 'Pending').length}
          </div>
        </div>
        <div className="stat-card">
          <h3>In Transit</h3>
          <div className="value" style={{ color: '#2563eb' }}>
            {filteredPOs.filter(po => po.status === 'In Transit').length}
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
                placeholder="Search by PO ID or Vendor..."
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
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button className="btn btn-secondary">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>PO ID</th>
                <th>Vendor</th>
                <th>Order Date</th>
                <th>Expected Delivery</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Currency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPOs.map((po) => (
                <tr key={po.id}>
                  <td><strong>{po.id}</strong></td>
                  <td>{po.vendor}</td>
                  <td>{po.orderDate}</td>
                  <td>{po.expectedDelivery}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                  <td><strong>${po.totalAmount.toLocaleString()}</strong></td>
                  <td>{po.currency}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="btn btn-primary"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => setSelectedPO(po)}
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => navigate(`/purchase-orders/edit/${po.id}`)}
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

      {/* Modal for PO Details */}
      {selectedPO && (
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
          onClick={() => setSelectedPO(null)}
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
            <h2 style={{ marginBottom: '20px' }}>Purchase Order Details - {selectedPO.id}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Vendor</p>
                <p style={{ fontWeight: '600' }}>{selectedPO.vendor}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Status</p>
                <span className={`badge ${getStatusBadgeClass(selectedPO.status)}`}>
                  {selectedPO.status}
                </span>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Order Date</p>
                <p style={{ fontWeight: '600' }}>{selectedPO.orderDate}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Expected Delivery</p>
                <p style={{ fontWeight: '600' }}>{selectedPO.expectedDelivery}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Payment Terms</p>
                <p style={{ fontWeight: '600' }}>{selectedPO.paymentTerms}</p>
              </div>
              <div>
                <p style={{ color: '#6b7280', fontSize: '13px' }}>Created By</p>
                <p style={{ fontWeight: '600' }}>{selectedPO.createdBy}</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: '#6b7280', fontSize: '13px' }}>Shipping Address</p>
              <p style={{ fontWeight: '600' }}>{selectedPO.shippingAddress}</p>
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
                {selectedPO.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.unitPrice.toLocaleString()}</td>
                    <td><strong>${item.total.toLocaleString()}</strong></td>
                  </tr>
                ))}
                <tr style={{ borderTop: '2px solid #e5e7eb' }}>
                  <td colSpan="3" style={{ textAlign: 'right', fontWeight: '600' }}>Total Amount:</td>
                  <td><strong style={{ fontSize: '18px', color: '#2563eb' }}>
                    {selectedPO.currency} ${selectedPO.totalAmount.toLocaleString()}
                  </strong></td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedPO(null)}>
                Close
              </button>
              <button className="btn btn-primary">
                <Download size={16} />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PurchaseOrders
