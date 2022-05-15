const User = require('../models/user')
const GalleryPhoto = require('../models/galleryPhoto')
const Service = require('../models/service')
const { unlink } = require('node:fs')
const path = require('path')
const bcrypt = require('bcrypt')


class AdminController {
    async fetchData(req, res, next) {
        try {
            const table = req.query['table']
            let data = [{}]
            switch (table) {
                case 'users': 
                    data = await User.findAll({attributes: ['id' ,'name', 'email', 'createdAt']})
                    break
                case 'gallery_photos': 
                    data = await GalleryPhoto.findAll({
                        attributes: ['id', 'title', 'body', 'modalBody', 'position', 'imgPath', 'createdAt'],
                        order: [['position', 'ASC']]
                    })
                    break
                case 'services':
                    data = await Service.findAll({
                        attributes: ['id', 'title', 'body', 'position', 'imgPath', 'createdAt'],
                        order: [['position', 'ASC']]
                    })
                    break
                default:
                    data = [{}]
            }
            if (data.length === 0) { data = [{}] }
    
            const allTables = [ 'gallery_photos', 'services', 'users' ]
            res.status(200).json({allTables, data})
        } catch (e) { next(e) }
    }

    async getById(req, res, next){
        try {
            let fields = [{}]
            let values = [{}]
            switch (req.url.split('?').shift().split('/').pop()) {
                case 'users': fields = [ 'name', 'email', 'encryptedPassword']
                    if (req.query.id){
                        values = await User.findOne({
                            attributes: ['name', 'email'], 
                            where: {id: req.query.id}
                        })
                    }
                    break
                case 'gallery_photos': fields = [ 'title', 'body', 'modalBody', 'position', 'imgPath']
                    if (req.query.id){
                        values = await GalleryPhoto.findOne({
                            attributes: [ 'title', 'body', 'modalBody', 'position', 'imgPath'],
                            where: {id: req.query.id}
                        })
                    }
                    break
                case 'services': fields = [ 'title', 'body', 'position', 'imgPath']
                    if (req.query.id){
                        values = await Service.findOne({
                            attributes: [ 'title', 'body', 'position', 'imgPath'],
                            where: {id: req.query.id}
                        })
                    }
                    break
                default:
                    fields = [{}]
                    values = [{}]
            }
            res.status(200).json({fields, values})
        } catch (e) { next(e) }
    }

    async createData(req, res, next){
        try {
            const data = {...req.body}
            if ( req.file ){
                data['imgPath'] = req.file.filename
            }
            switch (req.url.split('/').pop()){
                case ('users'): 
                    const values = await User.findOne({
                        where: {email: data.email}
                    })
                    if (!values){
                        const hashPassword = await bcrypt.hash(data['encryptedPassword'] ,10)
                        data['encryptedPassword'] = hashPassword
                        await User.create(data)
                        res.status(201).json({message: 'Created successfully'})
                    }else{
                        res.status(400).json({message: 'Такой пользователь уже существует'})
                    }
    
                break
                case ('gallery_photos'): 
                    await GalleryPhoto.create(data)
                    res.status(201).json({message: 'Created successfully'})
                break
                case ('services'): 
                    await Service.create(data)
                    res.status(201).json({message: 'Created successfully'})
                break
            }
            
        } catch (e) {
            if (req.file){
                unlink(req.file.path, () => {
                    console.log(`${req.file.path} was deleted`);
                })
            }
            next(e)
        }
    }

    async editData(req, res, next) {
        
        try {
            const id = req.query['id']
            const data = {...req.body}
            if ( req.file ){
                data['imgPath'] = req.file.filename
                const fileName = await GalleryPhoto.findOne({attributes: ['imgPath'], where: {id}})
                const filePath = path.join(__dirname, '..','public', fileName.imgPath)
                unlink(filePath, err => {
                    if(err){
                        console.log(err)
                    } else {
                        console.log(`${filePath} old file was deleted`);
                    }
                })
            }
            switch (req.url.split('?').shift().split('/').pop()){
                case ('users'): 
                    const hashPassword = await bcrypt.hash(data['encryptedPassword'] ,10)
                    data['encryptedPassword'] = hashPassword
                    await User.update( { ...data },  { where: { id }})
                break
                case ('gallery_photos'): 
                    await GalleryPhoto.update( { ...data },  { where: { id }})
                break
                case ('services'): 
                    await Service.update( { ...data },  { where: { id }})
                break
            }
            res.status(200).json({message: 'Edited successfully'})
        } catch (e) {
            if (req.file){
                unlink(req.file.path, () => {
                    console.log(`${req.file.path} was deleted`);
                })
            }
            next(e)
        }
    }

    async deleteData(req, res, next) {
        try {
            const {id} = {...req.body}
            let fileName
            let filePath
            switch(req.query['table']){
                case ('users'):
                    await User.destroy({where: {id}})
                break
                case ('gallery_photos'):
                    fileName = await GalleryPhoto.findOne({attributes: ['imgPath'], where: {id}})
                    filePath = path.join(__dirname, '..','public', fileName.imgPath)
                    await GalleryPhoto.destroy({where: {id}})
                    unlink(filePath, err => {
                        if(err){
                            console.log(err)
                        } else {
                            console.log(`${filePath} was deleted`);
                        }
                    })
                break
                case ('services'):
                    fileName = await Service.findOne({attributes: ['imgPath'], where: {id}})
                    filePath = path.join(__dirname, '..','public', fileName.imgPath)
                    await Service.destroy({where: {id}})
                    unlink(filePath, err => {
                        if(err){
                            console.log(err)
                        } else {
                            console.log(`${filePath} was deleted`);
                        }
                    })
                break
            }
            res.status(200).json({message: 'Deleted successfully'})
        } catch (e) { next(e) }
    }
}

module.exports = new AdminController()