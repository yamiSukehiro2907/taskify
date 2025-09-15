const express = require('express');
const router = express.Router();
const {registerUser, loginUser , logOutUser} = require("../controllers/auth.controller.js")


router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logOutUser);

module.exports = router;