import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function SignupPage() {
  return (
    <div>
        <NavBar />
        <h1>Signup</h1>
        <Form>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Jane"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="me@example.com"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder=""/>
            </Form.Group>
            <Button type="submit">Create Account</Button>
        </Form>
        <p>Already have an account? Login <Link to="/login">here</Link> </p>
    </div>
  )
}
