import React, { ChangeEvent, FormEvent, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate, useNavigation} from 'react-router-dom'

export default function Login() {


  const navigate = useNavigate();
  const [user, setUser] = useState({email:'',password:''})

  const handleSubmit = async(event:FormEvent)=>{
    event.preventDefault();
    console.log(user)
      //1.  get the user data who want to login
      //2. match the data with the existed users
      //3. if match then update isLogin State
      //route protection: check is userllogin, and user role
      
   
  }

  const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{
    setUser((prevState)=>{
      return {...prevState, [event.target.name]:event.target.value}
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" placeholder='Enter email' value={user.email} onChange={handleChange} />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" placeholder='Enter password' value={user.password} onChange={handleChange}/>
      <button type='submit'>Login</button>
    </form>
  )
}
