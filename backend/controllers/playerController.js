require('dotenv').config()
const jwt = require('jsonwebtoken')
const Bet = require('../model/bets')
const db = require('../db connection/db');

const setOnline = (req, res)=>{
    console.log('setting the player status to online')
    console.log(req.body)

    res.send(req.body)
}

const fetchAllPlayers = (req,res)=>{
    res.send('i will get u all the players info')
}

const submitBet = async (req,res)=>{

    // player can not bet if there is a pending bet with that player id 
    // add status to bet schema 
    


    const {betAmount} = req.body;
    const {token} = req.cookies
    console.log("token : "+token)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)   
    console.log(decoded.id)

    const bet =  await Bet.create({
        playerId: decoded.id,
        betAmount
    })


    

    res.sendStatus(200)


}



module.exports ={
    setOnline,
    fetchAllPlayers,
    submitBet
   
}