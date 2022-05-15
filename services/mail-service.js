const nodemailer = require('nodemailer')
const config = require('config')

class MailService {

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: config.get('SMTP_HOST'),
            port: config.get('SMTP_PORT'),
            secure: true,
            auth: {
                user: config.get('EMAIL_USER'),
                pass: config.get('EMAIL_PASSWORD')
            }
        })
    }

    async sendMail(msg){
        await this.transporter.sendMail(msg)
    }
}

module.exports = new MailService()