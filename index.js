const express = require('express')
const config = require('config')
const path = require('path')
const sequeleze = require('./utils/database')
const router = require('./routes/index')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error')
const deafaultUser = require('./utils/defaultUser')
const User = require('./models/user')
const GalleryPhoto = require('./models/galleryPhoto')
const Service = require('./models/service')
const Token = require('./models/token')

const PORT = config.get('port') || 5000
const app = express()

app.use(express.static(__dirname + '/public'));
app.use(express.json({ extended: true }))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: config.get('CLIENT_URL')
}))

app.use('/api', router)
app.use(errorMiddleware)


if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function run() {
    try {
        await sequeleze.sync({})
        await deafaultUser()
        app.listen(PORT, () => console.log(`App has been started on port: ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

run()