const config = require('config')

module.exports = function(fname, lname, email, tel, message){
    return {
        to: config.get("emailTo"),
        from: config.get("emailFrom"),
        subject: 'Gothelph Design new Message',
        html: `<strong>Имя:</strong> ${lname} ${fname}</br></br>
        <strong>Телефон:</strong> ${tel}</br></br>
        <strong>Email:</strong> ${email}</br></br>
        <strong>Сообщение:</strong></br>${message}`
    }
}