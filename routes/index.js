const { Router } = require('express')
const router = Router()
const mainPageController = require('../controllers/mainPage-controller')
const userController = require('../controllers/user-controller')
const sendMailValidation = require('../validation/sendMail')
const adminController = require('../controllers/admin-controller')
const authMiddleware = require('../middlewares/auth')
const multer = require('multer')
const upload = multer({ dest: './public/'})


router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/sendMessage', sendMailValidation , mainPageController.sendMail)
router.get('/gallery_page', mainPageController.getGallery)
router.get('/services', mainPageController.getServices)
router.get('/refresh', userController.refresh)

router.get('/admin', authMiddleware, adminController.fetchData)
router.get('/admin/:id', authMiddleware, adminController.getById)
router.post('/admin/:id', authMiddleware, upload.single('image'), adminController.createData)
router.put('/admin/:id', authMiddleware, upload.single('image'), adminController.editData)
router.delete('/admin', authMiddleware, adminController.deleteData)


module.exports = router