const Task = require("../Model/taskModel");
const User = require("../Model/userModel");

module.exports = {
  // createTask: async (req, res) => {
  //   const { taskTitle, taskDescription } = req.body;
  //   const userId = req.user.userId;

  //   // --------Validate input
  //   if (!taskTitle || !taskDescription) {
  //     return res.status(400).json({
  //       message: "Task title and description are required.",
  //       status: "failure",
  //       error: true,
  //     });
  //   }

  //   const user = await User.findById(userId);
  //   if (!user) {
  //     return res.status(400).json({
  //       message: "No user found",
  //       status: "failure",
  //     });
  //   }

  //   //---------- Create a new task instance
  //   const newTask = new Task({
  //     userId,
  //     taskTitle,
  //     taskDescription,
  //   });

  //   // ---------Save the task to the database
  //   const savedTask = await newTask.save();

  //   // --------Respond with success
  //   return res.status(201).json({
  //     message: "Task created successfully!",
  //     status: "success",
  //     error: false,
  //     task: savedTask,
  //   });
  // },


  createTask: async (req, res) => {
    const { taskTitle, taskDescription } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!taskTitle || !taskDescription) {
      return res.status(400).json({
        message: "Task title and description are required.",
        status: "failure",
        error: true,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "No user found",
        status: "failure",
      });
    }

    // Create a new task instance
    const newTask = new Task({
      userId,
      taskTitle,
      taskDescription,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    // Respond with success including created date and time
    return res.status(201).json({
      message: "Task created successfully!",
      status: "success",
      error: false,
      task: savedTask, // This includes createdAt and updatedAt
    });
  },


  
  // //==============getalltasks===========
  getAllTasks: async (req, res) => {
    const tasks = await Task.find();
    // Check if tasks are found
    if (tasks.length === 0) {
      return res.status(404).json({
        message: "No tasks found.",
        status: "failure",
        error: true,
      });
    }
    // Respond with the list of tasks
    return res.status(200).json({
      message: "Tasks fetched successfully!",
      status: "success",
      error: false,
      tasks,
    });
  },

// -==========gettaskbyId=============

getTaskById: async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
          
  // Find the task by ID
  const task = await Task.findById(id);
    // Check if the task exists
    if (!task) {
      return res.status(404).json({
          message: "Task not found.",
          status: "failure",
          error: true,
      });
  }
   // Ensure the task belongs to the user
   if (task.userId.toString() !== userId) {
    return res.status(403).json({
        message: "You are not authorized to view this task.",
        status: "failure",
        error: true,
    });
}

        // Respond with the task details
        return res.status(200).json({
          message: "Task fetched successfully!",
          status: "success",
          error: false,
          task,
      });




},






  // =============Updatedtask===============

  updateTask: async (req, res) => {
    const { id } = req.params;
    const { taskTitle, taskDescription, taskStatus } = req.body;

    const userId = req.user.userId;
    console.log("userID", userId);

    // Validate that at least one field is provided
    if (!taskTitle && !taskDescription && !taskStatus) {
      return res.status(400).json({
        message: "No fields provided to update.",
        status: "failure",
        error: true,
      });
    }

    // Validate task status
    if (taskStatus && !["todo", "inprogress", "done"].includes(taskStatus)) {
      return res.status(400).json({
        message: "Invalid task status provided.",
        status: "failure",
        error: true,
      });
    }

    // Find the task by ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
        status: "failure",
        error: true,
      });
    }

    // Ensure the task belongs to the user
    if (!task.userId) {
      return res.status(400).json({
        message: "Task is missing a userId.",
        status: "failure",
        error: true,
      });
    }

    //  // Update the task
    //  const updatedTask = await Task.findByIdAndUpdate(
    //     id,
    //     { taskTitle, taskDescription },
    //     { new: true, runValidators: true } // Return the updated document and run validators
    // );

    // Update the task
    task.taskTitle = taskTitle || task.taskTitle;
    task.taskDescription = taskDescription || task.taskDescription;
    task.taskStatus = taskStatus || task.taskStatus;
    const updatedTask = await task.save();

    // Respond with the updated task
    return res.status(200).json({
      message: "Task updated successfully!",
      status: "success",
      error: false,
      updatedTask,
    });
  },

  // ===========deleteTask===========

  deleteTask: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find the task by ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
        status: "failure",
        error: true,
      });
    }
    // Ensure the task belongs to the user
    if (task.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this task.",
        status: "failure",
        error: true,
      });
    }

    // Delete the task
    const deletedTask = await Task.findByIdAndDelete(id);

    // Respond with success
    return res.status(200).json({
      message: "Task deleted successfully!",
      status: "success",
      error: false,
      deletedTask,
    });
  },
};
