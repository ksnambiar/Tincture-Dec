const Block =require("../Block/Block");
const fs = require("fs")
const sha256 = require("crypto-js/sha256")

class Tincture {
    constructor(){
        this.chain=[]
        this.PendingTxns=[]
        this.validators=[]
    } 
    genGenesisBlock(){
        return new Promise((resolve,reject)=>{
            fs.readFile(__dirname+"/../utils/genesis.json",(err,data)=>{
                if(err){
                    let genesis = new Block(-1,sha256("sha2569xa3s81qw6d2x1x38ve48q").toString(),0,new Date().getTime(),[],[],"")
                fs.writeFileSync(__dirname+"/../utils/genesis.json",JSON.stringify(genesis))
                    genesis.currHash=genesis.calc_Hash()
                
                reject(genesis)     
            }
            else
            {
                let parsedData = JSON.parse(data)
                let genesis = new Block(-1,sha256(parsedData).toString(),parsedData.total_txn,parsedData.timeStamp,parsedData.txns,parsedData.validator_set,parsedData.signatures,"")
                genesis.currHash=genesis.calc_Hash()
                //lastLen,last_hash="",total_txn=0,timeStamp,txns=[],validator_set=[],signatures=[],proof=""
                resolve(genesis)
            }
        })
        })
        // fs.readFile(__dirname+"/../utils/genesis.json",(err,data)=>{
        //     if(err){
        //         let genesis = new Block(-1,sha256("sha2569xa3s81qw6d2x1x38ve48q").toString(),0,new Date().getTime(),[],[],"")
        //         genesis.currHash=genesis.calc_Hash()
        //         return genesis                
        //     }
        //     else
        //     {
        //         let parsedData = JSON.parse(data)
        //         let genesis = new Block(-1,sha256(parsedData).toString(),data.total_txn,data.timestamp,data.txns,data.validator_set,data.signatures,"")
        //         genesis.currHash=genesis.calc_Hash()
        //         //lastLen,last_hash="",total_txn=0,timeStamp,txns=[],validator_set=[],signatures=[],proof=""
        //         return genesis
        //     }
        // })
    }
    addToPendingTransaction(txn){
        this.PendingTxns.push(txn)
    }
    restoreBlockchainData(data){
        this.chain=data
    }
    //proof of authority implementation
    //validation by peers
}

module.exports= {Tincture}