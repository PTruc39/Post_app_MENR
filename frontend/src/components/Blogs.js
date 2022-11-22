import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import Blog from './Blog';
import Silde from './Silde';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async()=>{
    const res = await axios
    .get("http://localhost:5001/api/blog")
    .catch((err)=>console.log(err))
    const data = await res.data;
    console.log(data)
    return data;
  }
  useEffect(()=>{
    sendRequest().then(data=>setBlogs(data.blogs))
  },[])
  console.log(blogs);
  //console.log(blogs.user.name);

  //blogs.map((blog)=>console.log(blog));

  const settings = {
    dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
  };
  return (
    <div>
       <Slider {...settings}>
       {blogs && blogs.slice(6,10).reverse().map((blog,index)=>(
      <Blog props={blog} userName={blog.user.name}
      isUser={localStorage.getItem("userId")===blog.user._id}
      />
      ))}
      </Slider>
      {blogs && blogs.slice(0).reverse().map((blog,index)=>(
      <Blog props={blog} userName={blog.user.name}
      isUser={localStorage.getItem("userId")===blog.user._id}
      />
      ))}
    </div>
  )
}

export default Blogs