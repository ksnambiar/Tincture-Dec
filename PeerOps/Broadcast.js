const {typeHandler} = require("../Handlers/transactionHandler")
const fsubStart=(fsub)=>{
    return new Promise((resolve,reject)=>{
        fsub.start(err=>{
            if(!err){
                resolve("cool")
            }else{
                reject("uncool")
            }
            })
    })
}
const broadCastSender = (fsub,topic,data)=>{
    // peer.pubsub.publish(
    //     topic,
    //     Buffer.from(data),
    //     (err) => {
    //         if(err){
    //             console.log(err)
    //         }else{
    //             console.log(`published data to topic ${topic}`)
    //         }
    //     }
    //   )
    fsub.publish('tincture',Buffer.from(data))

}

const broadCastReciever = (peer,topic)=>{
    // peer.pubsub.subscribe(topic,
    //   (msg) =>{ 
    //       console.log(msg.from, JSON.parse(msg.data))
    //     //   typeHandler(msg.data)
    // }
    // )
}

module.exports = {broadCastReciever,broadCastSender,fsubStart}