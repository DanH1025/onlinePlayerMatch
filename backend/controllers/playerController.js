

const setOnline = (req, res)=>{
    console.log('setting the player status to online')
    console.log(req.body)

    res.send(req.body)
}

const fetchAllPlayers = (req,res)=>{
    res.send('i will get u all the players info')
}



module.exports ={
    setOnline,
    fetchAllPlayers
   
}