
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/user-routes')
const blogRouter=require('./routes/blog-routes');

require('dotenv').config();

const app = express();
const port = process.env.port || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/user",router);
app.use("/api/blog", blogRouter);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB success");
})

app.use("/api",(req,res)=>{
    res.send("hello ike ");
})

app.listen(port,()=>{
    console.log(`server is running on: ${port}`);
})