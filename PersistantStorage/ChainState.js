const level = require("level");
const stateData = __dirname+"/../utils/stateData"
let db=level(stateData)
// Add data to levelDB with key/value pair
function addStateData(key,value){
    db.put(key, value, function(err) {
      if (err) return console.log('Block' + key + ' submission failed', err);
    })
}

// Get data from levelDB with key
function getStateData(key){
    db.get(key, function(err, value) {
      if (err) return console.log('Not found!', err);
      console.log('Value = ' + value);
    })
}

// function addDataToChain(value) {
//     let i = 0;
//     db.createReadStream().on('data', function(data) {
//           i++;
//         }).on('error', function(err) {
//             return console.log('Unable to read data stream!', err)
//         }).on('close', function() {
//           console.log('Block #' + i);
//           addChainData(i, value);
//         });
// }
function checkExistence(){
    return new Promise((resolve,reject)=>{
        db.get(0, function(err, value) {
            if(err){
                reject(false)
            }else{
                resolve(true)
            }
          })
    })
}

function reloadStateData(){
    let i=0;
    let stateLoaded={}
    db.createReadStream().on('data',function(data){
        stateLoaded.push(data)
    })
    .on('error',function(err){
        console.log(err)
    })
    .on('close',function(){
        return stateLoaded
    })
}

module.exports={addStateData,getStateData,reloadStateData}