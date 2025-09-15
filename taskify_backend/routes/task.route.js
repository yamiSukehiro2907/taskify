const express = require('express');
const router = express.Router();
const {createTask, getTask, markDone} = require("../controllers/task.controller")

router.post('/create', createTask);
router.get('/my-tasks', getTask)
router.patch('/tasks/:id', markDone);

module.exports = router;
