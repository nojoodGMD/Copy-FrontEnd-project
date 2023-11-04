import React, { ChangeEvent, FormEvent, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUsers, register } from '../../redux/slices/products/UsersSlice';
import {useEffect} from 'react'
import { useAsyncValue, useNavigate } from 'react-router-dom';


export default function Register() {

    // Steps:
    // 1. get user info and save it in state - DONE
    // 2. send data to userSlice/reducer - DONE
    // 3. edit the id of the user in the userSlice - DONE
    // 4. add the data in the JSON file of users
    // Extra: check if the password matchs itslef when repeated

    const initialState={
        // id will be added in the dispatch
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        role:'visitor',
        blocked:false
    }

    const [user, setUser] = useState(initialState)

    const {users} = useSelector((state : RootState)=> state.usersReducer)
    const dispatch:AppDispatch = useDispatch()

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(fetchUsers())
    },[])

    const handleRegister = (event : FormEvent)=>{
        event.preventDefault();
        if(isExistUser()){
            alert("User already exist, try another email.")
        }else{
            const newId = users.length+1;
            const newUser = {id: newId , ...user} 
            dispatch(register(newUser))
            navigate('/login')
        }  
    }

    const isExistUser=()=>{
        const isExist = users.find((userData)=> userData.email === user.email);
        return isExist;
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>)=>{
        const {name ,value} = event.target;
        setUser({...user, [name]:value})
    }

  return (
    <div className="main-container">
    <div className='register__container'>
    <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control placeholder="Enter First Name" name='firstName' value={user.firstName} onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control placeholder="Enter Last Name" name='lastName' value={user.lastName} onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter User Email" type="email" name='email' value={user.email} onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Enter User Name" type='password' name='password' value={user.password} onChange={handleChange} />
    </Form.Group>
    {/* <Form.Group className="mb-3">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control placeholder="Enter User Name" type='password' name='checkPassword' onChange={handleCheckPassword} />
    </Form.Group> */}
        <div className='register__btn'>
            <Button type="submit" onClick={handleRegister}>Register</Button>
        </div>
    </div>
    </div>
  )
}
