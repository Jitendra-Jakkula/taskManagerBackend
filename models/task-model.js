const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 200,
  },
  description: {
    type: String,
    maxLength: 1000,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;