const Task = require("../models/task-model");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");

router.post("/tasks", authMiddleware, adminOnly, async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      dueDate,
      status,
      assignedTo,
      priority,
    } = req.body;
    const newTask = new Task({
      title,
      description,
      project,
      dueDate,
      status,
      assignedTo,
      priority,
    });

    let res2 = await newTask.save();
    console.log(res2);
    res
      .status(201)
      .json({ message: "Task created successfully", taskId: newTask._id });
  } catch (e) {
    res.status(500).json({ message: "Server Error. Task creation failed." });
    console.error(e);
  }
});

router.get("/tasks", authMiddleware, adminOnly, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (e) {
    res.status(500).json({ message: "Server Error. Could not fetch tasks." });
    console.error(e);
  }
});

//assign task to user

//TODO Test..
router.patch(
  "/tasks/:taskId/assign",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    try {
      const { taskId } = req.params;
      const { assignedTo } = req.body;

      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      if (task.assignedTo && task.assignedTo.toString() === assignedTo) {
        return res
          .status(400)
          .json({ message: "This Task is already assigned to this user" });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { assignedTo },
        { new: true }
      );

      res
        .status(200)
        .json({ message: "Task assigned successfully", task: updatedTask });
    } catch (e) {
      res.status(500).json({ message: "Server Error. Could not assign task." });
    }
  }
);

//update task
router.put("/tasks/:taskId", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { taskId } = req.params;
    const {
      title,
      description,
      project,
      dueDate,
      status,
      assignedTo,
      priority,
    } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, project, dueDate, status, assignedTo, priority },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (e) {
    res.status(500).json({ message: "Server Error. Could not update task." });
    console.error(e);
  }
});

//delete
router.delete("/tasks/:taskId", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server Error. Could not delete task." });
    console.error(e);
  }
});

module.exports = router;
