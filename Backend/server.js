const express=require('express')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config()//loads .env values into process.env
const cors=require('cors')
const connectDB=require('./config/db')
const authRoutes=require('./routes/authRoutes')

connectDB()//connects backend to mongoDB

const app=express()//creates express app

app.use(express.json())//allows backend to read JSON from requests

app.use(cors())//allows requests from frontend

app.use('/api/auth', authRoutes)//all auth routes start with /api/auth

app.get('/', (req,res)=>{
    res.send("Authflow backend is running")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})