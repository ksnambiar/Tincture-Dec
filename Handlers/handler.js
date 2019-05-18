const {ADD_DATA,REMOVE_DATA,CHANGE_DATA,RELOAD_DATA}=require("./type")
const {Tinstance} = require("./Main");
const Block= require("../Block/Block");
const {DataStoreTxn} = require("../Block/Transaction");
const {addChainData,addDataToChain,getBlocksCount,getChainData} = require("../PersistantStorage/ChainData");
const fs = require("fs");

const addTransactionToPending= () =>{
    let newTxn=new DataStoreTxn()
    Tinstance.addToPendingTransaction()
}
const reloadData=(data)=>{
    let tempChain=[]
    data.forEach((obj,i)=>{
        let blockObject=obj
        // this.height=lastLen+1;
        // this.currHash=""
        // this.prevHash=last_hash;
        // this.total_txn=total_txn+txns.length;
        // this.curr_txns=txns.length;
        // this.proof=proof;
        // this.timeStamp=timeStamp
        // this.txns=txns
        // this.validators=validator_set;
        // this.signatures=signatures;
        let tempBlock=new Block(blockObject.height,blockObject.prevHash,blockObject.total_txn,blockObject.curr_txns,blockObject.proof,blockObject.timeStamp,blockObject.txns,blockObject.validators,blockObject.signatures)
        tempBlock.currHash=tempBlock.calc_Hash()
        tempChain.push(tempBlock)
    })
    Tinstance.restoreBlockchainData(tempChain)
    console.log(Tinstance.chain)
    console.log("done reloading data")
}

const generateChain = ()=>{
    return new Promise((resolve,reject)=>{
        Tinstance.genGenesisBlock()
        .then(obj=>{Tinstance.chain.unshift(obj)
            addDataToChain(JSON.stringify(obj))            
            })
         .catch(obj=>{Tinstance.chain.unshift(obj)
            addDataToChain(JSON.stringify(obj)) 
        }
         )
    })
}

module.exports={reloadData,generateChain}