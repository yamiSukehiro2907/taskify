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

module.exports = createTask;