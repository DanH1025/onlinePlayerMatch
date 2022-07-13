

const setOnline = (req, res)=>{
    console.log('setting the player status to online')
    res.send('Online');
}


const setOffline = (req,res)=>{
    console.log('setting the player status to offline');
    res.send('offline');
}

module.exports ={
    setOnline,
    setOffline
}