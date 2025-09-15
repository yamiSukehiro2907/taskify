const User = require("../models/user.model.js");

const userInfo = async (req, res) => {

    const user = req.user;
    if (!user) {
        return res.status(401).json({message: "User not logged in"})
    }

    const userDetails = {
        name: user.name,
        email: user.email,
    }
    return res.status(200).json(userDetails);
}

module.exports = userInfo;