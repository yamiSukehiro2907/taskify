const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

const {generateAccessToken, generateRefreshToken} = require("../config/token.js");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    try {
        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({message: "Email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            name: name,
            password: hashedPassword,
            email: email,
        })

        return res.status(201).json({
            message: "User created successfully",
            name: createdUser?.name,
            email: createdUser?.email,
        })
    } catch (error) {
        return res.status(500).json({error: `User Registration Failed`})
    }
}


const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    try {
        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({message: "User does not exist"})
        }
        const correctPassword = await bcrypt.compare(password, user.password);

        if (correctPassword) {
            const accessToken = await generateAccessToken(user.id);
            const refreshToken = await generateRefreshToken(user.id);

            res.cookie("accessToken", accessToken, {httpOnly: true, sameSite: true, maxAge: 60 * 60 * 1000});
            res.cookie("refreshToken", refreshToken, {httpOnly: true, sameSite: true, maxAge: 7 * 24 * 60 * 60 * 1000});
            user.refreshToken = refreshToken;
            await user.save()

            return res.status(200).json({
                message: "User login successfully",
                email: user.email,
                name: user.name
            });
        }
        return res.status(400).json({
            error: "Password is incorrect"
        })
    } catch (error) {
        return res.status(500).json({error: `User Login Failed`})
    }
}


const logOutUser = async (req, res) => {
    if (req.body) {
        const {email} = req.body;
        if (email) {
            const user = await User.findOne({email})
            if (user) {
                if (user.refreshToken === '') {
                    return res.status(400).json({message: "User already logged out"})
                }
                user.refreshToken = '';
                await user.save()
                return res.status(200).json({message: "User logged out"})
            }
        }
    }


    const accessToken = req.cookies.accessToken;

    console.log(accessToken);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (!err) {
            const id = decoded.id;
            const user = await User.findById(id);
            if (user) {
                if (user.refreshToken === '') {
                    return res.status(400).json({message: "User Already logged out"})
                }
                user.refreshToken = '';
                await user.save()
                return res.status(200).json({message: "User logged out"})
            }
        }
        return res.status(400).json({message: "User log out failed"})
    })
}
module.exports = {registerUser, loginUser, logOutUser};