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
var interval;
var users=[];
var connectedUsers=[];

app.post('/checkChatData', function(request,response){
  if(users.indexOf(request.body.user)>=0){
    connectedUsers.push(request.body.user);
    response.send({users:users,chatData:chatData});
  }
});

app.post('/sendChatData', function(request,response){
  console.log(request.body);
  if(request.body.name){
    chatData.push(request.body);
  } else {
    chatData.push({chat:request.body.chat+"<br> Total "+users.length+" people in this chat room",time:new Date()});
  }
  response.send(chatData);
});

app.get('/users', function(request,response){
  response.send(users);
});

app.post('/users', function(request,response){
  if(users.length<=0){
    interval=setInterval(checkCurrentUsers,5000);
    console.log("Server Interval On");
  }
  users.push(request.body.user);
  response.send(users);
  console.log("[CURRENT USERS] : ",users);
});

function checkCurrentUsers() {
  NumOfUsers=users.length;
  users.forEach(function(user,i,a){
   if(connectedUsers.indexOf(user)<0) {
     NumOfUsers--;
     chatData.push({chat:"[ "+a[i]+" ] left.<br> Total "+NumOfUsers+" people in this chat room",time:new Date()});
     a[i]=0;
     console.log("[CURRENT USERS] : ",users);
   }
  });
  users=users.filter(function (user) { return user !==0; });
  connectedUsers=[];
  if(users.length<=0){
    clearInterval(interval);
    console.log("Server Interval Off");
  }
}
