const express = require('express');
const router =  express.Router();

const {setOnline, setOffline} = require('../controllers/playerController')


router.get('/', (req, res)=>{
    res.send("this is the home url")
})

router.post('/setOnline', setOnline)
router.post('/setOffline' , setOffline)



module.exports =  router;