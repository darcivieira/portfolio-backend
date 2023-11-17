const User = require("../models/userModel")
const secrets = require("../helpers/secretHelper")

module.exports = {
    async create(request, response) {
        try {
            const { body } = request
            const userIsAlreadyCreated = await User.findOne({ where: { email: body.email } })

            if (!userIsAlreadyCreated) {
                const plain_password = secrets.generateRandomPassword();
                const password = secrets.createHashedPassword(plain_password)
                const newBody = { ...body, password }
                await User.create(newBody)
                response
                    .status(201)
                    .json("Great! Your'll receive an e-mail with your password!")
            } else {
                response
                    .status(401)
                    .json("Sorry! You already have an account registred!")
            }

        } catch (error) {
            response.status(400).send(error)
        }
    }
}