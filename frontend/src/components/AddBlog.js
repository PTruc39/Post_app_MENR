import React, { useState } from 'react'
import {Box, Button, TextField , Typography} from '@mui/material'
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const [inputs, setInputs] = useState({
    title:"",description:"",image:"",user:id
  })

  const sendRequest = async()=>{
    const res = await axios
    .post(`http://localhost:5001/api/blog/add`,{
      title:String(inputs.title),
      description:String(inputs.description),
      image:String(inputs.image),
      user:String(inputs.user)
    })
    .catch((err)=>console.log(err))

    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    sendRequest()
    .then(()=>navigate("/blogs"));
  }
  const handleChange=(e)=>{
    setInputs((prev)=>{
      return{
      ...prev,
      [e.target.name]:e.target.value
    }
    })
  }
  return (
    <div>
      <form>
        <Box display="flex" flexDirection={'column'} 
        alignItems='center' justifyContent={'center'}
        boxShadow="10px 10px 10px #ccc"
        padding={3}
        margin="auto"
        maxWidth={800}
        borderRadius={5}>
        <Typography fontSize={'large'}>ADD NEW BLOG</Typography>
        <TextField name='title' onChange={handleChange}
        value={inputs.title} placeholder='Title' />
        <TextField name='description' onChange={handleChange}
        value={inputs.description} placeholder='Description'  />
        <TextField name='image' onChange={handleChange}
        value={inputs.image} placeholder='Image source' />
        <Button onClick={handleSubmit} variant='contained'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog