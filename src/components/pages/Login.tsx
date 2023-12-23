import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
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
   

    // // use satabase service here
    // const foundUser = users.find(
    //   (userData) => userData.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()
    // )
    // if (foundUser && foundUser.password === user.password && !foundUser.isBanned) {
    //   dispatch(login(foundUser))
    //   navigate('/')
    // } else {
    //   if (foundUser?.isBanned) {
    //     toast.error('Your account is blocked, contact the admin.')
    //   } else {
    //     toast.info('Something wrong with email or password')
    //   }
    // }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
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
          <div className="login-form__btn">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
