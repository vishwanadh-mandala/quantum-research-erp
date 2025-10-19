import { useState } from 'react'
import { Save, X, Plus, Trash2, AlertCircle, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { companies } from '../../data/dummyData'
import './POForm.css'

const POForm = ({ existingPO = null, mode = 'create' }) => {
  const navigate = useNavigate()
  const [showTooltip, setShowTooltip] = useState(null)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Form state
  const [formData, setFormData] = useState({
    poNumber: existingPO?.id || '',
    vendor: existingPO?.vendor || '',
    orderDate: existingPO?.orderDate || new Date().toISOString().split('T')[0],
    expectedDelivery: existingPO?.expectedDelivery || '',
    priority: existingPO?.priority || 'Medium',
    status: existingPO?.status || 'Pending',
    paymentTerms: existingPO?.paymentTerms || 'Net 30',
    currency: existingPO?.currency || 'USD',
    shippingMethod: existingPO?.shippingMethod || 'Standard',
    department: existingPO?.department || '',
    projectCode: existingPO?.projectCode || '',
    requisitionNumber: existingPO?.requisitionNumber || '',
    buyerName: existingPO?.buyerName || '',
    buyerEmail: existingPO?.buyerEmail || '',
    buyerPhone: existingPO?.buyerPhone || '',
    shippingAddress: existingPO?.shippingAddress || '',
    billingAddress: existingPO?.billingAddress || '',
    specialInstructions: existingPO?.specialInstructions || '',
    incoterms: existingPO?.incoterms || 'FOB',
    taxRate: existingPO?.taxRate || '0',
    discountPercent: existingPO?.discountPercent || '0',
    shippingCost: existingPO?.shippingCost || '0',
  })

  const [items, setItems] = useState(existingPO?.items || [
    { id: 1, name: '', description: '', quantity: '', unitPrice: '', uom: 'Units', taxable: true }
  ])

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'vendor':
        return value.trim() === '' ? 'Vendor is required' : ''
      case 'orderDate':
        return value === '' ? 'Order date is required' : ''
      case 'expectedDelivery':
        if (value === '') return 'Expected delivery date is required'
        if (new Date(value) <= new Date(formData.orderDate)) {
          return 'Delivery date must be after order date'
        }
        return ''
      case 'buyerEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Invalid email format'
        }
        return ''
      case 'buyerPhone':
        if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
          return 'Invalid phone format'
        }
        return ''
      case 'shippingAddress':
        return value.trim() === '' ? 'Shipping address is required' : ''
      case 'billingAddress':
        return value.trim() === '' ? 'Billing address is required' : ''
      case 'taxRate':
        if (value < 0 || value > 100) return 'Tax rate must be between 0-100%'
        return ''
      case 'discountPercent':
        if (value < 0 || value > 100) return 'Discount must be between 0-100%'
        return ''
      default:
        return ''
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Validate on change if already touched
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name]) }))
  }

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, {
      id: items.length + 1,
      name: '',
      description: '',
      quantity: '',
      unitPrice: '',
      uom: 'Units',
      taxable: true
    }])
  }

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const calculateItemTotal = (item) => {
    const qty = parseFloat(item.quantity) || 0
    const price = parseFloat(item.unitPrice) || 0
    return qty * price
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  }

  const calculateTax = () => {
    const subtotal = calculateSubtotal()
    const taxRate = parseFloat(formData.taxRate) || 0
    return (subtotal * taxRate) / 100
  }

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal()
    const discount = parseFloat(formData.discountPercent) || 0
    return (subtotal * discount) / 100
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTax()
    const discount = calculateDiscount()
    const shipping = parseFloat(formData.shippingCost) || 0
    return subtotal + tax - discount + shipping
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })

    // Validate items
    items.forEach((item, index) => {
      if (!item.name) newErrors[`item_${index}_name`] = 'Item name required'
      if (!item.quantity || item.quantity <= 0) newErrors[`item_${index}_quantity`] = 'Valid quantity required'
      if (!item.unitPrice || item.unitPrice <= 0) newErrors[`item_${index}_price`] = 'Valid price required'
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, this would save to backend
      alert(`Purchase Order ${mode === 'create' ? 'Created' : 'Updated'} Successfully!\n\nPO Total: $${calculateTotal().toLocaleString()}`)
      navigate('/purchase-orders')
    } else {
      alert('Please fix all validation errors before submitting')
    }
  }

  const tooltips = {
    poNumber: 'Unique identifier for this purchase order',
    vendor: 'Select the supplier/vendor for this order',
    priority: 'Set order priority (affects processing timeline)',
    paymentTerms: 'Payment terms agreed with vendor',
    incoterms: 'International commercial terms for shipping',
    requisitionNumber: 'Internal requisition reference number',
    projectCode: 'Project or cost center code for accounting',
    buyerEmail: 'Email must be in valid format (e.g., user@domain.com)',
    taxRate: 'Applicable tax rate percentage (0-100)',
    discountPercent: 'Discount percentage if applicable (0-100)',
  }

  return (
    <form onSubmit={handleSubmit} className="po-form">
      {/* Header Banner */}
      <div className="form-banner">
        <div className="banner-content">
          <h2>{mode === 'create' ? 'Create New Purchase Order' : 'Edit Purchase Order'}</h2>
          <p>Fill in all required fields marked with *</p>
        </div>
        <div className="banner-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/purchase-orders')}>
            <X size={18} />
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            <Save size={18} />
            Save Purchase Order
          </button>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="form-section">
        <div className="section-header">
          <h3>Basic Information</h3>
          <div className="section-line"></div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label>
              PO Number *
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('poNumber')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'poNumber' && (
                <div className="tooltip">{tooltips.poNumber}</div>
              )}
            </label>
            <input
              type="text"
              name="poNumber"
              value={formData.poNumber}
              onChange={handleInputChange}
              onBlur={() => handleBlur('poNumber')}
              placeholder="Enter PO number or leave blank for auto-generate"
              className={errors.poNumber ? 'error' : ''}
            />
            {errors.poNumber && <span className="error-message">{errors.poNumber}</span>}
          </div>

          <div className="form-field">
            <label>
              Vendor / Supplier *
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('vendor')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'vendor' && (
                <div className="tooltip">{tooltips.vendor}</div>
              )}
            </label>
            <select
              name="vendor"
              value={formData.vendor}
              onChange={handleInputChange}
              onBlur={() => handleBlur('vendor')}
              className={errors.vendor ? 'error' : ''}
            >
              <option value="">-- Select Vendor --</option>
              {companies.map(company => (
                <option key={company.id} value={company.name}>{company.name}</option>
              ))}
            </select>
            {errors.vendor && <span className="error-message">{errors.vendor}</span>}
          </div>

          <div className="form-field">
            <label>Order Date *</label>
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleInputChange}
              onBlur={() => handleBlur('orderDate')}
              className={errors.orderDate ? 'error' : ''}
            />
            {errors.orderDate && <span className="error-message">{errors.orderDate}</span>}
          </div>

          <div className="form-field">
            <label>Expected Delivery Date *</label>
            <input
              type="date"
              name="expectedDelivery"
              value={formData.expectedDelivery}
              onChange={handleInputChange}
              onBlur={() => handleBlur('expectedDelivery')}
              className={errors.expectedDelivery ? 'error' : ''}
            />
            {errors.expectedDelivery && <span className="error-message">{errors.expectedDelivery}</span>}
          </div>

          <div className="form-field">
            <label>
              Priority *
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('priority')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'priority' && (
                <div className="tooltip">{tooltips.priority}</div>
              )}
            </label>
            <select name="priority" value={formData.priority} onChange={handleInputChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="form-field">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-field">
            <label>Currency</label>
            <select name="currency" value={formData.currency} onChange={handleInputChange}>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
            </select>
          </div>

          <div className="form-field">
            <label>Shipping Method</label>
            <select name="shippingMethod" value={formData.shippingMethod} onChange={handleInputChange}>
              <option value="Standard">Standard Shipping</option>
              <option value="Express">Express Shipping</option>
              <option value="Overnight">Overnight</option>
              <option value="Freight">Freight</option>
              <option value="Pickup">Vendor Pickup</option>
            </select>
          </div>
        </div>
      </div>

      {/* Financial Terms Section */}
      <div className="form-section">
        <div className="section-header">
          <h3>Financial Terms</h3>
          <div className="section-line"></div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label>
              Payment Terms *
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('paymentTerms')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'paymentTerms' && (
                <div className="tooltip">{tooltips.paymentTerms}</div>
              )}
            </label>
            <select name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange}>
              <option value="Net 15">Net 15 Days</option>
              <option value="Net 30">Net 30 Days</option>
              <option value="Net 45">Net 45 Days</option>
              <option value="Net 60">Net 60 Days</option>
              <option value="Net 90">Net 90 Days</option>
              <option value="Immediate">Immediate Payment</option>
              <option value="COD">Cash on Delivery</option>
              <option value="Advance">Advance Payment</option>
            </select>
          </div>

          <div className="form-field">
            <label>
              Incoterms
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('incoterms')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'incoterms' && (
                <div className="tooltip">{tooltips.incoterms}</div>
              )}
            </label>
            <select name="incoterms" value={formData.incoterms} onChange={handleInputChange}>
              <option value="FOB">FOB - Free on Board</option>
              <option value="CIF">CIF - Cost, Insurance & Freight</option>
              <option value="EXW">EXW - Ex Works</option>
              <option value="DDP">DDP - Delivered Duty Paid</option>
              <option value="FCA">FCA - Free Carrier</option>
            </select>
          </div>

          <div className="form-field">
            <label>
              Tax Rate (%) *
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('taxRate')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'taxRate' && (
                <div className="tooltip">{tooltips.taxRate}</div>
              )}
            </label>
            <input
              type="number"
              name="taxRate"
              value={formData.taxRate}
              onChange={handleInputChange}
              onBlur={() => handleBlur('taxRate')}
              min="0"
              max="100"
              step="0.01"
              placeholder="0.00"
              className={errors.taxRate ? 'error' : ''}
            />
            {errors.taxRate && <span className="error-message">{errors.taxRate}</span>}
          </div>

          <div className="form-field">
            <label>
              Discount (%) *
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('discountPercent')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'discountPercent' && (
                <div className="tooltip">{tooltips.discountPercent}</div>
              )}
            </label>
            <input
              type="number"
              name="discountPercent"
              value={formData.discountPercent}
              onChange={handleInputChange}
              onBlur={() => handleBlur('discountPercent')}
              min="0"
              max="100"
              step="0.01"
              placeholder="0.00"
              className={errors.discountPercent ? 'error' : ''}
            />
            {errors.discountPercent && <span className="error-message">{errors.discountPercent}</span>}
          </div>

          <div className="form-field">
            <label>Shipping Cost</label>
            <input
              type="number"
              name="shippingCost"
              value={formData.shippingCost}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      {/* Organizational Details Section */}
      <div className="form-section">
        <div className="section-header">
          <h3>Organizational Details</h3>
          <div className="section-line"></div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label>
              Department
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('department')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'department' && (
                <div className="tooltip">Department requesting this purchase</div>
              )}
            </label>
            <select name="department" value={formData.department} onChange={handleInputChange}>
              <option value="">-- Select Department --</option>
              <option value="IT">Information Technology</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance & Accounting</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales & Marketing</option>
              <option value="Procurement">Procurement</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="R&D">Research & Development</option>
            </select>
          </div>

          <div className="form-field">
            <label>
              Project Code
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('projectCode')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'projectCode' && (
                <div className="tooltip">{tooltips.projectCode}</div>
              )}
            </label>
            <input
              type="text"
              name="projectCode"
              value={formData.projectCode}
              onChange={handleInputChange}
              placeholder="e.g., PROJ-2024-001"
            />
          </div>

          <div className="form-field">
            <label>
              Requisition Number
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('requisitionNumber')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'requisitionNumber' && (
                <div className="tooltip">{tooltips.requisitionNumber}</div>
              )}
            </label>
            <input
              type="text"
              name="requisitionNumber"
              value={formData.requisitionNumber}
              onChange={handleInputChange}
              placeholder="e.g., REQ-2024-12345"
            />
          </div>
        </div>
      </div>

      {/* Buyer Information Section */}
      <div className="form-section">
        <div className="section-header">
          <h3>Buyer Information</h3>
          <div className="section-line"></div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label>Buyer Name</label>
            <input
              type="text"
              name="buyerName"
              value={formData.buyerName}
              onChange={handleInputChange}
              placeholder="Enter buyer's full name"
            />
          </div>

          <div className="form-field">
            <label>
              Buyer Email
              <Info
                size={14}
                className="info-icon"
                onMouseEnter={() => setShowTooltip('buyerEmail')}
                onMouseLeave={() => setShowTooltip(null)}
              />
              {showTooltip === 'buyerEmail' && (
                <div className="tooltip">{tooltips.buyerEmail}</div>
              )}
            </label>
            <input
              type="email"
              name="buyerEmail"
              value={formData.buyerEmail}
              onChange={handleInputChange}
              onBlur={() => handleBlur('buyerEmail')}
              placeholder="buyer@company.com"
              className={errors.buyerEmail ? 'error' : ''}
            />
            {errors.buyerEmail && <span className="error-message">{errors.buyerEmail}</span>}
          </div>

          <div className="form-field">
            <label>Buyer Phone</label>
            <input
              type="tel"
              name="buyerPhone"
              value={formData.buyerPhone}
              onChange={handleInputChange}
              onBlur={() => handleBlur('buyerPhone')}
              placeholder="+1-234-567-8900"
              className={errors.buyerPhone ? 'error' : ''}
            />
            {errors.buyerPhone && <span className="error-message">{errors.buyerPhone}</span>}
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="form-section">
        <div className="section-header">
          <h3>Shipping & Billing Addresses</h3>
          <div className="section-line"></div>
        </div>

        <div className="form-grid form-grid-2">
          <div className="form-field">
            <label>Shipping Address *</label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              onBlur={() => handleBlur('shippingAddress')}
              rows="4"
              placeholder="Enter complete shipping address with street, city, state, ZIP, country"
              className={errors.shippingAddress ? 'error' : ''}
            />
            {errors.shippingAddress && <span className="error-message">{errors.shippingAddress}</span>}
          </div>

          <div className="form-field">
            <label>Billing Address *</label>
            <textarea
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              onBlur={() => handleBlur('billingAddress')}
              rows="4"
              placeholder="Enter complete billing address with street, city, state, ZIP, country"
              className={errors.billingAddress ? 'error' : ''}
            />
            {errors.billingAddress && <span className="error-message">{errors.billingAddress}</span>}
          </div>
        </div>
      </div>

      {/* Line Items Section */}
      <div className="form-section">
        <div className="section-header">
          <h3>Order Line Items</h3>
          <div className="section-line"></div>
        </div>

        <div className="items-table">
          <table>
            <thead>
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th style={{ width: '20%' }}>Item Name *</th>
                <th style={{ width: '25%' }}>Description</th>
                <th style={{ width: '10%' }}>Quantity *</th>
                <th style={{ width: '12%' }}>UOM</th>
                <th style={{ width: '12%' }}>Unit Price *</th>
                <th style={{ width: '10%' }}>Taxable</th>
                <th style={{ width: '12%' }}>Total</th>
                <th style={{ width: '5%' }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      placeholder="Item name"
                      className={errors[`item_${index}_name`] ? 'error' : ''}
                    />
                    {errors[`item_${index}_name`] && (
                      <span className="error-message-inline">{errors[`item_${index}_name`]}</span>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      min="0"
                      step="0.01"
                      placeholder="0"
                      className={errors[`item_${index}_quantity`] ? 'error' : ''}
                    />
                    {errors[`item_${index}_quantity`] && (
                      <span className="error-message-inline">{errors[`item_${index}_quantity`]}</span>
                    )}
                  </td>
                  <td>
                    <select
                      value={item.uom}
                      onChange={(e) => handleItemChange(index, 'uom', e.target.value)}
                    >
                      <option value="Units">Units</option>
                      <option value="Pieces">Pieces</option>
                      <option value="Box">Box</option>
                      <option value="Carton">Carton</option>
                      <option value="Kg">Kilogram</option>
                      <option value="Lbs">Pounds</option>
                      <option value="Meters">Meters</option>
                      <option value="Feet">Feet</option>
                      <option value="Liters">Liters</option>
                      <option value="Gallons">Gallons</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className={errors[`item_${index}_price`] ? 'error' : ''}
                    />
                    {errors[`item_${index}_price`] && (
                      <span className="error-message-inline">{errors[`item_${index}_price`]}</span>
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.taxable}
                      onChange={(e) => handleItemChange(index, 'taxable', e.target.checked)}
                      className="checkbox-input"
                    />
                  </td>
                  <td>
                    <strong>${calculateItemTotal(item).toFixed(2)}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="btn-icon-danger"
                      disabled={items.length === 1}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="button" onClick={addItem} className="btn btn-secondary btn-add-item">
            <Plus size={18} />
            Add Line Item
          </button>
        </div>

        {/* Totals Summary */}
        <div className="totals-section">
          <div className="totals-grid">
            <div className="total-row">
              <span>Subtotal:</span>
              <strong>${calculateSubtotal().toFixed(2)}</strong>
            </div>
            <div className="total-row">
              <span>Tax ({formData.taxRate}%):</span>
              <strong>${calculateTax().toFixed(2)}</strong>
            </div>
            <div className="total-row">
              <span>Discount ({formData.discountPercent}%):</span>
              <strong className="discount">-${calculateDiscount().toFixed(2)}</strong>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <strong>${parseFloat(formData.shippingCost || 0).toFixed(2)}</strong>
            </div>
            <div className="total-row total-final">
              <span>TOTAL AMOUNT:</span>
              <strong className="total-amount">{formData.currency} ${calculateTotal().toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Special Instructions Section */}
      <div className="form-section">
        <div className="section-header">
          <h3>Special Instructions & Notes</h3>
          <div className="section-line"></div>
        </div>

        <div className="form-field">
          <label>Special Instructions</label>
          <textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleInputChange}
            rows="5"
            placeholder="Enter any special instructions, delivery requirements, or additional notes..."
          />
        </div>
      </div>

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="validation-summary">
          <AlertCircle size={20} />
          <div>
            <strong>Please correct the following errors:</strong>
            <ul>
              {Object.values(errors).filter(Boolean).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="form-actions">
        <button type="button" className="btn btn-secondary btn-large" onClick={() => navigate('/purchase-orders')}>
          <X size={20} />
          Cancel & Return
        </button>
        <button type="submit" className="btn btn-success btn-large">
          <Save size={20} />
          {mode === 'create' ? 'Create Purchase Order' : 'Update Purchase Order'}
        </button>
      </div>
    </form>
  )
}

export default POForm
