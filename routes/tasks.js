const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const List = require("../models/list");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("list");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/list/:listId", async (req, res) => {
  try {
    const tasks = await Task.find({ list: req.params.listId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description, 
    status: req.body.status,
    priority: req.body.priority,
    date: req.body.date,               
    keywords: req.body.keywords,
    listId: req.body.listId,          
    category: req.body.category      
  });

  try {
    const newTask = await task.save();

    await List.findByIdAndUpdate(req.body.listId, {
      $push: { tasks: newTask._id },
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    await List.findByIdAndUpdate(task.list, { $pull: { tasks: task._id } });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;