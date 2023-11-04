import React, { useEffect,ChangeEvent } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/slices/products/productSlice'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { fetchCategory } from '../../redux/slices/products/CategoriesSlice'
import { fetchUsers, searchUser,deleteUser,blockUser } from '../../redux/slices/products/UsersSlice'
import SearchingItem from './SearchingItem'
import { ToastContainer, toast } from 'react-toastify'


export default function UsersList() {

const {error , isLoading , users, searchTerm, blocked} = useSelector((state : RootState) => state.usersReducer);  


const dispatch: AppDispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchUsers())
},[])

console.log(users)


const handleSearch =(event:ChangeEvent<HTMLInputElement>)=>{
  dispatch(searchUser(event.target.value))
} 

const searchedUser = searchTerm ? users.filter((user)=> 
user.firstName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
: users;

const hanleDelete =(id:number)=>{
  dispatch(deleteUser(id));
  toast.success("User deleted successfully!");
}

const hanleBlock =(id:number)=>{
  dispatch(blockUser(id));
  toast.success("Status changed successfully!");
}




console.log(isLoading)

  return (
    <div className="main-container">
    <ToastContainer />
    <div className='admin__container'>
    <AdminSidebar/>
    <div className='admin__main-content'>
    
    <h2>List of Users</h2>
    <SearchingItem searchTerm={searchTerm} handleSeach={handleSearch}/>
    <section className='products'>
      {searchedUser.length > 0 && searchedUser.map((user)=>{
        if(user.role==='visitor'){
        return(
          <div key={user.id}>
            <Card className='m-1'>
            <Card.Header as="h5">User Details</Card.Header>
      <Card.Body>
        <Card.Text>
          Full Name: {user.firstName +" " +user.lastName}
        </Card.Text>
        <Card.Text>
        User Email: {user.email}
        </Card.Text>
        <Card.Text>
        User id: {user.id}
        </Card.Text>
        <Button variant="primary" onClick={()=>hanleBlock(user.id)}>{user.blocked ? "Unblock" : "Block"}</Button>
        <Button variant="primary" className='home__btn' onClick={()=>hanleDelete(user.id)}>Delete</Button>
      </Card.Body>
    </Card>
          </div>
        )}
      })}
    </section>

    </div>
  </div>
  </div>
  )
}
