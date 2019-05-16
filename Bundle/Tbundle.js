const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const SECIO = require("libp2p-secio")
const Multiplex = require("libp2p-mplex")
const Bootstrap = require("libp2p-bootstrap")
const defaultsDeep = require('@nodeutils/defaults-deep')
const fs = require("fs");
const bootstrapers = fs.readFileSync(__dirname+"/../utils/bootstrap.json")
const DEFAULT_OPTS = {
  modules: {
    transport: [
      TCP
    ],
    connEncryption:[
        SECIO
    ],
    streamMuxer: [
        Multiplex
    ],
    peerDiscovery:[
        Bootstrap
    ]
  },
  config:{
      peerDiscovery:{
          autoDial: true,
          bootstrap:{
              interval:20000,
              enabled:true,
              list:JSON.parse(bootstrapers)
          }
      }
  }
}

class P2PNode extends Libp2p {
  constructor (opts) {
    super(defaultsDeep(opts, DEFAULT_OPTS))
  }
}


module.exports={
    P2PNode:P2PNode,
    bootstrapers
}