const express = require("express");
const router = express.Router();
const validateToken= require("../middleware/validation.token.js")
const userInfo = require("../controllers/user.controller.js")

router.get('/profile' , validateToken , userInfo);

module.exports = router;
