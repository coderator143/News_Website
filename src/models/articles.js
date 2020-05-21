const mongoose = require('mongoose')

const articlesSchema = new mongoose.Schema({    
    description : {
        type : String,
        trim : true,
        required : true
    },
    isProofRead : {
        type : Boolean,
        default : false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    article_by : {
        type : String,
        required : true
    },
    images : {
        type : String
    }
}, {
    timestamps : true
})

const Articles = mongoose.model('Articles', articlesSchema)

module.exports = Articles