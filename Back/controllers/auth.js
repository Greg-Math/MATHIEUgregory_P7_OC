// Imports
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const models = require('../models')

// Regex
const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Controllers
exports.signup = (req, res, next) => {
    if (req.body.email == null || req.body.password == null || req.body.username == null || req.body.firstname == null || req.body.lastname == null) {
        return res.status(400).json({message: 'Des champs ne sont pas remplis.'})
    }
    if (req.body.username.length >= 15 || req.body.username.length <= 2) {
        return res.status(400).json({message: 'Le username doit avoir entre 3 et 14 caractères.'})
    }
    if (!emailReg.test(req.body.email)) {
        return res.status(400).json({message: 'Format adresse email incorrect.'})
    }
    if (validator.isStrongPassword(req.body.password)) {
        bcrypt.hash(req.body.password, 11)
        .then(hash => {
            const user = new models.User({
                email: req.body.email,
                password: hash,
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                admin: false,
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !', userId: user.id }))
            .catch(error => res.status(400).json({ error, message: error.message }));
        })
        .catch(error => res.status(500).json({ error, message: error.message }));
        }
    else {
        return res.status(403).json({message: 'Mot de passe pas assez sécurisé. Minimum 8 caratères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spéciaux'})
    }
};

exports.login = (req, res, next) => {
    models.User.findOne({where: { email: req.body.email }})
    .then(userFound => {
        if (!userFound) {
            return res.status(404).json({ error: 'Utilisateur non existant.' })
        }
        bcrypt.compare(req.body.password, userFound.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' })
            }
            res.status(200).json({
                id: userFound.id,
                isAdmin: userFound.admin,
                token: jwt.sign(
                    {userId: userFound.id,
                    admin: userFound.admin},
                    process.env.TOKEN_SECRET,
                    {expiresIn: '8h'}
                ) 
            });
        })
        .catch(error => res.status(500).json({ error, message : error.message }))
    })
    .catch(error => res.status(500).json({ error, message : error.message }))
};