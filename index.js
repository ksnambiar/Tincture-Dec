//creating node in here
const fs = require("fs");

const {handleStart,createPeer,existingPeer} = require("./PeerOps/PeerInit");



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
                        })
            })
        }
    })
}
main()