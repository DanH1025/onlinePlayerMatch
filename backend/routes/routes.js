const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken')
const authenticateUsers = require('../middleware/authenticateUsers')


router.post('/regPlayer' , (req, res)=> {
    console.log('player is registering')
    //authenticate user
    //testing tokens for now
    const username = req.body.username
    const user = {name : username}
    jwt.sign(user, process.env.ACCESS_TOKEN)

    //todo refresh tokens
    //save refresh tokens to database
})

router.post('/testroute',authenticateUsers, (req,res) => {
    console.log("congrats authenticated user")
})



module.exports =  router