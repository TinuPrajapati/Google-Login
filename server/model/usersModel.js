const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    google_id:{
        type:Number,
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    image:{
        type:String,
    }
});

const User = mongoose.model("User",userSchema);

module.exports = User;