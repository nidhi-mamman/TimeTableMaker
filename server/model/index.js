const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    //  fname email password securityQuestion securityAnswer
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    securityQuestion: {
        type: String,
        required: true
    },
    securityAnswer: {
        type: String,
        required: true
    },
})

module.exports = new mongoose.model("HOD", UserSchema)