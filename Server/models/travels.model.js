const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

const TravelsSchema = new mongoose.Schema(
    {
        posterId: {
            type: String,
            required: true
        },
        name:{
            type:String,
            required:true,
            maxlength: 100
        },
        message: {
            type: String,
            trim: true,
            maxlength: 1200
        },
        picture: {
            type:String,
        },
        video: {
            type: String,
        },
        likers: {
            type: [String],
            required: true,
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const TravelsModel = mongoose.model('travel',TravelsSchema)
module.exports = TravelsModel