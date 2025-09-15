const express = require('express');
const router = express.Router();
const {createTask, getTask} = require("../controllers/task.controller")

router.post('/create', createTask);
router.get('/my-tasks', getTask)

module.exports = router;
