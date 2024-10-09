const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleid:String,
    name:String,
    email:String,
    image:String
},{timestamps:true});

const users = mongoose.model("user",userSchema);

module.exports = users;