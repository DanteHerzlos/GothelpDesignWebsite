const User = require('../models/user')
const bcrypt = require('bcrypt')
const tokenService = require('../services/token-service')
const ApiError = require('../exceptions/api-error')


class UserService {
    async login(email, password) {
        const candidate = await User.findOne({where: {email}})
        if (!candidate){
            throw ApiError.BadRrequest('Пользователь не был найден')
        }

        const areSame = await bcrypt.compare(password, candidate.encryptedPassword)
        if(!areSame){
            throw ApiError.BadRrequest('Пользователь не был найден')
        }

        const tokens = tokenService.generateToken({id: candidate.id, email: candidate.email})
        await tokenService.saveToken(candidate.id, tokens.refreshToken)
        return (tokens)
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = tokenService.findToken(refreshToken)
        if (!userData || ! tokenFromDB){
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({where: {id: userData.id}})
        const tokens = tokenService.generateToken({id: user.id, email: user.email})
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return (tokens)
    }
}

module.exports = new UserService()