import React, { ChangeEvent, FormEvent, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers, createUser } from '../../redux/slices/products/UsersSlice'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default function Register() {
  const initialState = {
    name: '',
    email: '',
    password: '',
    image: '',
    phone: ''
  }

  //Validation
  const [nameError, setNameError] = useState({ msg: '', error: false })
  const [emailError, setEmailError] = useState({ msg: '', error: false })
  const [passwordError, setPassowrdError] = useState({ msg: '', error: false })
  const [phoneError, setPhoneError] = useState({ msg: '', error: false })

  const [user, setUser] = useState(initialState)

  const { users } = useSelector((state: RootState) => state.usersReducer)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleRegister = async (event: FormEvent) => {
    try {
      event.preventDefault()

      //handle registration with the form-data, pass the field name and the value
      const formData = new FormData()
      formData.append('name', user.name)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('image', user.image)
      formData.append('phone', user.phone)

      //Validation
      if (user.name.length < 3) {
        setNameError({ msg: 'Name must be at least 3 characters.', error: true })
      } else {
        setNameError({ msg: '', error: false })
      }

      if (isExistUser()) {
        setEmailError({ msg: 'Email already exists, try another one.', error: true })
      } else {
        setEmailError({ msg: '', error: false })
      }

      if (user.password.length < 8) {
        setPassowrdError({ msg: 'Password must be at least 8 characters', error: true })
      } else {
        setPassowrdError({ msg: '', error: false })
      }

      if (user.phone.length !== 10) {
        setPhoneError({ msg: 'Phone number lenght must be equal to 10', error: true })
      } else {
        setPhoneError({ msg: '', error: false })
      }

      if (!nameError.error && !emailError.error && !passwordError.error && !phoneError.error) {
        const response = await createUser(formData)
        toast.info(response.data.message)
        setUser(initialState)
      } else {
        return
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const isExistUser = () => {
    const isExist = users.find((userData) => userData.email === user.email)
    return isExist
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // process the image uploading
    if (event.target.type === 'file') {
      setUser({ ...user, [event.target.name]: event.target.files?.[0] })
    } else {
      const { name, value } = event.target
      setUser({ ...user, [name]: value })
    }
  }

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="register__container">
        <Form.Group className="mb-3">
          <Form.Label>User Name<span style={{color:'crimson'}}>*</span></Form.Label>
          <Form.Control
            placeholder="Enter User Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <p className="validation-msg">{nameError.msg}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email<span style={{color:'crimson'}}>*</span></Form.Label>
          <Form.Control
            placeholder="Enter User Email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <p className="validation-msg">{emailError.msg}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password<span style={{color:'crimson'}}>*</span></Form.Label>
          <Form.Control
            placeholder="Enter Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <p className="validation-msg">{passwordError.msg}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number<span style={{color:'crimson'}}>*</span></Form.Label>
          <Form.Control
            placeholder="Enter Phone Number"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
          <p className="validation-msg">{phoneError.msg}</p>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Profile Phoro (Optional)</Form.Label>
          <Form.Control
            placeholder="Enter Phone Number"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <div className="register__btn">
          <Button type="submit" onClick={handleRegister}>
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}
