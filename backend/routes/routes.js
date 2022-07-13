const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken')
const authenticateUsers = require('../middlewares/authenticateUsers')


router.post('/regPlayer' , (req, res)=> {
    console.log('player is registering')
    //authenticate user
    //testing tokens for now
    const username = req.body.username
    const user = {name : username}
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    return res.status(200).json(token)
    //todo refresh tokens
    //save refresh tokens to database
})

router.get('/testroute',authenticateUsers.authenticateUsers, (req,res) => {
    console.log("congrats authenticated user")
    res.send(200)
})



module.exports =  router