var Promise            = require('bluebird');
var async              = require('async');
var eventEmitter       = require('events');

var services           = require('./services');

exports.setImmediateAndSetTimeout= function(req,res){
    var events  = new eventEmitter();
    
    console.log("start");
   
    setImmediate(()=>{
        console.log("set");
    });
   
    events.on('1',()=>{
        console.log(HTMLDirectoryElement);
      });
   
      events.on('2',()=>{
       console.log(People);
      });
   
      events.on('3',()=>{
       console.log("How are you!!!!!!!!!!!!!");
    });
   
    events.emit('1');
    events.emit('2');
    events.emit('3');
   
    console.log('end');
   
    return ({status:200,message:"(successful",data:{}});
   }

   exports.basicPromises= function(req,res){
    let num1   = req.body.num1;
    let num2   = req.body.num2;
    let result = {};

    Promise.coroutine(function*(){

        let mul = yield services.mult(num1,num2);
        let div = yield services.div(num1,num2);
        result = {
            multiply : mul,
            div      : div
        };

        return result;
    })().then((result)=>{
        return result;
    },(error)=>{
        return error;
    })
}

exports.basicAuto= function(req,res){
    console.log("tyhe body is.....",req.body);
    var num1 = req.body.num1;
    var num2 = req.body.num2;

    async.auto({
        addition : function(cb) {
            return cb(null,(num1+num2))
        } ,
        multi : function(cb){
            return cb(null,(num1*num2));
        },
        div : ['addition','multi',function(result,cb){            
            let c = Number((num1/num2).toFixed(4));            
             return cb(null,c);
        }] 
    },function(err,result){
        if(err){
            return error;
        } else {            
            return result;
        } 
    })
}

exports.basicAwait= function(req,res){
    var num1   = req.body.first_no;
    var num2   = req.body.second_no;
    var result = {};

    try{
        var mul = await services.mult(num1,num2);
        var div = await services.div(num1,num2);

        data = {
            multiply : mul,
            div      : div
        };
        return data;

    } catch(e){
        return e;
    }    
}
exports.basicWaterfall= function(req,res){
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    
    async.waterfall([
        function(cb){
            var a= num1 + num2
            return cb(null,null);
    
        }, function(result,cb){
            var b = num1 * num2;
            return cb(null,null);
    
        } , function(result,cb){
            var c = num1/num2;
            result.add =a;
            result.multiply= b;
            result.divide = c;
            return cb(null,result);
        }
    ],function(err,result){
        if(err) {
            return err;
        } else {
            return result;
        }
    })
    }
    