const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorresponse')
const Player = require('../model/player')

exports.authenticateUsers = async (req, res, next) => {
    // const username = req.username;
    // console.log("i want to know if you get here")
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    // console.log(token)
    // console.log("wtf is going on???")
    const {token} = req.cookies
    try {
    if (!token) {
        //console.log("okay not here")
       return next(new ErrorHandler(" 1 You must be authenticated to access this resource"),401)
    }
    
   
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.player = await Player.findById(decoded.id)
        next()  
    }
    catch(error) {
        return next(new ErrorHandler("2 You must be authenticated to access this resource",401))
    }
    
}

console.log("")

