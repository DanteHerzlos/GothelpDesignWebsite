const sgMail = require('@sendgrid/mail')
const msg = require('../emails/message')
const config = require('config')
const { Router } = require('express')
const router = Router()
const { check, validationResult } = require('express-validator')

sgMail.setApiKey(config.get('APIKey'))

router.post(
    '/',
    [
        check('email', 'Некорректный Email!').normalizeEmail().isEmail(),
        check('tel', 'Некорректный номер телефона!').isMobilePhone(),
        check('fname', 'Поле "Имя" не может быть пустым!').exists(),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные для отправки сообщения',
                status: 'warning'
            })
        }
        const { email, fname, lname, tel, message } = req.body

        sgMail
            .send(msg( fname, lname, email, tel, message ))
            .then((response) => {
                res.status(201).json({ message:"Сообщение успешно отправлено!", status:'success'})
            })
            .catch((error) => {
                res.status(500).json({ message: 'Не удалось отправить сообщение' })
            })

    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})

module.exports = router