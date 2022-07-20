require('dotenv').config()
const jwt = require('jsonwebtoken')
const Bet = require('../model/bets')
const BetHistory = require('../model/betHistory')
const db = require('../db connection/db');





const submitBet = async (req,res)=>{

    // player can not bet if there is a pending bet with that player id 
    // add status to bet schema 
    //set bet limit logic to be modified
    


    const {betAmount} = req.body;
    const {token} = req.cookies
    console.log("token : "+token)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)   
    console.log(decoded.id)

    //checking if player already exits 
        const playerExists = await Bet.find({playerId: decoded.id});
    console.log('this user is hearer already '+ playerExists)
    // res.send(playerExists)
    var pendingFlag = false;
    playerExists.map(player=> {
        if(player.status == 'pending' || player.status == 'approved'){
            pendingFlag=true
        }else{
          
        }

    })
    console.log('pending Flag == ' + pendingFlag)

    //generating bet id
    const date = new Date()
    const betId = date
    console.log('bet id generated : ' + betId)

    // console.log(playerExists.status)
    
    if(playerExists){
        if(pendingFlag){
            res.status(400).send('Player exists with on going bet , please complete bet before tying again ')
        }else{
            if(betAmount < 10 || betAmount > 1000){
                res.status(401).send('Invalid Bet Amount Range , please select from provided beting range table')
            }else{
                const bet =  await Bet.create({
                    betId: betId,
                    playerId: decoded.id,
                    betAmount,
                    status: 'pending'
                })
                res.status(200).send('Bet placed');
            }
            
        }
       
    }else{

        if(betAmount < 10 || betAmount > 1000){
            res.status(401).send('Invalid Bet Amount Range , please select from provided beting range table')
        }else{
            const bet =  await Bet.create({
                betId: betId,
                playerId: decoded.id,
                betAmount,
                status: 'pending'
            })
            res.status(200).send('Bet placed');
        }
    }

}

const completeBet = async (req,res)=>{    
    const {token} = req.cookies
    console.log("token : "+token)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)   
    console.log(decoded.id)

    //get player by its id
    const playerExists = await Bet.findOne({playerId: decoded.id});

    if(playerExists){        
        await Bet.findOneAndUpdate({
            playerId: decoded.id,
            status: 'complete'
        })
        await BetHistory.create({
            betId: playerExists.betId,
            playerId: playerExists.playerId, 
            betAmount: playerExists.betAmount,
            status: 'complete'
        })
        await Bet.findOneAndDelete({playerId: playerExists.playerId})

        res.status(200).send('Bet Completed')
    }else{
        res.status(400).send('Player not found')
    }
    

}

module.exports ={  
    submitBet,
    completeBet
   
}