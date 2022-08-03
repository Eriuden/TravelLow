const UsersModel = require("../models/users.model")
const ObjectId = require('mongoose').Types.ObjectId


//le -password est en fait super simple, c'ets une précision pour select, prendre toutes les infos SAUF le password
module.exports.getAllUsers = async(req,res) => {
    const users = await UsersModel.find().select("-password")
    res.status(200).json(users)
}

//Permet de voir les info de l'utilisateurs

module.exports.userInfo = (req,res) => {
    console.log(req.params)
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

        //on le cherche par l'id
    UsersModel.findById(req.params.id, (err,docs) => {
        if (!err) res.send(docs)
        else console.log('id unknown: ' + err)
    }).select('-password')
}



module.exports.updateUser = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    try{

        //on appelle la bien nommée fonction permettant de trouver puis d'update
        //on cherche par l'id
        //puis on met des changements en bio
        await UsersModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new:true, upsert: true , setDefaultsOnInsert: true},
        // on a renvoyé le tout
            (err,docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({message: err})
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err})
    }
} 


module.exports.deleteUser= async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    try{
        //on appelle le modele avec une fonction remove, avant d'exécuter la requète, on précise que c'est l'id le guide
        await UsersModel.remove({ _id: req.params.id}).exec()
        res.status(200).json({ message: "Un voyage dans le gange"})
    } catch(err) {
        return res.status(500).json({message: err})
    }




}

module.exports.follow = async (req,res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        // ajout à la liste des abonnés
        await UsersModel.findByIdAndUpdate(
            req.params.id,
            // on ajoute l'id de la personne à suivre
            { $addToSet: { following: req.body.idToFollow }},
            { new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err)
            }
        )
        // ajout à la liste d'abonnements
        await UsersModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id }},
            { new: true, upsert: true},
            (err, docs) => {
                //if (!err) res.status(201).json(docs);
                if (err) 
                return res.status(400).json(err)
            }
        )  
    } catch (err) {
        return res.status(500).json ({ message: err})
    }
}

module.exports.unFollow = async (req,res) => {
    if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown : ' + req.params.id)

    try {
        await UsersModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow }},
            { new: true, upsert: true},
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err)
            }
        )
        // sortir de la liste d'abonnements
        await UsersModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id }},
            { new: true, upsert: true},
            (err, docs) => {
                //if (!err) res.status(201).json(docs);
                if (err) 
                return res.status(400).json(err)
            }
        ) 
    } catch (err) {
        return res.status(500).json ({ message: err})
    }
}