const waterfall = require("async-waterfall");
const {P2PNode}=require("../Bundle/Tbundle");
const PeerInfo = require('peer-info')

let i=1
function startDiscovery(){
    waterfall([
        (cb) => PeerInfo.create(cb),
        (peerInfo, cb) => {
          peerInfo.multiaddrs.add('/ip4/0.0.0.0/tcp/0')
          node = new P2PNode({
            peerInfo
          })
          node.start(cb,(err=>{

          }))
        }
      ], (err) => {
          console.log(i+=1)
        if (err) { throw err }
      
        node.on('peer:discovery', (peer) => {
          // No need to dial, autoDial is on
          console.log('Discovered:', peer.id.toB58String())
        })
        node.on('peer:connect', (peer) => {
          console.log('Connection established to:', peer.id.toB58String())
        })
        node.on('peer:disconnect',(peer) => {
            console.log('Connection exited:', peer.id.toB58String())
        })
      })
}
startDiscovery()
module.exports={startDiscovery}