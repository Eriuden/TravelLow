const UsersModel = require ('../models/users.model')
const jwt = require('jsonwebtoken')
const { signInErrors, signUpErrors } = require('../utils/errors.utils')

const maxAge= 3*24*60*60*1000

const createToken = (id) => {
    return jwt/sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

//Le controlleur permet les intéractions avec la BDD
//c'est donc là qu'on mets les fonctions de CRUD

//on requiert, exige quoi, le pseudo le mail et le mdp
//on try, on essaye, de créer avec ça un user
//et si ça marche, le code file une id au petit nouveau
//Si ca ne marche pas, il attrape l'erreur et nous l'envoie

module.exports.signUp = async (req,res) => {
    console.log(req.body)
    const {pseudo, email, password} = req.body

    try {
        const user = await UsersModel.create({pseudo, email, password});
        res.status(201).json({ user: user._id});
    }
    catch(err){
        const errors = signUpErrors(err)
        res.status(200).send({ errors })
    }
}

//Pour la co, on aurait pu demander le pseudo aussi
//Seulement un des deux, les deux ça n'a pas de sens
//Il va chercher la fonction login dans le modèle
//On met un cookie JWT pour la sécurité
//Si ca ne marche pas, il nous explique l'erreur

module.exports.signIn = async (req,res) => {
    const { email, password } = req.body

    try {
        const user = await UsersModel.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge})
        res.status(200).json({user: user._id})
    }
    catch(err){
        const errors = signInErrors(err)
        res.status(200).json({ errors })
    }
}

//Il invalide le cookie, et le fait durer une milliseconde
//On perd donc la co
//puis il renvoie à l'acceuil

module.exports.logout = (req,res) => {
    res.cookie('jwt', "", {maxAge: 1})
    res.redirect('/')
}