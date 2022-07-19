const express = require('express')
require('dotenv').config()
const routes = require('./routes/routes')
const bodyParser= require('body-parser'); 
const db = require('./db connection/db');
const cookieparser = require('cookie-parser')
const ejs = require('ejs');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Bet = require('./model/bets')
const {playerSchema} = require('../backend/model/player')
// const playerSchema ={
//     id: String,
//     fullName: String,
//     userName: String,
//     phoneNumber: Number,
//     status: String,
// }
const Player = mongoose.model('player', playerSchema);


const app = express();

app.set('view engine' , 'ejs');



var http = require('http').createServer(app)
var io = require('socket.io')(http);

let players = [];
  
const addPlayer = (playerId, socketId) => {
  !players.some((player) => player.playerId === playerId) &&
    players.push({ playerId, socketId });
};



io.on('connection' , function(socket){
    console.log('user is connected, update the database to true ');
    // console.log('socket id ' + socket.id)
    
    socket.on('disconnect', function(){
        console.log('user Disconnected, update the database to false')
        players.map(player => {
            if(player.socketId==socket.id) {
                Bet.findOneAndDelete({playerId:player.playerId})
                console.log("deleted/deleting....")
            }
        })
    })

    socket.on('addPlayer', function(playerId){
        addPlayer(playerId,socket.id);
         console.log('socket id ' + socket.id)
    })
})


app.use(express.static('frontend'));

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cookieparser())



app.get('/' , (req,res)=>{ 
    const {token} = req.cookies
    console.log("token : "+token)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)   
    console.log(decoded.id)
    Player.find({}, function(err, player){
        res.render('index' , {
            playerList: player,
            playerId : decoded.id
        })
    })
})




app.use('/api' , routes)


const PORT = process.env.PORT || 5000

http.listen(PORT , ()=> console.log(`server running on port ${PORT}`)) 