import { useEffect, useState } from 'react'
import UserSidebar from './UserSidebar'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers, updateUser } from '../../redux/slices/products/UsersSlice'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify'

export default function UserProfile() {
  const { userData } = useSelector((state: RootState) => state.usersReducer)
  const dispatch: AppDispatch = useDispatch()

  const [isUpdate, setIsUpdate] = useState(false)

  const [user, setUser] = useState({
    name: userData?.name,
    email: userData?.email
  })

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleUpdate = () => {
    setIsUpdate(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsUpdate(false)
    dispatch(updateUser(user))
    toast.success('Profile Updated Successfully!')
  }

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="user__container">
        <UserSidebar />
        <div className="user__main-content">
          <div className="profile-edit">
            {isUpdate && (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={user.name}
                    name="firstName"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={user.email}
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update data
                </Button>
              </Form>
            )}
          </div>
          <div className="profile-info">
            {!isUpdate && (
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>User Profile</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>User Name: {userData?.name}</ListGroup.Item>
                  <ListGroup.Item>Email: {userData?.email}</ListGroup.Item>
                </ListGroup>
                <Button variant="primary" onClick={handleUpdate}>
                  Edit data
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
