const Task = require("../models/task.model.js")

const createTask = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }

    const {title, description, category, isDone} = req.body;

    if (!title || !category) {
        return res.status(400).json({message: 'Title & category fields are required'});
    }

    const task = await Task.create({
        userId: user.id,
        title: title,
        description: description || '',
        category: category,
        isDone: isDone || false,
    })

    return res.status(200).json(task);
}

const getTask = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }

    const tasks = await Task.find({userId: user.id})
    return res.status(200).json(tasks);
}

const markDone = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }

    const id = req.params.id;

    const task = await Task.findById(id)

    if (!task || task.userId !== user.id) {
        return res.status(400).json({message: 'Task not found'});
    }
    if (task.isDone) {
        return res.status(400).json({message: 'Task already completed'});
    }

    task.isDone = true;
    await task.save();
    return res.status(200).json({message: 'Task completed'});
}


const deleteTask = async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task || task.userId !== user.id) {
        return res.status(400).json({message: 'Task not found'});
    }

    await Task.findByIdAndDelete(id)
    return res.status(200).json({message: 'Task deleted successfully'});
}
module.exports = {createTask, getTask, markDone, deleteTask};