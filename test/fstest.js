const fs = require('fs');
const util =  require('util');

fs.readFile(__dirname+'/test.json','utf-8', (err, data)=>{
    if(err) return console.error(err);

    util.log("data>>" , data);
});

util.log('---------------------');

// return;

const msgFile = __dirname+'/message.txt';
fs.writeFileSync(msgFile, 'Hello node.js 한글!!', (err) =>{
    if(err) throw err;
    util.log('The file has been saved!');
});

let data2 = fs.readFileSync(msgFile, 'utf-8');
util.log("data2>>", data2);

util.log("======================");