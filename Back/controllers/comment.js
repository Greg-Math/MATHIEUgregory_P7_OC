const models = require('../models')
const fs = require('fs')

exports.getComment = (req, res, next) => {
    models.Post.findAll({ where: {id: req.params.postid}})
    .then((postFound) => {
        if (!postFound) {
            return res.status(404).json({message: "Post inexistant."})
        }
    })
    models.Comment.findAll({ where: { postId: req.params.postid},
        include: [{
            model: models.User,
            attributes: ['username']
        }]
    })
    .then((comment) => {
        if (!comment) {
            return res.status(404).json({message: "Commentaires inexistant"})
        }
        res.status(200).json({comment})
    })
    .catch(error => {console.log(error); res.status(500).json({message: error.message})})
}

exports.createComment = (req, res, next) => {
    if (req.body.content <= 0) {
        return res.status(400).json({message: "Minimum 1 caractère dans le contenu."})
    }
    models.User.findOne({where: {id: req.auth}})
    .then(userFound => { 
        if (!userFound) {
            return res.status(401).json({message : "Requete non autorisée."})
        }
        models.Post.findOne({where: {id: req.params.postid}})
        .then(() => {
            models.Comment.create({
                content: req.body.content,
                UserId: req.auth,
                PostId: req.params.postid
            })
            .then(() => res.status(200).json({message: "Commentaire Publié."}))
            .catch(error => res.status(500).json({error: error.message}))
        })
        .catch(error => res.status(500).json({message: error.message}))
    })
    .catch(error => res.status(500).json({message: error.message}))
}

exports.deleteComment = (req, res, next) => {
    models.Comment.findOne({ where: {id: req.params.commentid}})
    .then(comment => {
        if (!comment) {
            return res.status(404).json({message: "Le commentaire n'existe pas"})
        }
        if (comment.UserId != req.auth && !req.isadmin) {
            return res.status(401).json({message: 'Requete non autorisée !'})
        }
        comment.destroy()
        .then(() => {res.status(200).json({message: "Commentaire Supprimé."})})
        .catch(error => res.status(400).json({message: error.message}))
    })
    .catch(error =>  res.status(500).json({message: error.message}))
}