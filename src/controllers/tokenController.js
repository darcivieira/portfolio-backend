const User = require("../models/userModel")
const jwt = require("../helpers/jwtHelper")
const secret = require("../helpers/secretHelper")


module.exports = {
    async create(request, response) {

        const { body } = request

        if (!body || !Object.keys(body).includes('email') || !Object.keys(body).includes('password')) {
            response
                .status(400)
                .json({ message: 'You must send email and password params' })
        }

        const userData = await User.findOne({ where: { email: body.email } })

        if (!userData) {
            response
                .status(404)
                .json({ message: 'User not found' })
        }

        const isValidPassword = secret.verifyPassword(body.password, userData.password)

        if (isValidPassword) {

            const obj = jwt.generateTokens({
                user: userData.id,
                userName: `${userData.firstName} ${userData.lastName}`
            })
            response.status(201).json(obj)

        } else {
            response.status(400).json({ message: 'Invalid password!' })
        }

    },

    async update(request, response) {
        const { refresh } = request.body

        if (!refresh) {
            response.status(400).json({ 'message': 'Invalid body request!' })
        }

        try {
            const newToken = jwt.refreshToken(refresh)

            response.status(200).json(newToken)
        } catch (error) {
            response
                .status(error.statusCode)
                .json({ 'message': error.message })
        }


    }
}