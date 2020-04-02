import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();

  const [ credentials, setCredentials ] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("login pushed");
    axiosWithAuth()
    .post('/api/login', credentials)
    .then(res => {
      console.log("login response ", res);
      localStorage.setItem('token', JSON.stringify(res.data.payload))
      history.push("/bubblepage");
    })
    .catch(err => {
      console.log("login error ", err);
    });
  };

  return (
    <div className='login-wrap'>
      <form onSubmit={handleSubmit}>
                <label htmlFor='username'/>
                <input
                name='username'
                id='username'
                type='text'
                placeholder='username'
                value={credentials.username}
                onChange={handleChange}
                />

                <label htmlFor='password'/>
                <input
                name='password'
                id='password'
                type='text'
                placeholder='password'
                value={credentials.password}
                onChange={handleChange}
                />

            <button type='submit'>Log in</button>
            </form>
    </div>
  );
};

export default Login;
