const mongoose=require('mongoose')

//make a function
const connectDB=async ()=>{
    try{
         //connect mongo uri
       const conn=await mongoose.connect(process.env.MONGO_URI)
       console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(err){
        console.error(err)
        process.exit(1) //this forcefully stops the nodejs when something goes wrong
        //process.exit(0) means normal exit
        //process.exit(1) means error exit
    }
}

module.exports=connectDB