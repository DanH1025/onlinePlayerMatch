require('dotenv').config()
const jwt = require('jsonwebtoken')
const Bet = require('../model/bets')
const BetHistory = require('../model/betHistory')
// const Match = require('../model/match')
const crypto = require('crypto')

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
            //console.log(matching[0])         
           
        
            if(matching.length > 1 ){  
                
                await Bet.findOneAndUpdate({playerId: matching[0].playerId} , 
                    {matchId: matching[1].betId })

                await Bet.findOneAndUpdate({playerId: matching[1].playerId} 
                    , {matchId: matching[0].betId})   
                                
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
    console.log('player one found')
    const player2Exists = await Bet.findOne({betId: betId2})
    console.log('player two found')

    if(player1Exists && player2Exists){       
      
        await BetHistory.create({
            betId1: player1Exists.betId,
            betId2: player2Exists.betId,
            betAmount: player1Exists.betAmount,
            status: 'complete'
        })
        player1Exists.remove().then(()=> console.log('player one removed'))
        player2Exists.remove().then(()=> console.log('player two removed'))
        // await Bet.findOneAndDelete({betId : betId1 })
        // await Bet.findOneAndDelete({betId: betId2})

        res.status(200).send('Bet Completed')
    }else{
        res.status(400).send('Player not found')
    }
    

}


module.exports ={
    approveBet,
    completeBet
    

}