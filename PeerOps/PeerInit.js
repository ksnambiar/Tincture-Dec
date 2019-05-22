const multiaddr = require('multiaddr')
const PeerInfo = require('peer-info')
const {P2PNode} = require('../Bundle/Tbundle')
const fs = require("fs");

function createPeer(callback) {
  // create a new PeerInfo object with a newly-generated PeerId
  PeerInfo.create((err, peerInfo) => {
    if (err) {
      return callback(err)
    } 
    fs.writeFileSync(__dirname+"/../utils/node_address.json",JSON.stringify(peerInfo))
    console.log(peerInfo)
    // add a listen address to accept TCP connections on a random port
    const listenAddress = multiaddr(`/ip4/127.0.0.1/tcp/0`)
    peerInfo.multiaddrs.add(listenAddress)
    
    const peer = new P2PNode({peerInfo})
    // register an event handler for errors.
    // here we're just going to print and re-throw the error
    // to kill the program
    peer.on('error', err => {
      console.error('libp2p error: ', err)
      throw err
    })

    callback(null, peer)
  })
}
function existingPeer(peerInfo1,callback){
  // const listenAddress = multiaddr(`/ip4/127.0.0.1/tcp/0`)
  // peerInfo.multiaddrs.add(listenAddress)
PeerInfo.create(peerInfo1.id,(err,peerInfo)=>{
  if(err){
    throw err
  }
  const listenAddress = multiaddr(`/ip4/127.0.0.1/tcp/4001`)
    peerInfo.multiaddrs.add(listenAddress)
  console.log(peerInfo)
  const peer = new P2PNode({peerInfo})
  peer.on('error', err => {
    console.error('libp2p error: ', err)
    throw err
  })
  callback(null,peer)
})
  
}
function handleStart(peer) {
    // get the list of addresses for our peer now that it's started.
    // there should be one address of the form
    // `/ip4/127.0.0.1/tcp/${assignedPort}/ipfs/${generatedPeerId}`,
    // where `assignedPort` is randomly chosen by the operating system
    // and `generatedPeerId` is generated in the `createPeer` function above.
    const addresses = peer.peerInfo.multiaddrs.toArray()
    console.log('peer started. listening on addresses:')
    addresses.forEach(addr => console.log(addr.toString()))
}

module.exports={
  createPeer,
  handleStart,
  existingPeer
}