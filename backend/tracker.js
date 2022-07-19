



// window.addEventListener('load', ()=>{
//     DisplayIsOnline(navigator.onLine)
//     // getting network status
//     window.addEventListener('online', ()=>{
//         DisplayIsOnline(true)
//         updateStatus(true)
//         //displaying online status
//     })
//     window.addEventListener('offline', ()=>{
//         DisplayIsOnline(false)
//         updateStatus(false)
//         // displaying offline  status
//     })
    
// })



//  function updateStatus(online){
//     //player info is required
//     //but for now we can just do network status
//     if(online){
//         console.log('setting the status to online')
//             fetch('http://localhost:5000/api/setOnline' , {
//             method: 'POST',
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify({
//                 status: 'this is the status being sent when online  '
//             })
//         })
        
//         }else{
//         console.log('setting the status to offline')        
//     }
// }

// function DisplayIsOnline(online){
//    const element = document.querySelector('.status')
//    if(online){
//      element.innerHTML = 'online'
     
//    }else{
//     element.innerHTML = 'offline' 
//    }
// }


// // window.addEventListener('load' , ()=>{
// //     isOnline(navigator.onLine)
// //     console.log(navigator.onLine)
// //     console.log('after getting the status')

// //     window.addEventListener( 'online' , ()=>{
// //         console.log('inside online loader')
// //         isOnline(true)
// //         DisplayIsOnline(true)
// //         console.log('setting status to true')
// //     })
// //     window.addEventListener('offline', ()=>{
// //         console.log('inside offline loader')
// //         isOnline(false);

// //         DisplayIsOnline(false)
// //         console.log('setting the status to false')
// //     });
// // })


// // async function isOnline (online){
// //     console.log('getting the user network status')
// //     if(online){
// //         const res = await fetch(baseUrl,{
// //             method: 'POST',
// //             headers:{
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify({
// //                 status: online
// //             })
// //         })
// //         console.log(res)
// //     }else{
// //         console.log('ill post that its false')
// //     }
// // }
