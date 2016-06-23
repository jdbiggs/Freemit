var request = require('request');

exports.makeAddress = function(){
    return new Promise(function(resolve, reject) {   
        request('http://coinoutlet.biz:4700/newaddress', function (error, response, body) {
            if(error){
                console.log('ERROR'); 
                reject(error);
            }
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
        })
    }); //-- END PROMISE
}; // END FUNCTION


exports.getBallence = function(address){
    return new Promise(function(resolve, reject) {   
        request('http://coinoutlet.biz:4700/getbalance?address='+address, function (error, response, body) {
            if(error){
                console.log('ERROR');  
                reject(error); 
            }
            if (!error && response.statusCode == 200) {
            resolve(body);
            }
        })
    }); //-- END PROMISE
}; // END FUNCTION


exports.transferFunds = function(fromAddress, amount, toAddress, privateKey, currency){
    return new Promise(function(resolve, reject) {   
        request('http://coinoutlet.biz:4700/sendCurrency?fromAddress='+fromAddress+'&amount='+amount+'&toAddress='+toAddress+'&privateKey='+privateKey+'&currency='+currency+'&fromPhone='+fromPhone+'&toPhone='+toPhone, function (error, response, body) {
        if(error){
            console.log('ERROR');
            reject(error);  
        }
        if (!error && response.statusCode == 200) {
            resolve(body);
        }
    })
    }); //-- END PROMISE
}; // END FUNCTION