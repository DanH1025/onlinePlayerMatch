const jwt = require('jsonwebtoken')

const authenticateUsers = (req, res, next) => {
    const username = req.username;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        res.status(401)
    }
    jwt.verify(token,proccess.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401)
        req.user = user
        next()
    })
}

module.exports = authenticateUsers