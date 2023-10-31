import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUsers, login } from '../../redux/slices/products/UsersSlice';



export default function Login() {


  const navigate = useNavigate();
  const [user, setUser] = useState({email:'',password:''})

  const {users} = useSelector((state : RootState)=> state.usersReducer)
  const dispatch:AppDispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchUsers())
  },[])


  const handleSubmit = async(event:FormEvent)=>{
    event.preventDefault();
      const foundUser = users.find(userData => userData.email === user.email);
      if(foundUser && foundUser.password === user.password){
        // logged in
        dispatch(login(foundUser))
        navigate("/");
      }else{
        alert('Something wrong with email or password')
      }
      
    
   
  }

  const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{
    setUser((prevState)=>{
      return {...prevState, [event.target.name]:event.target.value}
    })
  }

  return (
    <form onSubmit={handleSubmit}  >
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" placeholder='Enter email' value={user.email} onChange={handleChange} />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" placeholder='Enter password' value={user.password} onChange={handleChange}/>
      <button type='submit' >Login</button>
    </form>
  )
}
