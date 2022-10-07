const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const User = require('../models/User')

const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{username: user.username}, token})
}

const login = async (req, res) => {
    res.send('Login User')
}

module.exports = {
    register,
    login
}