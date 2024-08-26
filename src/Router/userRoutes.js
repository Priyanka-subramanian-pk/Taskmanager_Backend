const express=require('express')
const router=express.Router()
const tryCAtchMiddleware=require('../Middleware/tryCatch')
const user=require('../Controller/UserController')


router
.post('/register',tryCAtchMiddleware(user.userRegister))
.post("/login",tryCAtchMiddleware(user.userLogin))


module.exports=router