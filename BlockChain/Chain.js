const Block =require("../Block/Block");
const fs = require("fs")
const sha256 = require("crypto-js/sha256")

class Tincture {
    constructor(){
        this.chain=[this.genGenesisBlock()]
        this.PendingTxns=[]
    }
    genGenesisBlock(){
        fs.readFile(__dirname+"/../utils/genesis.json",(err,data)=>{
            if(err){
                let genesis = new Block(-1,sha256("sha2569xa3s81qw6d2x1x38ve48q").toString(),0,new Date().getTime(),[],[],"")
                genesis.currHash=sha256(parsedData).toString()
                return genesis                
            }
            else
            {
                let parsedData = JSON.parse(data)
                let genesis = new Block(-1,sha256(parsedData).toString(),data.total_txn,data.timestamp,data.txns,data.validator_set,data.signatures,"")
                genesis.currHash=sha256(parsedData).toString()
                //lastLen,last_hash="",total_txn=0,timeStamp,txns=[],validator_set=[],signatures=[],proof=""
                return genesis
            }
        })
    }
    addToPendingTransaction(block){
        this.chain.push(block)
    }
    restoreBlockchainData(data){
        this.chain=data
    }
    //proof of authority implementation
    //validation by peers
}