const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken')
const authenticateUsers = require('../middlewares/authenticateUsers');






const {setOnline} = require('../controllers/playerController')


router.get('/' , (req,res)=>{
    res.sendFile( 'index.html')
})



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
router.get('/', (req, res)=>{
    res.status(200).json("this is the home url")
})

 
router.post('/setOnline', (req, res)=>{

    const {status} = req.body;
    console.log(status)
    // if(status){
    //     res.status(200).send('im online');
    // }else{
    //     res.status(404).send('im offline');
    // }

    res.status(200).send({status: 'it works , i got it'})
})
// router.post('/setOffline' , setOffline)



module.exports =  router;