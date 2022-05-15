const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/token')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(
            payload, 
            config.get('JWT_ACCESS_SECRET'), 
            {expiresIn: '15m'}
        )
        const refreshToken = jwt.sign(
            payload,
            config.get('JWT_REFRESH_SECRET'), 
            {expiresIn: '30d'}
        )
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const UserData = jwt.verify(token, config.get('JWT_ACCESS_SECRET'))
            return UserData
        } catch (e) { return null }
    }

    validateRefreshToken(token) {
        try {
            const UserData = jwt.verify(token, config.get('JWT_REFRESH_SECRET'))
            return UserData
        } catch (e) { return null }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: {user: userId}})

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({ where: {refreshToken}})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: {refreshToken}})
        return tokenData
    }
}

module.exports = new TokenService()