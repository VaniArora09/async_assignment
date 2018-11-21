 
exports.mult= function(num1,num){
    return new Promise((resolve,reject)=>{
        if(!num1 && !num2){
            return reject("parameter missing")
        }
        let c= num1*num2;
        return resolve(c)
    });
}

exports.div= function(num1,num){
    return new Promise((resolve,reject)=>{
        if(!num1 && !num2){
            return reject("parameter missing")
        }
        let c= num1/num2;
        return resolve(c)
    });
}