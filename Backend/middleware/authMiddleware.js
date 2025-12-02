const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

//create a function named protect so that we can use it anywhere
const protect=async (req,res,next)=>{
    let token //keeping this empty for now 
    try{
        //check if the token has the required string and if the token is starting with key Bearer
        //ex: Bearer lfksdlkfsdjflkj
        // so req is the request by the user
        //req.headers is the object in whcih theres a string of token
        //req.headers.authorization is the key value pair from which we seperate out the token by splitting it
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
           token=req.headers.authorization.split(' ')[1] //split it with a space
           //ex: Bearer lksdfsdk 
           // so split it with (' ')and then select the 1th index 

           const decoded=jwt.verify(token, process.env.JWT_SECRET) //verify the token and enter the password from env
           const user= req.user=await User.findById(decoded.id).select('-password')//find the user by decoded id

         //this is added after findin error
           if(!user){
             //this shows token valid but user doesnt exist in db
             return res.status(401).json({message:"User not found"})
           }
           req.user=user //attach found user
           return next()
        }
        //no token provided
       return res.status(401).json({message:'No token'})
    }
    catch(err){
        console.error(err)
        return res.status(401).json({message:"Invalid Token"})
    }

//check if token is available

}



module.exports=protect