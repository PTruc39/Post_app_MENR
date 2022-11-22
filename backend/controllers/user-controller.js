const User =require("../model/User");
const bcrypt = require('bcrypt')

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

  exports.getAllUser=getAllUser;
  exports.signup=signup;
  exports.login=login;