const mongoose = require('mongoose');


const betHistorySchema = new mongoose.Schema({
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
     }
    

}); 

//creating the model for mongoose and set the collection to the string specified "player"
const BetHistory = mongoose.model('bet_history', betHistorySchema);

module.exports = BetHistory;    