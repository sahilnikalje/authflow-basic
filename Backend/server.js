const express=require('express')
const connectDB=require('./config/db')
const authRoutes=require('./routes/authRoutes')
const dotenv=require('dotenv')
const cors=require('cors')

dotenv.config() //to load the .env file
connectDB() //calling the function to connect db

const app=express() //create main express application
app.use(express.json()) //parse incoming JSON request bodies
app.use(cors()) //it allows frontend to access backend

app.use('/api/auth', authRoutes)
 
//this was causing problem in deployment
app.get('/', (req, res) => {
  res.send('Authflow-basic backend is running 🚀');
});

const PORT=process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`)
})