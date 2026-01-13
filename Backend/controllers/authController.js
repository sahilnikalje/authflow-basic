const User=require('../models/userModel')
const generateToken=require('../utils/generateToken')
const bcrypt=require('bcryptjs')

//register user
const registerUser=async (req,res)=>{
    try{
        const{name,email,password}=req.body

        //check if all the fields are filled or not
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        //check if the user already exists or not
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exist"})
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,10)//10 salt rounds

        //create user
        const user=await User.create({
            name,email,password:hashedPassword
        })

        //response 
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    catch(err){
        res.status(500).json({message:"Server error"})
    }
}


//Login user
const loginUser=async (req,res)=>{
    try{
        const{email,password}=req.body

    //check if all the fields are filled or not
    if(!email || !password){
        return res.status(401).json({message:"All fields are required"})
    }

    //check if user already exist
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"User does not exist"})
    }

    //compare the password
    const isMatch=await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(401).json({message:"Invalid Credentials"})
    }
 
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })
    }
    catch(err){
        res.status(500).json({message:"Server error"})
    }
}

module.exports={registerUser, loginUser}