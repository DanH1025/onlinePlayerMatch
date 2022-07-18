const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const playerSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    userName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required:true
    },    
    password: {
        type: String,
        required: true
    }

}); 
playerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

playerSchema.methods.getSignedtoken = function () {
    return jwt.sign({username: this.userName},process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE
    })
}
playerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
//creating the model for mongoose and set the collection to the string specified "player"
const Player = mongoose.model('player', playerSchema);

module.exports = Player;