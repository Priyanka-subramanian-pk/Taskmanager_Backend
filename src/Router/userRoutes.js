const express=require('express')
const router=express.Router()
const tryCAtchMiddleware=require('../Middleware/tryCatch')
const user=require('../Controller/UserController')


router
.post('/createuser',tryCAtchMiddleware(user.userRegister))
.post("/loginuser",tryCAtchMiddleware(user.userLogin))


module.exports=router