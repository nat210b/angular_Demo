const mongoose = require('mongoose');
const Schema = mongoose.Schema;

User = new Schema({
    name:{
        type:String
    },
    dob:{
        type:String
    },
    email:{
        type:String
    },
},
{
    collection:'user'
})
module.exports = mongoose.model('User',User);