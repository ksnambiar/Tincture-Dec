const level = require("level");
const chainData = __dirname+"/../utils/chainData"
let db=level(chainData)
// Add data to levelDB with key/value pair
function addChainData(key,value){
    db.put(key, value, function(err) {
      if (err) return console.log('Block ' + key + ' submission failed', err);
    })
}


// Get data from levelDB with key
function getChainData(key){
    db.get(key, function(err, value) {
      if (err) return console.log('Not found!', err);
      console.log('Value = ' + value);
    })
}

function addDataToChain(value) {
    let i = 0;
    db.createReadStream().on('data', function(data) {
          i++;
        }).on('error', function(err) {
            return console.log('Unable to read data stream!', err)
        }).on('close', function() {
          console.log('Block #' + i);
          addChainData(i, value);
        });
}

function reloadChainData(){
    let i=0;
    let chainLoaded=[]
    db.createReadStream().on('data',function(data){
        chainLoaded.push(data)
    })
    .on('error',function(err){
        console.log(err)
    })
    .on('close',function(){
        return chainLoaded
    })
}

module.exports={addChainData,getChainData,addDataToChain,reloadChainData}