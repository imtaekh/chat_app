/*
 * author : imtaekh@gmail.com
 * from : Geneal Assembly Santa Monica WDI 17!
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.listen(3000,function () {
  console.log("Server started");
});

app.get("/", function (request,response) {
  response.sendFile("/index.html");
});

var chatData=[];
app.get('/chatdata', function(request,response){
  response.send(chatData);
});
app.post('/chatdata', function(request,response){
  console.log(request.body);
  chatData.push(request.body);
  response.send(chatData);
});
