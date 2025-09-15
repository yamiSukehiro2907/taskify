const express = require('express');
const router = express.Router();
const {createTask, getTask, markDone , deleteTask} = require("../controllers/task.controller")

router.post('/create', createTask);
router.get('/my-tasks', getTask)
router.patch('/tasks/:id', markDone);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
