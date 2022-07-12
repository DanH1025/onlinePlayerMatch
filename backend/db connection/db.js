require('dotenv').config()
const mongoose = require('mongoose')

const playerData = require('../playerData')
const player = require('../model/player')

    
 
async function Connection  () {
    try{ 
        console.log('connecting to database')
        await mongoose.connect(process.env.MONGO_URL , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DataBase")

    }catch(error){
        console.error("DataBase connection faild");
        console.log(error);
        process.exit(1);
    }
}

  

Connection();

// const players = mongoose.model('players' , playerSchema , '' )




// const importData = async ()=>{
//     try{
//         //first delete every product in the database
//         await player.deleteMany({});

//         //insert product data to database 
//         await player.insertMany(playerData);

//         console.log("Data Import Success");
//         process.exit();

//     }catch(error){
//         console.log("Data Import Failed");
//         console.log(error);
//         process.exit(1);
//     }
// };
// importData() 

