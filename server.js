const express=require('express')
const connectDB=require('./Config/database')
const app=express()
const cors=require("cors")
require('dotenv').config()
const authUser=require('./src/Router/userRoutes')
const authTask=require('./src/Router/taskRoutes')
const port=process.env.PORT
app.use(express.json())
app.use(cors())

connectDB()
// app.get('/',(req,res)=>{
//     res.send('Hello World')
// })

app.use('/api/auth',authUser)
app.use('/api/task',authTask)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})