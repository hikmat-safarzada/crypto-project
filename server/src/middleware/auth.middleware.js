const jwt = require("jsonwebtoken")
const {config} = require("../config/config")
const verifyToken = async (req, res, next) => {
    try {
        if(req.method === "OPTIONS"){
            return next();
        }
        const token = req.cookies?.token
        if(!token){
            return res.status(400).json({
                message: "No token provided!"
            })
        }
        const decoded = jwt.verify(token, config.jwt_secret)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = verifyToken