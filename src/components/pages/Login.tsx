import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUsers, login } from '../../redux/slices/products/UsersSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
      const foundUser = users.find(userData => userData.email.toLocaleLowerCase() === user.email.toLocaleLowerCase());
      if(foundUser && foundUser.password === user.password && !foundUser.blocked){
        // logged in
        dispatch(login(foundUser))
        navigate("/");
      }else{
        if(foundUser?.blocked){
          alert('Your account us blocked, contact the admin.')
        }else{
          alert('Something wrong with email or password')
        }
      }
      
    
   
  }

  const handleChange = (event:ChangeEvent<HTMLInputElement>)=>{
    console.log(event.target.name)
    setUser((prevState)=>{
      return {...prevState, [event.target.name]:event.target.value}
    })
  }

  return (
    <div className="main-container">
    <div className='login-form'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" value={user.email} onChange={handleChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange}/>
      </Form.Group>
      <div className='login-form__btn'>
      <Button variant="primary" type="submit" >
        Login
      </Button>
      </div>
    </Form>
    </div>
    </div>
  )
}
