const ogs = require('open-graph-scraper'),
      HashMap = require('hashmap'),
      Crypto = require('crypto-js'),
      SHA256 = require("crypto-js/sha256");


const EKey = 'nodevue';

module.exports = {

    makeMap(key, value) {
        const map = new HashMap();
        map.set(key, value);
        console.log('TTT>' , map.get(key));
        return map;
    },

    encryptSha2(data, key){
        if(!data) return null;
        key =  key || EKey;

        try{
            return Crypto.SHA256(data+key).toString();
        }catch(err){
            console.error('Error on encryptSha2::', err);
        }
    },

    encrytp(data, key) {
        return Crypto.AES.encrypt(data, key || EKey).toString();
    },

    decrypt(data, key) {
        return Crypto.AES.decrypt(data, key || EKey).toString(Crypto.enc.Utf8);
    },

    ogsinfo(url, fn){
        return ogs({url:url}, (err, result)=> {
            fn(err, result);
        });        
    },

    add (num1, num2){
        return num1+num2;
    }
}