const mongoose = require('mongoose');


const playerSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    userName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required:true
    },
    status: {
        type: Boolean,
        required: true
    }    
    

}); 

//creating the model for mongoose and set the collection to the string specified "player"
const Player = mongoose.model('player', playerSchema);

module.exports = Player;