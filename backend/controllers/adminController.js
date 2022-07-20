require('dotenv').config()
const jwt = require('jsonwebtoken')
const Bet = require('../model/bets')
const BetHistory = require('../model/betHistory')
const Match = require('../model/match')


const approveBet = async (req,res)=>{
    const playerId = req.params.playerId;
    console.log(playerId + 'from admin contorller')

    const player = await Bet.findOne({playerId: playerId})
    if(!playerId){
        res.status(400).send('player not found')
    }else{
        await Bet.findOneAndUpdate({playerId: playerId} , {status: 'approved'});


        const matching = await Bet.find({status: 'approved' ,  betAmount: player.betAmount})
        // res.send(matching[0]);

        if(matching.length > 0 ){
            await Match.create({
                betId1: player.betId,
                betId2: matching[0].betId,
                betAmount: player.betAmount,
                status: 'on_going'
            })
        }






    }

}

module.exports ={
    approveBet
}