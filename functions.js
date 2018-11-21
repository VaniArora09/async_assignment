const Promise            = require('bluebird');
const async              = require('async');
const eventEmitter       = require('events');
const _                  = require('underscore');

const responses          = require('./routes/responses');
const commonFunc          = require('./routes/commonfunctions');
const services           = require('./services');

exports.basicAwait= function(req,res){
    let schema = Joi.object().keys ({
        access_token                :    Joi.string().required(),
        customer_name               :    Joi.string().required(),
        app_device_type             :    joi.string().required(),
        email                       :    Joi.string().required(),
        phone_no                    :    Joi.string().required(),
    });

     let validation = Joi.validate(req.body, schema);
     if (validation.error) {
        return responses.parameterMissingResponse;
      }
     let manvalues = [email,phone_no]
    try{
        let result = await commonFunc.checkBlank(manvalues);
        req.body.is_email_verified = 0; // by default
        let check  = await commonFunc.checkEmailExits(req.body);
        if(_.isEmpty(check)){
            let customer = await commonFunc.insertCustomers(req.body);
            return ({'customer_id': customer,'status':200});
        }
        else{
            return responses.emailAlreadyExits(res);
        }
    } catch(e){
        return e;
    }    
}
exports.basicWaterfall= function(req,res){
    
    let schema = Joi.object().keys ({
        customer_id                 :    Joi.number().required(),
        access_token                :    Joi.string().required(),
        is_email_verified           :    Joi.number().required(),
        app_device_type             :    joi.string().required(),
    });

    let validation = Joi.validate(req.body, schema);
    async.waterfall([
        function(cb){
            let manvalues =[req.body.access_token,req.body.customer_id,is_email_verified]
            if (commonFunc.checkBlank([manvalues])) {
                return responses.parameterMissingResponse(res);
            }
            return cb(null);
        }, function(cb){
            let sql = "SELECT is_email_verified FROM tb_customers where customer_id=? ";
            connection.query(sql, [req.body.customer_id], function (error, result) {
                if (error) {
                    return cb(error);
                }
                 else {
                     return cb(null,result);
                    }
                })
            } , 
            function(result,cb){
                let sql = "UPDATE tb_customers SET is_email_verified =? WHERE customer_id =? ";
                connection.query(sql, [1,req.body.customer_id], function (error, result) {
                    if (error) {
                        return cb(error);
                    }
                    else {
                        return cb(null,result);
                    }
                })
        }
    ],function(err,result){
        if(err) {
            return err;
        } else {
            return result;
        }
    })
    }
    

exports.setImmediateAndSetTimeout= function(req,res){
    
    setImmediate(function A() {
        setImmediate(function B() {
          console.log(1);
          setImmediate(function D() { console.log(2); });
          setImmediate(function E() { console.log(3); });
        });
        setImmediate(function C() {
          console.log(4);
          setImmediate(function F() { console.log(5); });
          setImmediate(function G() { console.log(6); });
        });
      });
      
      setTimeout(function timeout() {
        console.log('TIMEOUT FIRED');
      }, 0)
   
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
    let num1 = req.body.num1;
    let num2 = req.body.num2;

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

