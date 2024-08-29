


const Task = require("../Model/taskModel");
const User = require("../Model/userModel");

// Utility function to format date and time
const formatDateTime = (date) => {
  const formattedDate = date.toLocaleDateString('en-GB');
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
};

module.exports = {
  createTask: async (req, res) => {
    const { taskTitle, taskDescription } = req.body;
    const userId = req.user.userId;

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

    const newTask = new Task({
      userId,
      taskTitle,
      taskDescription,
      taskStatus
    });

    const savedTask = await newTask.save();

    return res.status(201).json({
      message: "Task created successfully!",
      status: "success",
      error: false,
      task: {
        ...savedTask.toObject(),
        createdAt: formatDateTime(savedTask.createdAt),
        updatedAt: formatDateTime(savedTask.updatedAt),
      },
    });
  },

  getAllTasks: async (req, res) => {
    const tasks = await Task.find();

    if (tasks.length === 0) {
      return res.status(404).json({
        message: "No tasks found.",
        status: "failure",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Tasks fetched successfully!",
      status: "success",
      error: false,
      tasks: tasks.map(task => ({
        _id: task._id,
        userId: task.userId,
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        createdAt: formatDateTime(task.createdAt),
        updatedAt: formatDateTime(task.updatedAt),
      })),
    });
  },

  getTaskById: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
        status: "failure",
        error: true,
      });
    }

    if (task.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to view this task.",
        status: "failure",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Task fetched successfully!",
      status: "success",
      error: false,
      task: {
        _id: task._id,
        userId: task.userId,
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        createdAt: formatDateTime(task.createdAt),
        updatedAt: formatDateTime(task.updatedAt),
      },
    });
  },

  updateTask: async (req, res) => {
    const { id } = req.params;
    const { taskTitle, taskDescription, taskStatus } = req.body;
    const userId = req.user.userId;

    if (!taskTitle && !taskDescription && !taskStatus) {
      return res.status(400).json({
        message: "No fields provided to update.",
        status: "failure",
        error: true,
      });
    }

    if (taskStatus && !["todo", "inprogress", "done"].includes(taskStatus)) {
      return res.status(400).json({
        message: "Invalid task status provided.",
        status: "failure",
        error: true,
      });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
        status: "failure",
        error: true,
      });
    }

    task.taskTitle = taskTitle || task.taskTitle;
    task.taskDescription = taskDescription || task.taskDescription;
    task.taskStatus = taskStatus || task.taskStatus;
    const updatedTask = await task.save();

    return res.status(200).json({
      message: "Task updated successfully!",
      status: "success",
      error: false,
      task: {
        _id: updatedTask._id,
        userId: updatedTask.userId,
        taskTitle: updatedTask.taskTitle,
        taskDescription: updatedTask.taskDescription,
        taskStatus: updatedTask.taskStatus,
        createdAt: formatDateTime(updatedTask.createdAt),
        updatedAt: formatDateTime(updatedTask.updatedAt),
      },
    });
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found.",
        status: "failure",
        error: true,
      });
    }

    if (task.userId.toString() !== userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this task.",
        status: "failure",
        error: true,
      });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Task deleted successfully!",
      status: "success",
      error: false,
      task: {
        _id: deletedTask._id,
        userId: deletedTask.userId,
        taskTitle: deletedTask.taskTitle,
        taskDescription: deletedTask.taskDescription,
        createdAt: formatDateTime(deletedTask.createdAt),
        updatedAt: formatDateTime(deletedTask.updatedAt),
      },
    });
  },
};
