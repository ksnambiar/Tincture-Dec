const fs = require("fs")
class Block { 
    constructor(lastLen,last_hash="",total_txn=0,timeStamp,txns=[],validator_set=[],signatures=[],proof=""){
        this.height=lastLen+1;
        this.currHash=""
        this.prevHash=last_hash;
        this.total_txn=total_txn+txns.length;
        this.curr_txns=txns.length;
        this.proof=proof;
        this.timeStamp=timeStamp
        this.txns=txns
        this.validators=validator_set;
        this.signatures=signatures;
        //proof of work thing remove later
        this.nonce=0
    }
    calc_Hash(){
        //remove nonce later
        return sha256(this.nonce+this.prevHash+this.height+this.total_txn+this.curr_txns+this.proof+this.timeStamp+JSON.stringify(this.txns)+JSON.stringify(this.validators)+JSON.stringify(this.signatures))
    }
} 