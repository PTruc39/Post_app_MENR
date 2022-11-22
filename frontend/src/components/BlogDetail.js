import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Box, Button, TextField , Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  
  const [blogs, setBlogs] = useState();
  const id = useParams().id;
  console.log(id);
  const fetchDetail = async () =>{
    const res = await axios.get(`http://localhost:5001/api/blog/${id}`)
    .catch((err)=>console.log(err))
    const data = await res.data;
    return data;
  }
  const [inputs, setInputs] = useState({
    title:"",
    description:"",
    user:""
  })
  useEffect(() => {
    const data = fetchDetail()
    .then((data)=>{setBlogs(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    })
  }, [id])
  console.log(blogs);

  const navigate = useNavigate();

  const sendRequest = async()=>{
    const res = await axios
    .put(`http://localhost:5001/api/blog/update/${id}`,{
      title:String(inputs.title),
      description:String(inputs.description),
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
        <Typography fontSize={'large'}>UPDATE YOUR BLOG</Typography>
        <TextField name='title' onChange={handleChange}
        value={inputs.title} placeholder='Title' />
        <TextField name='description' onChange={handleChange}
        value={inputs.description} placeholder='Description'  />
       <Button onClick={handleSubmit} variant='contained'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default BlogDetail