const express = require('express');
const router = express.Router();
const {tokenVerifyUser}=require('../utils/jwtToken')
const tryCAtchMiddleware=require('../Middleware/tryCatch');
const taskController = require('../Controller/taskController');

// console.log("authtoken",authenticateUser);

// Route to create a new task
router
.post('/createtask',tokenVerifyUser,tryCAtchMiddleware(taskController.createTask))
.get("/getalltasks",tokenVerifyUser,tryCAtchMiddleware(taskController.getAllTasks))
.put('/updatetask/:id',tokenVerifyUser,tryCAtchMiddleware(taskController.updateTask))
.delete('/deletetask/:id',tokenVerifyUser,tryCAtchMiddleware(taskController.deleteTask))
module.exports = router;
