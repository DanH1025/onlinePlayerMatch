const mongoose = require('mongoose');


const betSchema = new mongoose.Schema({
    playerId:{
        type: String,
        required:true
    },   
    betAmount:{
        type: Number,
        required:true
    },
     
    

}); 

//creating the model for mongoose and set the collection to the string specified "player"
const Bets = mongoose.model('bet', betSchema);

module.exports = Bets;