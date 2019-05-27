const {Tinstance,state} = require("./Main");
const {addTranasctionToPending,addNewBlockToChain,updateValidatorSet} = require("./handler")
const {broadCastSender} = require("../PeerOps/Broadcast")
const typeHandler= (data,peer)=>{
    let data1=JSON.parse(data)
    switch(JSON.parse(data1.type)){
        case 'newTransaction':
         let payload = data1.payload;
         addTranasctionToPending(payload.owner,payload.time,payload.signature)
         break;
        case 'newBlock':
        let newBlock = data1.payload
        addNewBlockToChain(newBlock)
        let sendPayload={
            type:'ready',
            payload: peer.id.toB58String()
        }
        broadCastSender(peer,'tincture',JSON.stringify(sendPayload))
        break;
        case 'voteBroadcast':
        let selectedDelegate=data1.payload
        Tinstance.delegationResult.push(selectedDelegate)
        let block = Tinstance.proofOfAuthority()
        if(block!==0){
            let sendPayload={
                type:"newBlock",
                payload:block
            }   
            broadCastSender(peer,'tincture',JSON.stringify(sendPayload))
        }
        break;
        case 'ready':
        let id = data1.payload.id;
        updateValidatorSet(id)
        let chosen=Tinstance.votePeer()
        let sendPayload={
            type:'voteBroadcast',
            payload:chosen
        }
        broadCastSender(peer,'tincture',JSON.stringify(sendPayload))
        break
        //state operations
        case 'addData':
        //add a new transaction later
        let songData=data1.payload
        state.song.push(songData)
        //add persistance
        break;
        case 'getSongs':
        let songs=state.song;
        let sendPayload={
            type:"response",
            payload:songs
        }
        broadCastSender(peer,'tincture',JSON.stringify(sendPayload))
        break;
        
    }
}
module.exports={typeHandler}