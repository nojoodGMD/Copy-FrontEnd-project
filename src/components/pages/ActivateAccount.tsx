import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { activateUser } from '../../redux/slices/products/UsersSlice'

export default function ActivateAccount() {
  const { token } = useParams()
  const nav = useNavigate()

  const handleActivate = async () => {
    try {
      const response = await activateUser(String(token))
      toast.success(response.message)
      nav('/login')
    } catch (error) {
      nav(`/users/error-activate/${error.response.data.msg}`)
    }
  }

  return (
    <div className="main-container">
      <div className="activation-content">
        <h1 className="activation-msg">One Last step!</h1>
        <Button variant="primary" size="lg" active onClick={handleActivate}>
          Click to Activate Your Account
        </Button>
      </div>
    </div>
  )
}
