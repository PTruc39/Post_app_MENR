import React, { useState } from 'react'
import {Box, Button, TextField , Typography} from '@mui/material'
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [isSignup, setisSignup] = useState(false)
  const [inputs, setInputs] = useState({
    name:"",email:"",password:""
  })
  const handleChange = (e) =>{
    setInputs((prev)=>{
      return{
      ...prev,
      [e.target.name]:e.target.value
    }
    })
  }
  const sendRequest = async (type="login")=>{
    const res = await axios
    .post(`http://localhost:5001/api/user/${type}`,{
      name:String(inputs.name),
      email:String(inputs.email),
      password:String(inputs.password)
    })
    .catch((err)=>console.log(err))

    const data = await res.data;
    console.log(data);
    return data;
  }
  
  const sendRequestSU = async ()=>{
    const res = await axios
    .post(`http://localhost:5001/api/user/signup`,{
      name:String(inputs.name),
      email:String(inputs.email),
      password:String(inputs.password)
    })
    .catch((err)=>console.log(err))

    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if(isSignup)
    sendRequestSU()
    .then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispath(authAction.login()))
    .then(()=>navigate("/blogs"));
    else
    sendRequest()
    .then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispath(authAction.login()))
    .then(()=>navigate("/blogs"));
  }


  return (
    <div>
      <form>
        <Box display="flex" flexDirection={'column'} 
        alignItems='center' justifyContent={'center'}
        boxShadow="10px 10px 10px #ccc"
        padding={3}
        margin="auto"
        maxWidth={400}
        borderRadius={5}>
        <Typography fontSize={'large'}>{!isSignup?"Login":"Signup"}</Typography>
        {isSignup && <TextField name='name' onChange={handleChange}
        value={inputs.name} placeholder='Name' />}
        <TextField name='email' onChange={handleChange}
        value={inputs.email} placeholder='Email' type={'email'} />
        <TextField name='password' onChange={handleChange}
        value={inputs.password} placeholder='Password' type={'password'} />
        <Button onClick={handleSubmit} variant='contained'>Submit</Button>
        <Button onClick={()=>setisSignup(!isSignup)}>
          Change to {isSignup?"Login":"Signup"}</Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth