import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'

import { resetPassword } from '../../redux/slices/products/UsersSlice'

export default function ResetPassword() {
  const { token } = useParams()
  const nav = useNavigate()

  const [updatedData, setUpdatedData] = useState({ token: token, password: '' })

  const handleUpdatePassword = async (event: FormEvent) => {
    event.preventDefault()
    try {
      const response = await resetPassword(updatedData)
      toast.success(response?.data.message)
      nav('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
    console.log(updatedData)
  }

  return (
    <div className="main-container">
      <div className="login-form">
        <Form onSubmit={handleUpdatePassword}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter the new password value"
              value={updatedData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="login-form__btns">
            <Button variant="primary" type="submit">
              Reset Passeword
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
