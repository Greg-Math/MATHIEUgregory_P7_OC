const models = require('../models')
const fs = require('fs')

exports.getAllPosts = (req, res, next) => {
    const offset = +req.params.offset || 0
    models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }],
        order: [
            ['createdAt', 'DESC']
        ],
        offset,
        raw: true,
    })
    .then((post) => res.status(200).json({post}))
    .catch(error => res.status(500).json({message: error.message}))
}

exports.createPost = (req, res, next) => {
    let attachmentUrl
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({message: "Le post doit avoir un titre et un contenu."})
    }
    if (req.body.title.length <= 2 || req.body.content.length <= 0) {
        return res.status(400).json({message: "Minimum 3 caratères pour le titre et 1 caractère pour le contenu."})
    }
    if (req.file) {
        attachmentUrl = `${req.protocol}://${req.get('host')}/media/${req.file.filename}`
    }
    models.User.findOne({where: {id: req.auth}})
    .then(userFound => { 
        if (!userFound) {
            return res.status(401).json({message : "Requete non autorisée."})
        }
        models.Post.create({
            title: req.body.title,
            content: req.body.content,
            likes: 0,
            attachment: attachmentUrl,
            UserId: req.auth
        })
        .then(() => res.status(200).json({message: "Post publié"}))
        .catch(error => res.status(500).json({error: error.message}))
    })
}

exports.deletePost = (req, res, next) => {
    models.Post.findOne({ where: {id: req.params.id}})
    .then(post => {
        if (!post) {
            return res.status(404).json({message: "Le post n'existe pas"})
        }
        if (post.UserId != req.auth && !req.isadmin) {
            return res.status(401).json({message: 'Requete non autorisée !'})
        }
        let filename
        if (post.attachment) {
            filename = post.attachment.split('/media/')[1]
        }
        post.destroy()
        .then(() => {
            if (filename) {
                fs.unlinkSync(`media/${filename}`)
            }
            res.status(200).json({message: "Post Supprimé."})})
        .catch(error => res.status(500).json({message: error.message}))
        
    })
    .catch(error => res.status(500).json({message: error.message}))
}

exports.likePost = (req, res, next) => {
    models.User.findOne({where: {id: req.auth}})
    .then(userFound => {
        if (!userFound) {
            return res.status(401).json({message: 'Requete non autorisée !'})
        }
        models.Post.findOne({where: {id: req.params.id}})
        .then(postFound => {
            if (!postFound) {
                return res.status(404).json({message: 'Post Inexistant !'})
            }
            models.Like.findOne({where: {userId: req.auth, postId: req.params.id}})
            .then(likeFound => {
                if (likeFound) {
                    likeFound.destroy()
                    postFound.update({
                        likes: postFound.likes-1
                    })
                    return res.status(200).json({message: "Like supprimé.", postFound})
                }
                models.Like.create({
                    UserId: req.auth,
                    PostId: req.params.id
                })
                postFound.update({
                    likes: postFound.likes+1
                })
                return res.status(200).json({message: "Like pris en compte.", postFound})
            })
            .catch(error => res.status(500).json({message: error.message}))
        })
        .catch(error => res.status(500).json({message: error.message}))
    })
    .catch(error => res.status(500).json({message: error.message}))
}
    