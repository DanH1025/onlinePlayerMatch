
function isOnline(online){
   const element = document.querySelector('.networkStatus')
   if(online){
     element.innerHTML = 'online'
   }else{
    element.innerHTML = 'offline'
   }
}

window.addEventListener('load' , ()=>{
    isOnline(navigator.onLine)
    
    window.addEventListener('online' , ()=>{
        isOnline(true);
        // axios.post('')
    })
    window.addEventListener('offline', ()=>{
        isOnline(false)
    });
})