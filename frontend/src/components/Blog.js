import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
  } from "@mui/material";
  import React from "react";
  import DeleteIcon from '@mui/icons-material/Delete';
  import SettingsIcon from '@mui/icons-material/Settings';

  import { useNavigate } from "react-router-dom";
  import axios from "axios";

  const Blog = ({props, userName,isUser}) => {
    const navigate = useNavigate();


    const handleDelete = async (e)=>{
      const res = await axios.delete(`http://localhost:5001/api/blog/${props._id}`)
      .catch((err)=>console.log(err))
      navigate("/blogs");
    }

    const handleUpdate=(e)=>{
      navigate(`/myBlogs/${props._id}`)
    }
    
    return (
      <div><Card sx={{ width: "40%",
      margin: "auto",
      mt: 2,
      padding: 2,
      boxShadow: "5px 5px 10px #ccc",
      ":hover": {
        boxShadow: "10px 10px 20px #ccc",
      },}}>

      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {userName}
          </Avatar>
        }
        
        title={props.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        //image="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/313387307_1351633978906242_6101245136103578795_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=h_MqZMh-k7QAX-n3YPz&tn=bANlkNAWqMZDLJYw&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfA1H9Fhh25w0wYjFo1ox56qfy8Tm18PETirTEqf9v0d4A&oe=636ADC92"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      {isUser && 
        <Box display='flex'>
          <IconButton onClick={handleUpdate} sx={{marginLeft:'auto'}}><SettingsIcon/></IconButton>
          <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>
        </Box>
        }
    </Card></div>
    )
  }
  
  export default Blog;