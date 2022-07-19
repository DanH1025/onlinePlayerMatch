const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken')
const authenticateUsers = require('../middlewares/authenticateUsers')
const authController = require('../controllers/authController')
const authenticateUsers = require('../middlewares/authenticateUsers');


router.post('/regPlayer' , authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/logout', authController.logout)
router.get('/resetPassword',authController.forgotPassword)



// router.post('/regPlayer' , (req, res)=> {
//     console.log('player is registering')
//     //authenticate user
//     //testing tokens for now
//     const username = req.body.username
//     const user = {name : username}
//     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

//     return res.status(200).json(token)
//     //todo refresh tokens 
//     //save refresh tokens to database
// })

router.get('/testroute',authenticateUsers.authenticateUsers, (req,res) => {
    console.log("congrats authenticated user")
    console.log(req.player)
    res.sendStatus(200)
})
router.get('/bet', authenticateUsers.authenticateUsers)



module.exports =  router;