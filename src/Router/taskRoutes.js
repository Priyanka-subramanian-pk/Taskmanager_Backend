const express = require('express');
const router = express.Router();
const authenticateUser=require('../utils/jwtToken')
const tryCAtchMiddleware=require('../Middleware/tryCatch');
const taskController = require('../Controller/taskController');

// console.log("authtoken",authenticateUser);

// Route to create a new task
router
.post('/createtask',tryCAtchMiddleware(taskController.createTask))
.get("/getalltasks",tryCAtchMiddleware(taskController.getAllTasks))
.put('/updatetask/:id',tryCAtchMiddleware(taskController.updateTask))
.delete('/deletetask/:id',tryCAtchMiddleware(taskController.deleteTask))
module.exports = router;
