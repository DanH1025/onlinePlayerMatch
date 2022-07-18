const express = require('express')
require('dotenv').config()
const routes = require('./routes/routes')
const bodyParser= require('body-parser'); 
const db = require('./db connection/db');


const app = express();

var http = require('http').createServer(app)
var io = require('socket.io')(http);

io.on('connection' , function(socket){
    console.log('user is connected ');

    socket.on('disconnect', function(){
        console.log('user Disconnected')
    })
})


app.use(express.static('frontend'));

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true})); 


app.use('/api' , routes)


const PORT = process.env.PORT || 5000

http.listen(PORT , ()=> console.log(`server running on port ${PORT}`)) 