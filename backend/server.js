const express = require('express')
require('dotenv').config()
const routes = require('./routes/routes')
const bodyParser= require('body-parser'); 
const db = require('./db connection/db');
const cookieparser = require('cookie-parser')




const app = express();


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cookieparser())


app.use('/api' , routes)


const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> console.log(`server running on port ${PORT}`)) 