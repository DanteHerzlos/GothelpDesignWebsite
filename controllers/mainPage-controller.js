const GalleryPhoto = require('../models/galleryPhoto')
const Service = require('../models/service')
const mailService = require('../services/mail-service')
const msg = require('../emails/message')


class mainPageController{
    async getGallery(req, res, next) {
        try {
            const data = await GalleryPhoto.findAll({
                attributes: ['id', 'title', 'body', 'modalBody', 'position', 'imgPath'],
                order: [['position', 'ASC']]
            })
            res.status(200).json({data})
        } catch (e) { next(e) }
    }

    async getServices(req, res, next) {
        try {
            const data = await Service.findAll({
                attributes: ['id', 'title', 'body', 'position', 'imgPath'],
                order: [['position', 'ASC']]
            })
            res.status(200).json({data})
        } catch (e) { next(e) }
    }

    async sendMail(req, res, next) {
        try {          
            const { email, fname, lname, tel, message } = req.body
            await mailService.sendMail(msg( fname, lname, email, tel, message ))
            res.status(201).json({ message:"Сообщение успешно отправлено!", status:'success'})
        } catch (e) { next(e) }
    }
}



module.exports = new mainPageController()