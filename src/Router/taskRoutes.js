const express = require('express');
const router = express.Router();
const {tokenVerifyUser}=require('../utils/jwtToken')
const tryCAtchMiddleware=require('../Middleware/tryCatch');
const taskController = require('../Controller/taskController');

// console.log("authtoken",authenticateUser);

// Route to create a new task
router
.post('/tasks',tokenVerifyUser,tryCAtchMiddleware(taskController.createTask))
.get("/tasks",tokenVerifyUser,tryCAtchMiddleware(taskController.getAllTasks))
.put('/tasks/:id',tokenVerifyUser,tryCAtchMiddleware(taskController.updateTask))
.get('/tasks/:id',tokenVerifyUser,tryCAtchMiddleware(taskController.getTaskById))
.delete('/tasks/:id',tokenVerifyUser,tryCAtchMiddleware(taskController.deleteTask))
module.exports = router;
