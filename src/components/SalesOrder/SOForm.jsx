import { useState } from 'react'
import { Save, X, Plus, Trash2, AlertCircle, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { companies } from '../../data/dummyData'
import PageBanner from '../Branding/PageBanner'
import '../../styles/FormStyles.css'
import './SOForm.css'

const SOForm = ({ existingSO = null, mode = 'create' }) => {
  const navigate = useNavigate()
  const [showTooltip, setShowTooltip] = useState(null)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const [formData, setFormData] = useState({
    soNumber: existingSO?.id || '',
    customer: existingSO?.customer || '',
    orderDate: existingSO?.orderDate || new Date().toISOString().split('T')[0],
    deliveryDate: existingSO?.deliveryDate || '',
    priority: existingSO?.priority || 'Medium',
    status: existingSO?.status || 'Pending',
    paymentStatus: existingSO?.paymentStatus || 'Pending',
    paymentTerms: existingSO?.paymentTerms || 'Net 30',
    currency: existingSO?.currency || 'USD',
    shippingMethod: existingSO?.shippingMethod || 'Standard',
    salesRep: existingSO?.salesRep || '',
    salesRepEmail: existingSO?.salesRepEmail || '',
    salesRepPhone: existingSO?.salesRepPhone || '',
    customerPO: existingSO?.customerPO || '',
    quotationRef: existingSO?.quotationRef || '',
    department: existingSO?.department || '',
    projectName: existingSO?.projectName || '',
    shippingAddress: existingSO?.shippingAddress || '',
    billingAddress: existingSO?.billingAddress || '',
    specialInstructions: existingSO?.specialInstructions || '',
    incoterms: existingSO?.incoterms || 'FOB',
    taxRate: existingSO?.taxRate || '0',
    discountPercent: existingSO?.discountPercent || '0',
    shippingCost: existingSO?.shippingCost || '0',
    warrantyPeriod: existingSO?.warrantyPeriod || '12 months',
    deliveryTerms: existingSO?.deliveryTerms || '',
  })

  const [items, setItems] = useState(existingSO?.items || [
    { id: 1, name: '', description: '', quantity: '', unitPrice: '', uom: 'Units', taxable: true, discount: '0' }
  ])

  const validateField = (name, value) => {
    switch (name) {
      case 'customer':
        return value.trim() === '' ? 'Customer is required' : ''
      case 'orderDate':
        return value === '' ? 'Order date is required' : ''
      case 'deliveryDate':
        if (value === '') return 'Delivery date is required'
        if (new Date(value) <= new Date(formData.orderDate)) {
          return 'Delivery date must be after order date'
        }
        return ''
      case 'salesRep':
        return value.trim() === '' ? 'Sales representative is required' : ''
      case 'salesRepEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Invalid email format'
        }
        return ''
      case 'salesRepPhone':
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
      taxable: true,
      discount: '0'
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
    const discount = parseFloat(item.discount) || 0
    const subtotal = qty * price
    return subtotal - (subtotal * discount / 100)
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
      alert(`Sales Order ${mode === 'create' ? 'Created' : 'Updated'} Successfully!\n\nSO Total: $${calculateTotal().toLocaleString()}`)
      navigate('/sales-orders')
    } else {
      alert('Please fix all validation errors before submitting')
    }
  }

  const tooltips = {
    soNumber: 'Unique sales order identifier',
    customer: 'Select the customer for this sale',
    salesRep: 'Sales representative handling this order',
    customerPO: 'Customer purchase order reference number',
    quotationRef: 'Reference to the original quotation',
    warrantyPeriod: 'Product warranty duration',
    deliveryTerms: 'Specific delivery requirements and terms',
  }

  return (
    <div className="so-form-container">
      <PageBanner
        title={mode === 'create' ? 'Create New Sales Order' : 'Edit Sales Order'}
        subtitle="Fill in all required fields marked with *"
        variant="success"
      >
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/sales-orders')}>
          <X size={18} />
          Cancel
        </button>
        <button type="submit" form="so-form" className="btn btn-success">
          <Save size={18} />
          Save Sales Order
        </button>
      </PageBanner>

      <form id="so-form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <div className="section-header">
            <h3>Basic Information</h3>
            <div className="section-line"></div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>
                SO Number
                <Info size={14} className="info-icon" onMouseEnter={() => setShowTooltip('soNumber')} onMouseLeave={() => setShowTooltip(null)} />
                {showTooltip === 'soNumber' && <div className="tooltip">{tooltips.soNumber}</div>}
              </label>
              <input
                type="text"
                name="soNumber"
                value={formData.soNumber}
                onChange={handleInputChange}
                placeholder="Auto-generated if left blank"
                className={errors.soNumber ? 'error' : ''}
              />
              {errors.soNumber && <span className="error-message">{errors.soNumber}</span>}
            </div>

            <div className="form-field">
              <label>
                Customer *
                <Info size={14} className="info-icon" onMouseEnter={() => setShowTooltip('customer')} onMouseLeave={() => setShowTooltip(null)} />
                {showTooltip === 'customer' && <div className="tooltip">{tooltips.customer}</div>}
              </label>
              <select
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                onBlur={() => handleBlur('customer')}
                className={errors.customer ? 'error' : ''}
              >
                <option value="">-- Select Customer --</option>
                {companies.map(company => (
                  <option key={company.id} value={company.name}>{company.name}</option>
                ))}
              </select>
              {errors.customer && <span className="error-message">{errors.customer}</span>}
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
              <label>Delivery Date *</label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                onBlur={() => handleBlur('deliveryDate')}
                className={errors.deliveryDate ? 'error' : ''}
              />
              {errors.deliveryDate && <span className="error-message">{errors.deliveryDate}</span>}
            </div>

            <div className="form-field">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleInputChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="form-field">
              <label>Order Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Shipped">Shipped</option>
                <option value="Fulfilled">Fulfilled</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-field">
              <label>Payment Status</label>
              <select name="paymentStatus" value={formData.paymentStatus} onChange={handleInputChange}>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
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
          </div>
        </div>

        {/* Sales Representative Information */}
        <div className="form-section">
          <div className="section-header">
            <h3>Sales Representative Information</h3>
            <div className="section-line"></div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>
                Sales Rep Name *
                <Info size={14} className="info-icon" onMouseEnter={() => setShowTooltip('salesRep')} onMouseLeave={() => setShowTooltip(null)} />
                {showTooltip === 'salesRep' && <div className="tooltip">{tooltips.salesRep}</div>}
              </label>
              <input
                type="text"
                name="salesRep"
                value={formData.salesRep}
                onChange={handleInputChange}
                onBlur={() => handleBlur('salesRep')}
                placeholder="Enter sales representative name"
                className={errors.salesRep ? 'error' : ''}
              />
              {errors.salesRep && <span className="error-message">{errors.salesRep}</span>}
            </div>

            <div className="form-field">
              <label>Sales Rep Email</label>
              <input
                type="email"
                name="salesRepEmail"
                value={formData.salesRepEmail}
                onChange={handleInputChange}
                onBlur={() => handleBlur('salesRepEmail')}
                placeholder="salesrep@quantumresearch.com"
                className={errors.salesRepEmail ? 'error' : ''}
              />
              {errors.salesRepEmail && <span className="error-message">{errors.salesRepEmail}</span>}
            </div>

            <div className="form-field">
              <label>Sales Rep Phone</label>
              <input
                type="tel"
                name="salesRepPhone"
                value={formData.salesRepPhone}
                onChange={handleInputChange}
                onBlur={() => handleBlur('salesRepPhone')}
                placeholder="+1-234-567-8900"
                className={errors.salesRepPhone ? 'error' : ''}
              />
              {errors.salesRepPhone && <span className="error-message">{errors.salesRepPhone}</span>}
            </div>

            <div className="form-field">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleInputChange}>
                <option value="">-- Select Department --</option>
                <option value="Sales">Sales & Marketing</option>
                <option value="Enterprise">Enterprise Sales</option>
                <option value="Retail">Retail Sales</option>
                <option value="Online">Online Sales</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reference & Project Details */}
        <div className="form-section">
          <div className="section-header">
            <h3>Reference & Project Details</h3>
            <div className="section-line"></div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>
                Customer PO Number
                <Info size={14} className="info-icon" onMouseEnter={() => setShowTooltip('customerPO')} onMouseLeave={() => setShowTooltip(null)} />
                {showTooltip === 'customerPO' && <div className="tooltip">{tooltips.customerPO}</div>}
              </label>
              <input
                type="text"
                name="customerPO"
                value={formData.customerPO}
                onChange={handleInputChange}
                placeholder="Customer's PO number"
              />
            </div>

            <div className="form-field">
              <label>
                Quotation Reference
                <Info size={14} className="info-icon" onMouseEnter={() => setShowTooltip('quotationRef')} onMouseLeave={() => setShowTooltip(null)} />
                {showTooltip === 'quotationRef' && <div className="tooltip">{tooltips.quotationRef}</div>}
              </label>
              <input
                type="text"
                name="quotationRef"
                value={formData.quotationRef}
                onChange={handleInputChange}
                placeholder="e.g., QUOTE-2024-001"
              />
            </div>

            <div className="form-field">
              <label>Project Name</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Associated project name"
              />
            </div>

            <div className="form-field">
              <label>
                Warranty Period
                <Info size={14} className="info-icon" onMouseEnter={() => setShowTooltip('warrantyPeriod')} onMouseLeave={() => setShowTooltip(null)} />
                {showTooltip === 'warrantyPeriod' && <div className="tooltip">{tooltips.warrantyPeriod}</div>}
              </label>
              <select name="warrantyPeriod" value={formData.warrantyPeriod} onChange={handleInputChange}>
                <option value="No Warranty">No Warranty</option>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
                <option value="12 months">12 Months</option>
                <option value="24 months">24 Months</option>
                <option value="36 months">36 Months</option>
                <option value="Lifetime">Lifetime Warranty</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial Terms */}
        <div className="form-section">
          <div className="section-header">
            <h3>Financial Terms</h3>
            <div className="section-line"></div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Payment Terms</label>
              <select name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange}>
                <option value="Net 15">Net 15 Days</option>
                <option value="Net 30">Net 30 Days</option>
                <option value="Net 45">Net 45 Days</option>
                <option value="Net 60">Net 60 Days</option>
                <option value="Immediate">Immediate Payment</option>
                <option value="COD">Cash on Delivery</option>
                <option value="Advance">Advance Payment</option>
              </select>
            </div>

            <div className="form-field">
              <label>Incoterms</label>
              <select name="incoterms" value={formData.incoterms} onChange={handleInputChange}>
                <option value="FOB">FOB - Free on Board</option>
                <option value="CIF">CIF - Cost, Insurance & Freight</option>
                <option value="EXW">EXW - Ex Works</option>
                <option value="DDP">DDP - Delivered Duty Paid</option>
                <option value="FCA">FCA - Free Carrier</option>
              </select>
            </div>

            <div className="form-field">
              <label>Tax Rate (%)</label>
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
              <label>Discount (%)</label>
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

            <div className="form-field">
              <label>Shipping Method</label>
              <select name="shippingMethod" value={formData.shippingMethod} onChange={handleInputChange}>
                <option value="Standard">Standard Shipping</option>
                <option value="Express">Express Shipping</option>
                <option value="Overnight">Overnight</option>
                <option value="Freight">Freight</option>
                <option value="Pickup">Customer Pickup</option>
              </select>
            </div>
          </div>
        </div>

        {/* Addresses */}
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
                placeholder="Enter complete shipping address"
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
                placeholder="Enter complete billing address"
                className={errors.billingAddress ? 'error' : ''}
              />
              {errors.billingAddress && <span className="error-message">{errors.billingAddress}</span>}
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="form-section">
          <div className="section-header">
            <h3>Order Line Items</h3>
            <div className="section-line"></div>
          </div>

          <div className="items-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '4%' }}>#</th>
                  <th style={{ width: '18%' }}>Item Name *</th>
                  <th style={{ width: '22%' }}>Description</th>
                  <th style={{ width: '10%' }}>Quantity *</th>
                  <th style={{ width: '10%' }}>UOM</th>
                  <th style={{ width: '12%' }}>Unit Price *</th>
                  <th style={{ width: '8%' }}>Discount %</th>
                  <th style={{ width: '8%' }}>Taxable</th>
                  <th style={{ width: '12%' }}>Total</th>
                  <th style={{ width: '4%' }}></th>
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
                        type="number"
                        value={item.discount}
                        onChange={(e) => handleItemChange(index, 'discount', e.target.value)}
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="0"
                      />
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

          {/* Totals */}
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

        {/* Special Instructions */}
        <div className="form-section">
          <div className="section-header">
            <h3>Delivery Terms & Special Instructions</h3>
            <div className="section-line"></div>
          </div>

          <div className="form-grid form-grid-2">
            <div className="form-field">
              <label>
                Delivery Terms
                <Info size={14} className="info-icon" onMouseEnter={() => setShowTooltip('deliveryTerms')} onMouseLeave={() => setShowTooltip(null)} />
                {showTooltip === 'deliveryTerms' && <div className="tooltip">{tooltips.deliveryTerms}</div>}
              </label>
              <textarea
                name="deliveryTerms"
                value={formData.deliveryTerms}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter specific delivery requirements..."
              />
            </div>

            <div className="form-field">
              <label>Special Instructions</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter any special instructions or notes..."
              />
            </div>
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
          <button type="button" className="btn btn-secondary btn-large" onClick={() => navigate('/sales-orders')}>
            <X size={20} />
            Cancel & Return
          </button>
          <button type="submit" className="btn btn-success btn-large">
            <Save size={20} />
            {mode === 'create' ? 'Create Sales Order' : 'Update Sales Order'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SOForm
