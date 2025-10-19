import { useParams } from 'react-router-dom'
import SOForm from '../components/SalesOrder/SOForm'
import { salesOrders } from '../data/dummyData'

const EditSO = () => {
  const { id } = useParams()
  const existingSO = salesOrders.find(so => so.id === id)

  if (!existingSO) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Sales Order Not Found</h2>
        <p>The sales order with ID "{id}" could not be found.</p>
      </div>
    )
  }

  return (
    <div className="edit-so-page">
      <SOForm existingSO={existingSO} mode="edit" />
    </div>
  )
}

export default EditSO
