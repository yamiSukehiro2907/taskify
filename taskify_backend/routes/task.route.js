const express = require('express');
const router = express.Router();
const createTask = require("../controllers/task.controller")

router.post('/create', createTask);

module.exports = router;
