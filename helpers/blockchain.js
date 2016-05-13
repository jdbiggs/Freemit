'use strict';

var bitcoin = require('bitcoinjs-lib');
var request = require('request');

//------------------------- NEW BITCOIN ADDRESS -------------------------
exports.makeAddress = function () {
     return new Promise(function(resolve, reject) {         
        var key = bitcoin.ECKey.makeRandom();
        console.log(key);
        var net = process.env.BITCOIN_NET;
        console.log(net);
        var address = key.pub.getAddress(bitcoin.networks.net).toString();
        console.log(address);
        var wif = key.toWIF();
        console.log(wif);
        var keySet = {'bitcoinAddress':address, 'privateKey':wif};
        console.log(keySet);
          
        if(address && wif){
            resolve(keySet);
        }else{
            reject('Error');
        };
        
}); //-- END PROMISE
};// END FUNCTION

//------------------------- QUERY ADDRESS -------------------------
exports.queryAddress = function (bitcoinAddress) {
     return new Promise(function(resolve, reject) {
        request.get('http://testnet.api.coloredcoins.org:80/v3/addressinfo/'+bitcoinAddress, function (err, res, data) {
            
            if (err) {
                reject(err);
            }
            if (typeof body === 'string') {
                body = JSON.parse(body)
            }
            resolve(data);   
        });    
    }); //-- END PROMISE
};// END FUNCTION


//------------------------- TRANSFER AN ASSET ---------------------

exports.transferAsset = function (amount, assetID, fromAddress, toAddress) {
     return new Promise(function(resolve, reject) {
console.log('=== FROM ===');
var fromAddressArray = Array.from(fromAddress);
console.log(fromAddressArray);

        var send_asset = {
            'from': fromAddressArray,
            'fee': 5000,                                            
            'to': [{'address': toAddress, 'amount': amount, 'assetId': assetID }]
        };
        request.post({
            url: 'http://testnet.api.coloredcoins.org:80/v3/sendasset',
            headers: {'Content-Type': 'application/json'},
            form: send_asset
        }, 
        function (err, res, data) {
            if (err) {
                reject(err);
                console.log('=== TRANSFER ASSET ERROR ===');
                console.log(err);
            }
            if (typeof body === 'string') {
                body = JSON.parse(body)
                console.log('=== TRANSFER ASSET BODY ===');
                console.log(body);
            }
            resolve(data);   
        });
    }); //-- END PROMISE
};// END FUNCTION