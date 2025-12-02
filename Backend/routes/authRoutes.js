const express=require('express')
const auth=require('../controllers/authController')
const protect=require('../middleware/authMiddleware')

//express.Router is a function which is used to creates the routes in different fies 
const router=express.Router()

//public routes
router.post('/register', auth.registerUser)
router.post('/login', auth.loginUser)

//private routes
router.get('/profile', auth.getProfile)

module.exports=router