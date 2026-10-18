const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','teacher'],
        required:true,
    },
    avatarUrl:{
        type:String,
        default:"",
    },
    emailVerified:{
        type:Boolean,
        default:false,
    },
    phoneVerified:{
        type:Boolean,
        default:false,
    }
},
   {
    timestamps:true
   });

module.exports = mongoose.model('user',userSchema);
