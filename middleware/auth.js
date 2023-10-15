const { verifyToken } = require("../utils/jwt")
const jwt = require('jsonwebtoken')
const data = require('../data/user')
const SECRET_KEY = 'rahasia'
const authentication = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]

        if (!token) {
            throw {
                code: 401,
                message: "token not provided!"
            }
        }
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token tidak valid' });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(error.code || 500).json(error.message)
    }

}
module.exports = { authentication }