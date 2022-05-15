const userService = require('../services/user-service')

class UserController {
    async login(req, res, next){
        try {
            const {email, password} = await req.body
            const tokens = await userService.login(email, password)
            res.cookie(
                'refreshToken', 
                tokens.refreshToken, 
                {maxAge: 30 * 24 * 60 * 60* 1000, httpOnly: true}
            )
            res.status(200).json({tokens})
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken') 
            res.status(200).json({token})
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const tokens = await userService.refresh(refreshToken)
            res.cookie(
                'refreshToken', 
                tokens.refreshToken, 
                {maxAge: 30 * 24 * 60 * 60* 1000, httpOnly: true}
            )
            res.status(200).json({tokens})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()