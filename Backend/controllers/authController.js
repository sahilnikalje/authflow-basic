const bcrypt=require('bcryptjs')
const User=require('../models/userModel')
const generateTokens=require('../utils/generateTokens')

//register
const registerUser=async (req,res)=>{
    try{
        const{name,email,password}=req.body
 
        //check if the information is provided or not
        if(!name || !email || !password){
            return res.status(400).json({message:"Please enter the information"})
        }

        //check if the user exists or not
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exists"})
        }
 
        //hash password
        const saltRounds=10
        const salt=await bcrypt.genSalt(saltRounds)
        const hashed=await bcrypt.hash(password, salt)

       // create user
        const user=await User.create({
            name, 
            email,
            password:hashed //we want to hash the password
        })

         // send back token and user basic info
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateTokens({id:user._id})
        })
    }
    catch(err){
       console.error(err)
       res.status(500).json({message:"Server Error"})
    }
}


//login
const loginUser=async (req,res)=>{
    try{
        const{email,password}=req.body

        //check info
        if(!email || !password){
            return res.status(400).json({message:"Please enter the information"})
        }

        //find user
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"User not found"})
        }

        //compare password
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({message:"Invalid Credentials"})
        }

        //success- return token
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateTokens({id:user._id})
        })
    }
    catch(err){
          console.error(err)
          res.status(500).json({message:"Server Error"})
    }
}


//get profile
const getProfile=async (req,res)=>{
    try{
         //this is added after the error
           if (!req.user) {
             return res.status(401).json({ message: 'Not authenticated' });
          }

       //auth middleware will attach user to req.user
       const user=await User.findById(req.user._id).select('-password')
       if(!user){
        return res.status(404).json({message:"User not found"})
       }

       //show user 
      return res.json(user)
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"server Error"})
    }
}

module.exports={registerUser, loginUser, getProfile}