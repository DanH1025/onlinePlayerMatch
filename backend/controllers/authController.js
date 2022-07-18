const jwt = require('jsonwebtoken')
const Player = require('../model/player')
const ErrorHandler = require('../utils/errorresponse')
const sendToken = require('../utils/jwtToken')

exports.registerUser = async (req, res) => {
    console.log('player is registering')
    //authenticate user
    //testing tokens for now
    // const username = req.body.username
    // const user = {name : username}
    //const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    
    const {fullName, userName, phoneNumber, password} = req.body
    const player = await Player.create({
        fullName,
        userName,
        phoneNumber,
        password
    })

    // const token = player.getSignedtoken()
    // return res.status(200).json(token)
    // //todo refresh tokens
    // //save refresh tokens to database
    sendToken(player,200,res)

}

exports.loginUser = async(req,res, next) => {
    const {userName, password} = req.body

    if(!email||!password) {
        return next(new ErrorHandler('Please enter email or password'),400)
    }
    const player = await Player.findOne({userName}.select('+password'))

    if(!user) {
        return next(new ErrorHandler('Invalid usernam or password'),401)
    }
    const passwordMatch = await player.comparePassword(password)
    if (!passwordMatch) {
        return next(new ErrorHandler("Mismatching email and password"),401)
    }
    sendToken(player,200,res)
}
