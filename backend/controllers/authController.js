const jwt = require('jsonwebtoken')
const Player = require('../model/player')
const ErrorHandler = require('../utils/errorresponse')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')

exports.registerUser = async (req, res) => {
    console.log('player is registering')
    //authenticate user
    //testing tokens for now
    // const username = req.body.username
    // const user = {name : username}
    //const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    
    const {fullName, userName, phoneNumber, email, password} = req.body
    const player = await Player.create({
        fullName,
        userName,
        phoneNumber,
        email,
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

    if(!userName||!password) {
        return next(new ErrorHandler('Please enter email or password'),400)
    }
    const player = await Player.findOne({userName})

    if(!player) {
        return next(new ErrorHandler('Invalid usernam or password'),401)
    }
    const passwordMatch = await player.comparePassword(password)
    if (!passwordMatch) {
        return next(new ErrorHandler("Mismatching email and password"),401)
    }
    sendToken(player,200,res)
}
exports.logout = (req,res,next) => {
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success:true,
        message: 'Logged out'
    })
}

exports.forgotPassword = async (req,res,next) => {
    const player = await Player.findOne({email: req.body.email})
    console.log("We got the player")
    if (!player) {
        return next(new ErrorHandler('No user found with that email',404))
    }
    const resetToken = player.passwordResetToken()

    await player.save({validateBeforeSave: false})

    const resetUrl = `${req.protocol}://${req.get('host')}/api/reset/${resetToken}`

    const message = `reset your password using :\n\n${resetUrl}\n\n Ignore if 
                        you have not sent this email`

    try {
        await sendEmail({
            email: player.email,
            subject: 'Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${player.email}`
        })
    }
    catch(error) {
        player.resetPasswordExpires = undefined
        player.resetPasswordToken = undefined

        await player.save({validateBeforeSave : false})

        return next(new ErrorHandler(error.message,500))
    }
}
