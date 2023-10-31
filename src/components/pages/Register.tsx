import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Register() {
  return (
    <>
    <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control placeholder="Enter First Name"  />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control placeholder="Enter Last Name"  />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter User Email" type="email"  />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Enter User Name" type='password' />
    </Form.Group>
    <Form.Group className="mb-3">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control placeholder="Enter User Name" type='password' />
    </Form.Group>
        <Button type="submit" >Register</Button>
    </>
  )
}
