import React, { ChangeEvent, FormEvent, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUsers, register } from '../../redux/slices/products/UsersSlice';
import {useEffect} from 'react'
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';


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

    //Validation
    const [firstNameError,setFirstNameError] = useState({msg:'' , error:false})
    const [lastNameError,setLastNameError] = useState({msg:'' , error:false})
    const [emailError,setEmailError] = useState({msg:'' , error:false})
    const [passwordError,setPassowrdError] = useState({msg:'' , error:false})

    const [user, setUser] = useState(initialState)

    const {users} = useSelector((state : RootState)=> state.usersReducer)
    const dispatch:AppDispatch = useDispatch()

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(fetchUsers())
    },[])

    const handleRegister = (event : FormEvent)=>{
        event.preventDefault();
        //Validation
        if(user.firstName.length < 3){
            setFirstNameError({msg:'First name must be at least 3 characters.' , error:true})
        }else{
            setFirstNameError({msg:'' , error:false})
        }

        if(user.lastName.length < 3){
            setLastNameError({msg:'Last name must be at least 3 characters.' , error:true})
        }else{
            setLastNameError({msg:'' , error:false})
        }

        //Check if the user exist
        if(isExistUser()){
            setEmailError({msg:'Email already exists, try another one.' , error:true})
        }else{
            setEmailError({msg:'' , error:false})
        }

        if(user.password.length < 8){
            setPassowrdError({msg:'Password must be at least 8 characters', error:true})
        }else{
            setPassowrdError({msg:'',error:false})
        }

        if( (!firstNameError.error) && (!lastNameError.error) && (!emailError.error) && (!passwordError.error) ){
            const newId = users.length+1;
            const newUser = {id: newId , ...user} 
            dispatch(register(newUser))
        }else{
            return
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
        <ToastContainer/>
    <div className='register__container'>
    <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control placeholder="Enter First Name" name='firstName' value={user.firstName} onChange={handleChange} required/>
        <p className='validation-msg'>{firstNameError.msg}</p>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control placeholder="Enter Last Name" name='lastName' value={user.lastName} onChange={handleChange} required/>
        <p className='validation-msg'>{lastNameError.msg}</p>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter User Email" type="email" name='email' value={user.email} onChange={handleChange} required/>
        <p className='validation-msg'>{emailError.msg}</p>
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Enter Password" type='password' name='password' value={user.password} onChange={handleChange} required/>
        <p className='validation-msg'>{passwordError.msg}</p>
    </Form.Group>
        <div className='register__btn'>
            <Button type="submit" onClick={handleRegister}>Register</Button>
        </div>
    </div>
    </div>
  )
}
