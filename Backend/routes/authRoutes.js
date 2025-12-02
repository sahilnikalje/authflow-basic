const express=require('express')
const auth=require('../controllers/authController')
const protect=require('../middleware/authMiddleware')

//express.Router is a function which is used to creates the routes in different fies 
const router=express.Router()

//route for homepage
app.get('/', (req, res) => {
  res.send('Authflow-basic backend is running 🚀');
});

//public routes
router.post('/register', auth.registerUser)
router.post('/login', auth.loginUser)

//private routes
router.get('/profile', protect,auth.getProfile) // this was the main error
//protect should also be used here to access the profile 

module.exports=router