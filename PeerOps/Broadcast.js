const {typeHandler} = require("../Handlers/transactionHandler")
const fsubStart=(fsub)=>{
    fsub.start(err=>{
        console.log(err)
        })
}
const broadCastSender = (peer,topic,data)=>{
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