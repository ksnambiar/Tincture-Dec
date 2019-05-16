//creating node in here
const fs = require("fs");
const {handleStart,createPeer,existingPeer} = require("./PeerOps/PeerInit");

//bradcasting functions
const {broadCastReciever,broadCastSender} = require("./PeerOps/Broadcast");



function main(){
    fs.readFile(__dirname+"/utils/node_address.json",(err,data)=>{
        
        if(err){
            console.log(err)
            console.log(1)
            createPeer((err, peer) => {
                if (err) {
                  throw err
                }
                
                peer.start(err => {
                  if (err) {
                    throw err
                  }
                
                  handleStart(peer)
                })
                }) 
        }else{
            let result=JSON.parse(data)
            console.log(2)
            existingPeer(result,(err,peer)=>{
                if (err) {
                          throw err
                        }
                        
                        peer.start(err => {
                          if (err) {
                            throw err
                          }
                        
                          handleStart(peer)
                          peer.on("peer:discovery",(peer1)=>{
                              console.log("peer discovered:"+peer1.id.toB58String())
                            })
                            
                        peer.on("peer:connect",(peer1)=>{
                            console.log("peer connected:"+peer1.id.toB58String())
                            broadCastSender(peer,"tincture",JSON.stringify({sidharth:"great"}))
                            })
                            peer.on("peer:disconnect",(peer1)=>{
                                console.log("peer disconnected:"+peer1.id.toB58String())
                                })
                        })
            })
        }
    })
}
main()