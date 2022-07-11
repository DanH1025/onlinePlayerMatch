require('dotenv').config()
const mongoose = require('mongoose')

async function Connect () {
    try {
        console.log('connecting to mongose db')
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongose db')
    } catch (error) {
        console.error(error);
    }
}

Connect();
