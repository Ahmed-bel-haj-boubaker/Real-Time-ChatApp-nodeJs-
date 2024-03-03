const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
        type:String,
        required: true,
        minLength:3,
        maxLength:20,
        unique:true,
    },
    email: {
        type:String,
        required: true,
        unique:true,
    },
    password: {
        type:String,
        required: true,
        minLength:8,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    
    },
    avatarImage:{
        type:String,
        default:""
    }
  },
  {timestamps : true}
);
module.exports = mongoose.model("Users",userSchema)