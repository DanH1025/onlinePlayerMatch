const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken')
const authenticateUsers = require('../middlewares/authenticateUsers')
const authController = require('../controllers/authController')

const {setOnline, setOffline} = require('../controllers/playerController')

router.post('/regPlayer' , authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/logout', authController.logout)
router.get('/resetPassword',authController.forgotPassword)
router.get('/testroute',authenticateUsers.authenticateUsers, (req,res) => {
    console.log("congrats authenticated user")
    console.log(req.player)
    res.sendStatus(200)
})
router.get('/bet', authenticateUsers.authenticateUsers)



module.exports =  router;