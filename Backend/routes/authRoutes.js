const express=require('express')
const {registerUser,loginUser, getProfile}=require('../controllers/authController')
const protect=require('../middleware/authMiddleware')

//express.Router is a function which is used to creates the routes in different fies 
const router=express.Router()

//public routes
router.post('/register', registerUser)
router.post('/login', auth.loginUser)

//private routes
router.get('/profile', protect,getProfile) // this was the main error
//protect should also be used here to access the profile 

module.exports=router