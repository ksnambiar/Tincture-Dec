const Block =require("../Block/Block");
const fs = require("fs")
const sha256 = require("crypto-js/sha256")

class Tincture {
    constructor(){
        this.chain=[]
        this.PendingTxns=[]
        this.validators=[]
        this.currDelegator=null
        this.peerInfo={}
        this.delegationResult=[]
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
    }
    addToPendingTransaction(txn){
        this.PendingTxns.push(txn)
    }
    restoreBlockchainData(data){
        this.chain=data
    }
    //delegation of peers
    votePeer(){
       this.currDelegator=this.validators[Math.floor(Math.random() * this.validators.length)]
       return this.currDelegator
    }
    //proof of authority implementation
    proofOfAuthority(){
        votes={}
        this.delegationResult.forEach(obj=>{
            if( obj in votes){
                votes[obj]+=1
            }else{
                votes[obj]=1
            }
        })
        let max=Object.keys(votes)[0]
        Object.keys(votes).forEach(obj=>{
            if(votes[max]<votes[obj]){
                max=obj
            }
        })
        //has to be updated later
        this.currDelegator=max
        if(this.currDelegator===this.peerInfo.id.toB58String()){
            let newBlock = new Block(this.chain.length,this.chain[this.chain.length-1].currHash,this.chain[this.chain.length-1].total_txn,new Date().getTime(),this.PendingTxns,this.validators,[sha256(this.peerInfo.id.privKey).toString()],"")
            newBlock.currHash=newBlock.calc_Hash()   
            //broadcast the new block
            return this.chain[this.chain.length-1]
        }else{
            //wait for the broadcast
            return 0
        }
    }
    // isChainValid(){
    //     for(let i=1;i<this.chain.length;++i){
    //         let currBlock = this.chain[i]
    //         let prevBlock = this.chain[i-1]
            
    //         if(currBlock.currHash!==currBlock.calc_Hash().toString()){
    //             console.log("1")
    //             console.log(currBlock.currHash)
    //             console.log(currBlock.calc_Hash().toString())
    //             return false
    //         }

    //         if(currBlock.prevHash!==prevBlock.currHash){
    //             console.log("2")
    //             return false
    //         }
    //     }
    //     if(!_.isEqual(this.chain[0],this.addGenesisBlock())){
    //         console.log(this.chain[0])
    //         console.log(this.addGenesisBlock())
    //         console.log("3")
    //         return false
    //     }
    //     if (!currentBlock.hasValidTransactions()) {
    //         return false;
    //     }
    //     return true
    // }

    //validation by peers
}

module.exports= {Tincture}