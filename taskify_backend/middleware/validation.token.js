const jwt = require('jsonwebtoken');
const User = require("../models/user.model")

const validateToken = async (req, res, next) => {

    const token = req.cookies.accessToken;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).json({message: "Invalid token"})
        }
        const id = decoded.id
        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({message: "Invalid user"})
        }

        req.user = user;
        next();
    })
}

module.exports = validateToken