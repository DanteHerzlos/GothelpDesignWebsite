const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }
        
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken){
            return next(ApiError.UnauthorizedError())
        }

        const UserData = tokenService.validateAccessToken(accessToken)
        if (!UserData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = UserData
        next()
    } catch (e) { 
        return next(ApiError.UnauthorizedError())
    }
}