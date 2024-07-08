import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector} from "react-redux";
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import {  useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice'; // when we register, we want them to be logged in after. 
import {toast} from 'react-toastify';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const  dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading} ] = useRegisterMutation();

    const {userInfo} = useSelector((state)=>state.auth);

    const {search} =useLocation();
    const sp = new URLSearchParams(search); // sp - search param
    const redirect = sp.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    },[userInfo, redirect, navigate]);
    
    const submitHandler =  async (e)=>{
        e.preventDefault();

        if(password!==confirmPassword){
            toast.error('Passwords Dont Match');
            return;
        } else{
            try {
                const res = await register({name, email, password}).unwrap(); // using console log see what it will happen without unwrap. 
                dispatch(setCredentials({...res}));
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message ||err.error)
                
            }
        }                                
    };


return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type = 'text'
                    placeholder ='Enter Name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type = 'email'
                    placeholder ='Enter Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type = 'password'
                    placeholder ='Enter Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type = 'password'
                    placeholder ='Confirm Password'
                    value={confirmPassword} // the state value confirmPassword
                    onChange={(e)=>setConfirmPassword(e.target.value)} // the state setting of setConfirmPassword
                ></Form.Control>
            </Form.Group>
            <Button
                type='submit'
                variant='primary'
                className='mt-2'
                disabled={isLoading}>
                Register
            </Button>
            {isLoading && <Loader/>}
            <Row className='py-3'>
                <Col>
                    Already have an account? <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
                </Col>
            </Row>
        </Form>
    </FormContainer>
  )
}

export default RegisterScreen;