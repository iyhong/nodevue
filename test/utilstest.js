const util = require('util');
const utils = require('../utils');

let str = 'NodeJS';

let enc = utils.encrytp(str);

let map = utils.makeMap('name','hong');
util.log('map>>>>>>', map.get('name'));


return;


util.log(enc);
util.log(utils.encrytp(str));


let dec = utils.decrypt(enc);
util.log(dec);


let sha2 = utils.encryptSha2(str);
util.log(sha2);
return;



let url = 'http://naver.com';

utils.ogsinfo(url, (err, ret)=>{
    util.log(err, ret);
});


util.log(utils.add(1,2));