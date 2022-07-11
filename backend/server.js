const express = require('express')
require('dotenv').config()

const db = require('./db connection/db');

const app = express();


app.use(express.json())



const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> console.log(`server running on port ${PORT}`)) 