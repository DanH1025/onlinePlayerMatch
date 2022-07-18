const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorresponse')

exports.authenticateUsers = (req, res, next) => {
    const username = req.username;
    console.log("i want to know if you get here")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    console.log("wtf is going on???")
    if (token == null) {
        console.log("okay not here")
       return next(new ErrorHandler(" 1 You must be authenticated to access this resource"),401)
    }
    try {
        jwt.verify(token,proccess.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(401)
            req.user = user 
            next()
        })
    }
    catch(error) {
        return next(new ErrorHandler("2 You must be authenticated to access this resource",401))
    }
    
}

console.log("")

