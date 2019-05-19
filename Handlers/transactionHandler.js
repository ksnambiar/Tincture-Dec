const {Tinstance} = require("./Main");
const {addTranasctionToPending,addNewBlockToChain} = require("./handler")
const typeHandler= (data)=>{
    let data1=JSON.parse(data)
    switch(JSON.parse(data1.type)){
        case 'newTransaction':
         let payload = data1.payload;
         addTranasctionToPending(payload.owner,payload.time,payload.signature)
         break;
        case 'newBlock':
        let newblock = data1.payload
        addNewBlockToChain(newBlock)
        break;
        case 'voteBroadcast':
        let selectedDelegate=data1.payload
        Tinstance.delegationResult.push(selectedDelegate)
        break;
    }
}
module.exports={typeHandler}