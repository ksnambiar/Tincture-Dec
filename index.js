//creating node in here
const fs = require("fs");
const {handleStart,createPeer,existingPeer} = require("./PeerOps/PeerInit");
//bradcasting functions
const {broadCastReciever,broadCastSender} = require("./PeerOps/Broadcast");
const {typeHandler} = require("./Handlers/transactionHandler")
const {Tincture } = require("./BlockChain/Chain");
const {checkExistence,reloadChainData}= require("./PersistantStorage/ChainData")
const {reloadData,generateChain,updateValidatorSet,updatePeerInfo} = require("./Handlers/handler")
let chainInstance= new Tincture()
console.log(chainInstance)
let node

function startChain(){
    //check whether data on chain data exists?
    checkExistence()
    .then(bol=>{
        console.log("data exists so,reloading")
        reloadChainData().then(obj=>{
           reloadData(obj)
        }).catch(err=>{
            console.log(err)
            throw new Error("error at retrieving existing data")
        })

    })
    .catch(bol=>{
        console.log("data doesnt exist so generating")
        generateChain().then(obj=>{
        console.log("generted chain 1 \n")    
        })
        .catch(obj=>{
            console.log("generated chain 2 \n")
        })
    })
}
//includes the starting of the p2p node
function nodeOps(){
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
                  node=peer;
                  updatePeerInfo(peer)
                  
                  handleStart(peer)
                  peer.on("peer:discovery",(peer1)=>{
                    console.log("peer discovered:"+peer1.id.toB58String())
                  })
                  
              peer.once("peer:connect",(peer1)=>{
                  console.log("peer connected:"+peer1.id.toB58String())
                  updateValidatorSet(peer1.id.toB58String())
                  // broadCastSender(peer,"tincture",JSON.stringify({sidharth:"great"}))
                  })
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
                          node=peer
                          updatePeerInfo(peer)
                          handleStart(peer)
                          peer.on("peer:discovery",(peer1)=>{
                              console.log("peer discovered:"+peer1.id.toB58String())
                            })
                            
                        peer.once("peer:connect",(peer1)=>{
                            console.log("peer connected:"+peer1.id.toB58String())
                            updateValidatorSet(peer1.id.toB58String())
                            // broadCastSender(peer,"tincture",JSON.stringify({sidharth:"great"}))
                            })
                        broadCastReciever(peer,'tincture')
                            // peer.on ("peer:disconnect",(peer1)=>{
                            //     console.log("peer disconnected:"+peer1.id.toB58String())
                            //     })
                        })
            })
        }
    })
}

function main(){
    
    //start node
    startChain()
    //start chain
    nodeOps()
    //listen to messages and pass on to message handlers
}
// main()
main()