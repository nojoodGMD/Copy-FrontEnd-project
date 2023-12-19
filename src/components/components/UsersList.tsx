import React, { useEffect, ChangeEvent } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {fetchUsers,searchUser,deleteUser,blockUser} from '../../redux/slices/products/UsersSlice'
import SearchingItem from './SearchingItem'
import { ToastContainer, toast } from 'react-toastify'
import Image from 'react-bootstrap/Image';

export default function UsersList() {
  const { users, searchTerm } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch()
  useEffect(  () => {
      dispatch(fetchUsers())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUser(event.target.value))
  }

  const searchedUser = searchTerm
    ? users.filter((user) =>
        user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : users

  const hanleDelete = async (_id: string) => {
    try{
      const response = await deleteUser(_id)
      await dispatch(fetchUsers())
      toast.success(response.data.message)
    }catch(error) {
      toast.error(error)
    }

  }

  const hanleBlock = (id: string) => {
    dispatch(blockUser(id))
    toast.success('Status changed successfully!')
  }

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="admin__container">
        <AdminSidebar />
        <div className="admin__main-content">
          <h2>List of Users</h2>
          <SearchingItem searchTerm={searchTerm} handleSeach={handleSearch} />
          <section className="products">
            {searchedUser.length > 0 &&
              searchedUser.map((user) => {
                if (user.isAdmin === false) {
                  return (
                    <div key={user._id}>
                      <Card className="m-1">
                        <Card.Header as="h5">User Details</Card.Header>
                        <Card.Body>
                          <Image src={`http://localhost:3002/${user.image}`} className='user-profile-pic' rounded />
                          <Card.Text>User Name: {user.name}</Card.Text>
                          <Card.Text>User Email: {user.email}</Card.Text>
                          <Card.Text>User Phone Number: {user.phone}</Card.Text>
                          <Button variant="primary" onClick={() => hanleBlock(user._id)}>
                            {user.isBanned ? 'Unblock' : 'Block'}
                          </Button>
                          <Button
                            variant="primary"
                            className="home__btn"
                            onClick={() => hanleDelete(user._id)}>
                            Delete
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  )
                }
              })}
          </section>
        </div>
      </div>
    </div>
  )
}
