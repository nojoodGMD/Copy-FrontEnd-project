import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers, forgotPassword } from '../../redux/slices/products/UsersSlice'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { toast, ToastContainer } from 'react-toastify'

export default function ForgotPassword() {
  const [emailVal, setEmail] = useState({ email: '' })

  // const { users } = useSelector((state: RootState) => state.usersReducer)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  const checkEmail = () => {
    if (emailVal.email === '') {
      toast.info('Please write the email address in the box.')
      return false
    }
    const validEmail = emailVal.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      if(!validEmail){
        toast.info('Please enter a valid email address')
        return false
      }
      return true
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const isEmailGood = checkEmail()
    if(isEmailGood){
        const response = await forgotPassword(emailVal)
        setEmail({email:''})
        toast.success(response.data.message)
    }
  }

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={emailVal.email}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="login-form__btns">
            <Button variant="primary" type="submit">
              Reset password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
