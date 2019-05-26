const {typeHandler} = require("../Handlers/transactionHandler")
// const fsubStart=(fsub)=>{
//     return new Promise((resolve,reject)=>{
//         fsub.start(err=>{
//             if(!err){
//                 resolve("cool")
//             }else{
//                 reject("uncool")
//             }
//             })
//     })
// }

const broadCastSender = (peer,topic,data)=>{
    setTimeout(()=>{
        peer.pubsub.publish(
            topic,
            Buffer.from(data),
            (err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log(`published data to topic ${topic}`)
                }
            }
          )
    },2000)
    
    // fsub.publish('tincture',Buffer.from(data))
}

const broadCastReciever = (peer,topic)=>{
    peer.pubsub.subscribe(topic,
      (msg) =>{ 
          console.log(msg.from, JSON.parse(msg.data))
        //   typeHandler(msg.data)
    },
    (err)=>{
        if(err){
            console.log(err)
        }
    }
    )
}

module.exports = {broadCastReciever,broadCastSender}