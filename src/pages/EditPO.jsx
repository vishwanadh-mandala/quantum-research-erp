import { useParams } from 'react-router-dom'
import POForm from '../components/PurchaseOrder/POForm'
import { purchaseOrders } from '../data/dummyData'

const EditPO = () => {
  const { id } = useParams()
  const existingPO = purchaseOrders.find(po => po.id === id)

  if (!existingPO) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Purchase Order Not Found</h2>
        <p>The purchase order with ID "{id}" could not be found.</p>
      </div>
    )
  }

  return (
    <div className="edit-po-page">
      <POForm existingPO={existingPO} mode="edit" />
    </div>
  )
}

export default EditPO
