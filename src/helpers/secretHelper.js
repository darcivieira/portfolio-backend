const crypto = require("crypto")

module.exports = {
    defaultValues() {
        const salt = crypto.randomBytes(32).toString('hex')
        return {
            algorithm: 'pbkdf2_sha256',
            salt,
            iterations: 29000
        }
    },

    encode(password, { algorithm, salt, iterations }) {
        const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha256')
        return `${algorithm}$${iterations}$${salt}$${hash.toString('base64')}`
    },

    decode(encoded) {
        const [algorithm, iterations, salt, hash] = encoded.split('$')
        return {
            algorithm,
            salt,
            iterations: parseInt(iterations, 10)
        }
    },

    generateRandomPassword() {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const passwordLength = 12;
        let password = "";

        for (let i = 0; i <= passwordLength; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1)
        }

        return password
    },

    createHashedPassword(password) {
        return this.encode(password, this.defaultValues())
    },

    verifyPassword(password, hashedPassword) {
        const decoded = this.decode(hashedPassword)
        const newHashedPassword = this.encode(password, decoded)
        return newHashedPassword === hashedPassword
    }

}