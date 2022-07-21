require('dotenv').config()
const jwt = require('jsonwebtoken')
const Bet = require('../model/bets')
const BetHistory = require('../model/betHistory')
// const Match = require('../model/match')


const approveBet = async (req,res)=>{
    const playerId = req.params.playerId;
    console.log(playerId + 'from admin contorller')


    var matching_flag = true
 
    const player = await Bet.findOne({playerId: playerId})
    if(!playerId){
        res.status(400).send('player not found')
    }else{
        await Bet.findOneAndUpdate({playerId: playerId} , {status: 'approved'});

        while(matching_flag){
            const matching = await Bet.find({status: 'approved' ,  betAmount: player.betAmount})
            console.log(matching[0])    
        
            if(matching.length > 1 ){  
                
                await Bet.findOneAndUpdate({playerId: player.id} , {matchId: player.betId+matching[0].betId })

                await Bet.findOneAndUpdate({playerId: matching[0].playerId} , {matchId: player.betId+matching[0].betId})               
                    matching_flag = false
                    res.status(200).send('Match found!')                       
            

            }else{
                console.log('Matching...') 
            }
    
        }

       





    }

}


const completeBet = async (req,res)=>{    
const {betId1, betId2} = req.body
    

    //get player by its id
    const player1Exists = await Bet.findOne({betId: betId1});
    const player2Exists = await Bet.findOne({betId: betId2})

    if(player1Exists && player2Exists){        
        await Bet.findOneAndUpdate({
            betId: betId1,
            status: 'complete'
        })
        await Bet.findOneAndUpdate({
            betId: betId2,
            status: 'complete'
        })

        await BetHistory.create({
            betId1: player1Exists.betId,
            betId2: player2Exists.betId,
            betAmount: playerExists.betAmount,
            status: 'complete'
        })
        await Bet.findOneAndDelete({playerId: player1Exists.playerId})
        await Bet.findOneAndDelete({playerId: player2Exists.playerId})

        res.status(200).send('Bet Completed')
    }else{
        res.status(400).send('Player not found')
    }
    

}

module.exports ={
    approveBet,
    completeBet
    

}