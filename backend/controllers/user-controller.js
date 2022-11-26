const nodemailer = require("nodemailer");
const jwt  = require("jsonwebtoken");

const User =require("../model/User");
const bcrypt = require('bcrypt')

const keysecret = "8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb"
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"tibutibu39@gmail.com",
        pass:"mbgnxdpiyxigwnix"
    }
}) 


const getAllUser = async (req, res, next) => {
    let users;
    try {
      users = await User.find();
    } catch (err) {
      console.log(err);
    }
    if (!users) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
  };
const signup = async(req,res,next)=>{
    const {name, email,password} =req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"ALREADY EXISTED"});
    }

    const hashedPassword = bcrypt.hashSync(password,10);
    const user = new User({
        name, email, password: hashedPassword,blog:[]
    });

    try {
        user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({user});
}

const login =async(req,res,next)=>{
    const {email,password} =req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404)
        .json({message:"DONT EXIST"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400)
        .json({message:"INCORRECT PASS"})
    }
    return res.status(200).json({message:"loginedd",user:existingUser})
}

const sendPass = async (req, res, next) => {
    console.log(req.body)
    const {email} = req.body;
    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }
    try {
        const userfind = await User.findOne({email:email});

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"1200s"
        });
        console.log(token);
        
        const setusertoken = await User.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
        //const setusertoken = await User.findByIdAndUpdate({_id:userfind._id},{verifytoken:token});


        if(setusertoken){
            const mailOptions = {
                from:"tibutibu39@gmail.com",
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 20 MINUTES http://localhost:3001/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Succsfully"})
                }
            })

        }

    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }
  };
  const checkToken = async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await User.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        console.log(verifyToken)

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(201).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(201).json({status:401,error})
    }
};

const changePassword = async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await User.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})
            console.log("done");
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
}
  exports.getAllUser=getAllUser;
  exports.signup=signup;
  exports.login=login;
  exports.sendPass=sendPass;
  exports.checkToken=checkToken;
  exports.changePassword=changePassword;