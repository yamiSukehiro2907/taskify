const jwt = require("jsonwebtoken");


const generateAccessToken = async (id) => {
    return jwt.sign({id: id, type: "access"}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}

const generateRefreshToken = async (id) => {
    return jwt.sign({id: id, type: "refresh"}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}

module.exports = {generateAccessToken, generateRefreshToken};