// Imports
const models = require('../models')

// Controllers
exports.getMyProfile = (req, res, next) => {
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'firstname', 'lastname'],
        where: {id: req.params.id}})
        .then(myprofile => {
            if (!myprofile) {
                return res.status(404).json({message: 'Profil introuvable.'})
            }
            res.status(200).json(myprofile)})
        .catch(error => {
            res.status(500).json({error, message : error.message})
        })
}

exports.getAllProfile = (req, res, next) => {
    models.User.findAll({
        attributes: { exclude: ['password']}
    })
    .then((User) => res.status(200).json({User}))
    .catch((error) => res.status(500).json({message: error.message}))
}

exports.modifyProfile = (req, res, next) => {
    if (req.params.id != req.auth && !req.isadmin) {
        return res.status(401).json({message: 'Requete non autorisée !'})
    }
    models.User.update({ 
        email: req.body.email, username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname}, {
            where: {id: req.params.id}
        })
    .then(() => res.status(200).json({message : 'Profil modifié.'}))
    .catch(error => res.status(400).json({error, message : error.message}))
}

exports.deleteProfile = (req, res, next) => {
    if (req.params.id != req.auth && !req.isadmin) {
        return res.status(401).json({message: 'Requete non autorisée !'})
    }
    models.User.findOne({ where: {id: req.params.id}})
        .then((myprofile) => {
            if (!myprofile) {
                return res.status(404).json({message: "Profil introuvable."})
            }
            myprofile.destroy()
            .then(() => res.status(200).json({message: "Profil supprimé."}))
            .catch(error => res.status(500).json({error, message : error.message}))
        })
        .catch(error => res.status(500).json({error, message: error.message}))
}