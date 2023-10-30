import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchProducts } from '../../redux/slices/products/productSlice'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { fetchCategory } from '../../redux/slices/products/CategoriesSlice'
import { fetchUsers } from '../../redux/slices/products/UsersSlice'

export default function UsersList() {

const {error , isLoading , users} = useSelector((state : RootState) => state.usersReducer);  

const dispatch: AppDispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchUsers())
},[])

if(isLoading){
  return <p>Loading ...</p>
}

if(error){
  return <p>{error}</p>
}


  return (
    <div className='admin__container'>
    <AdminSidebar/>
    <div className='admin__main-content'>
    
    <h2>List of Users</h2>
    <section className='products'>
      {users.length > 0 && users.map((user)=>{
        return(
          <div key={user.id}>
            <h4>User details</h4>
            <p>Full Name: {user.firstName +" " +user.lastName}</p>
            <p>User Email: {user.email}</p>
            <p>User role: {user.role}</p>
            <button>Block</button>
          </div>
        )
      })}
    </section>

    </div>
  </div>
  )
}
