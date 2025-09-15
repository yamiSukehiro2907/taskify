const jwt = require('jsonwebtoken');
const User = require("../models/user.model")

const validationToken = async (req, res, next) => {

    const headers = req.headers.Authorization || req.headers.authorization;

    if (!headers || !headers.startsWith('Bearer')) {
        return res.status(401).json({message: "Unauthorized"})
    }

    const token = headers.split(' ')[1]
    if (!token) {
        return res.status(401).json({message: "No token provided"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).json({message: "Invalid token"})
        }
        const id = decoded.id
        const user = User.findById(id)
    })
}