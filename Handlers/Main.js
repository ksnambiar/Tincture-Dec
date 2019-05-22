const {Tincture} =require("../BlockChain/Chain");
let Tinstance = new Tincture()
//main transaction handler
let state={}

module.exports={
    state,
    Tinstance
}