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
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken : String,
    resetPasswordExpires : Date

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
    return jwt.sign({id: this._id},process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE
    })
}
playerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
playerSchema.methods.passwordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpires = Date.now() + 30 * 60 * 1000
    return resetToken
}
//creating the model for mongoose and set the collection to the string specified "player"
const Player = mongoose.model('player', playerSchema);

module.exports = Player;