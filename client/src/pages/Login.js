import React, { useState } from 'react';
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';


const Login = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const {data} = await axios.post("/users/login", values)
            setLoading(false);
            message.success('Login Successfull')
            localStorage.setItem("user", JSON.stringify({ ...data.user, password:""}))
            navigate('/')
            console.log(data)
        } catch (error) {
            setLoading(false)
            message.error("Something went wrong")
        }
    }


    return (
        <>
            <div className='register-page'>
                {loading && <Spinner />}
                <Form layout='vertical' onFinish={submitHandler}>
                    <h1>Login Form</h1>
                    <Form.Item label='Email' name='email'>
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type='password' />
                    </Form.Item>
                    <div className='d-flex'>
                        <Link to='/register'>Don't have an Account? Click here to Register</Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login
