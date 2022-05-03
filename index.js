const express = require('express')
const config = require('config')
const sendMailRouter = require('./routes/sendMail')
const path = require('path')

const app = express()

app.use(express.json({ extended: true }))
app.use('/sendMessage', sendMailRouter)

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000
       
app.listen(PORT, () => console.log(`App has been started on port: ${PORT}`))