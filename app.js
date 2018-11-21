const express            = require('express');
const app                =  express();
const bodyParser         = require('body-parser');
const functions          = require('./functions.js');
const  mysql             = require('mysql');


app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

global.con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database :"tb_device_token"
  });
  
  con.connect(function(err) {
    if (err){ throw err};
  
    console.log("Connected!");
  });

app.get('/set_immediate',functions.setImmediateAndSetTimeout);
app.post('/get_promises',functions.basicPromises);
app.post('/async_await',functions.basicAwait);
app.post('/aysnc_auto',functions.basicAuto);
app.post('/async_waterfall',functions.basicWaterfall);

let server = require('http').createServer(app);
let PORT = process.env.PORT || 4000;

server.listen(PORT,()=>{
    console.log(`PORT RUNNING ----------------------> ${PORT}`);
});
