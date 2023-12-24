import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { fetchUsers, login } from '../../redux/slices/products/UsersSlice'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { toast, ToastContainer } from 'react-toastify'

export default function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })

  // const { users } = useSelector((state: RootState) => state.usersReducer)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()
      if(user.email==='' || user.password===''){
        toast.error('Please enter both your email and password.')
        return
      }
      const response = await dispatch(login(user))
      toast.success(response.payload.message)
      navigate('/')
    } catch (error) {
      toast.info('Something went wrong, try again.')
      console.log(error)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  const handleForgetPassword = ()=>{
    navigate('/forgotPassword')
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
              value={user.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="login-form__btns">
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="primary" onClick={handleForgetPassword}>
              Forgot Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
