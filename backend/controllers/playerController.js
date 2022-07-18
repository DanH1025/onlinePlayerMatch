

const setOnline = (req, res)=>{
    console.log('setting the player status to online')
    console.log(req.body)

    res.send(req.body)
}




module.exports ={
    setOnline,
   
}