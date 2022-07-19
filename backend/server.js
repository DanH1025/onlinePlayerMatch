const express = require('express')
require('dotenv').config()
const routes = require('./routes/routes')
const bodyParser= require('body-parser'); 
const db = require('./db connection/db');
const ejs = require('ejs');
const mongoose = require('mongoose')

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



io.on('connection' , function(socket){
    console.log('user is connected, update the database to true ');
    
    socket.on('disconnect', function(){
        
        console.log('user Disconnected, update the database to false')
    })
})


app.use(express.static('frontend'));

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true})); 



app.get('/' , (req,res)=>{     
    Player.find({}, function(err, player){
        res.render('index' , {
            playerList: player
        })
    })
})




app.use('/api' , routes)


const PORT = process.env.PORT || 5000

http.listen(PORT , ()=> console.log(`server running on port ${PORT}`)) 