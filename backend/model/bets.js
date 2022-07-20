const mongoose = require('mongoose');


const betSchema = new mongoose.Schema({
    betId:{
        type:String,
        required: true
    },
    playerId:{
        type: String,
        required:true
    },   
    betAmount:{
        type: Number,
        required:true
    },
     status:{
        type: String,
        required: true
     },
     matchId: {
        type:String,
        default: ' ',
        
     }
    

}); 

//creating the model for mongoose and set the collection to the string specified "player"
const Bets = mongoose.model('bet', betSchema);

module.exports = Bets;