const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const protect=async (req,res,next)=>{
    let token //declare this out of the block, so that it can be accessed 

    try{
        if(req.headers.authorization //check if headers available
                &&
           req.headers.authorization.startsWith('Bearer') //check if the token is atarting with Bearer keyword
        ){
            token=req.headers.authorization.split(" ")[1] //split with space and take index 1 

            //verify the token using secret key
            const decoded=jwt.verify(token, process.env.JWT_SECRET)

            //get user from DB using id inside token
            req.user=await User.findById(decoded.id).select('-password')

            //move to the next function
            return next()
        }
        return res.status(401).json({message:"No token provided"})
    }
    catch(err){
        return res.status(401).json({message:"Invalid token"})
    }
}

module.exports=protect