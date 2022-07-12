const express = require('express')
require('dotenv').config()
const routes = require('./routes/routes')
const bodyParser= require('body-parser'); 
const connectDB = require('./db connection/db')

connectDB();


const app = express();


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true})); 


app.use('/api' , routes)


const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> console.log(`server running on port ${PORT}`)) 