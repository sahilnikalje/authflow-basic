//import jwt
const jwt=require('jsonwebtoken')

//make a function named generate token
const generateToken=(payload)=>{ //payload is a packet which will have users small info like id 
    //payload will be {id:user_id}
    return jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:'7d'})
}

module.exports=generateToken

//jwt.sign(payload) this is for the id
