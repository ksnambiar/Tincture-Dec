//creating node in here
const fs = require("fs");
const {handleStart,createPeer,existingPeer} = require("./PeerOps/PeerInit");
//bradcasting functions
const {broadCastSender,broadCastReciever} = require("./PeerOps/Broadcast");
const {typeHandler} = require("./Handlers/transactionHandler")
const {Tincture } = require("./BlockChain/Chain");
const {checkStateExistence,reloadStateData} = require("./PersistantStorage/ChainState");
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

function reloadState(){
  checkStateExistence().then(obj=>{
    console.log("state exists so reloading");
    reloadingStateData().then(data=>{
      
    })
  })
  .catch(err=>{

  })
}


// function loadState(){
//     checkState
// }

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
                            //   console.log("peer discovered:"+peer1.id.toB58String())

                            })
                            peer.pubsub.subscribe('topic',
                            (msg) => {console.log(msg.from, msg.data.toString())
                            typeHandler(msg.data.toString(),peer)
                            },
                            (err) => {
                                console.log("result")
                              console.log(err)
                            }
                            )
                          peer.once("peer:connect",(peer1)=>{
                            console.log("peer connected:"+peer1.id.toB58String())

                            })
                            broadCastSender(peer,'topic',"no no cat")


                            // setInterval(()=>{

                            // },2000)

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
