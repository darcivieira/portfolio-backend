const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const ApiError = require("../utils/errors");

dotenv.config()

module.exports = {
    generateTokens(userData) {
        const iat = Date.now() / 1000
        const access = jwt.sign({
            exp: Math.floor(iat) + (60 * process.env.EXP_ACCESS),
            ...userData
        }, process.env.SECRET)
        const refresh = jwt.sign({
            exp: Math.floor(iat) + (60 * process.env.EXP_REFRESH),
            ...userData
        }, process.env.SECRET)
        return { access, refresh }

    },

    async validateToken(request, response, next) {

        const token = request.headers.authorization

        if (!token) {
            throw new ApiError('Token invalido', 401)
        }


        try {
            const tokenData = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET)

            if (tokenData.iat > tokenData.exp) {
                throw new ApiError('Token expirado', 401)
                // response.status(401).json({ 'message': 'Token is expired' })
            }

            next()

        } catch (error) {
            throw new ApiError('Token invalido', 401)
            // response.status(401).send(error)
        }
    },

    refreshToken(refresh) {

        try {
            const tokenData = jwt.verify(refresh, process.env.SECRET)

            if (tokenData.iat > tokenData.exp) {
                throw new ApiError('Token expirado', 401)
                // response.status(401).json({ 'message': 'Token is expired' })
            }
            return this.generateTokens({
                user: tokenData.user, userName: tokenData.userName
            })
        } catch (error) {
            const statusCode = error.statusCode ? error.statusCode : 500

            throw new ApiError(error.message, statusCode)
        }

    }
};