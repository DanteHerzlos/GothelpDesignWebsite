const { check, validationResult } = require('express-validator')

const sendMailValidation = [
    check('email', 'Некорректный Email!').normalizeEmail().isEmail(),
    check('tel', 'Некорректный номер телефона!').isMobilePhone(),
    check('fname', 'Поле "Имя" не может быть пустым!').exists(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){  
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные для отправки сообщения',
                status: 'warning'
            })
        } else {
           next()   
        }  
    }
]

module.exports = sendMailValidation