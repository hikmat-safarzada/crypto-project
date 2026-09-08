const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { config } = require("../config/config")
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        res.status(200).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid password or email"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Wrong password!"
            })
        }
        const token = jwt.sign(
            { id: user._id },
            config.jwt_secret,
            { expiresIn: "15d" }
        )
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            maxAge: 15 * 24 * 60 * 60 * 1000,
            path: "/"
        })
        res.status(200).json({
            message: "Logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production"
        res.clearCookie("token", {
            path: "/",
            sameSite: "lax",
            secure: isProduction
        })
        res.status(200).json({
            message: "Logged out successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    register, login, logout
}