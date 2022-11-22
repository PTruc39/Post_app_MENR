const express = require('express');
const { getAllBlogs,getById,addBlog,updateBlog,deleteBlog,getByUserId } =require("../controllers/blog-controller");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id", getByUserId);

module.exports=blogRouter;
