const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

//mongoDB marche comme ça, on fait un schéma avec mongoose 
//dans chaque model pour créer la table
//en MERN il apparait qu'on revient à mon pote le MVC

//Le model est la base de la création de données
//comme dit son nom, il sert de modèle pour les créer

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type:String,
            required:true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim:true
        },
        email: {
            type:String,
            required:true,
            validate: [isEmail],
            lowercase: true,
            unique:true,
            trim:true
        },
        password: {
            type:String,
            required:true,
            max: 1024,
            minlength: 6   
        },
        picture: {
            type:String,
            default: "./uploads/profil/random-user.png"
        },
        bio : {
            type:String,
            max: 1024,
        },
        
    },
    {
        timestamps: true,
    }
)

//la méthode de salage en MERN (ca va c'est tranquillou)
//nécessite bcrypt et mongoose

userSchema.pre("save", async function(next) {
     const salt = await bcrypt.genSalt();
     this.password = await bcrypt.hash(this.password, salt)
     next();
})

//permet ici la comparaison des MDP pour
//éviter les problèmes entre le mdp et le hachage
//Il cherche d'abord le mail, puis compare les mdp
// si c'est bon, il le retourne
// Sinon, il nous dit ce qui va pas

userSchema.static.login = async function(email, password) {
    const user = await this.findOne({ email})
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('mot de passe incorrect')
    }
    throw Error('adresse mail incorrect')
}

const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel;