var express            = require('express');
var app                =  express();
var bodyParser         = require('body-parser');
var functions         = require('./functions.js');

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

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
