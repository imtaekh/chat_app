/*
 * author : imtaekh@gmail.com
 * from : Geneal Assembly Santa Monica WDI 17!
 */

$(function(){
  console.log("JS is running");

  var ip = location.host;
  var localChatData = [];
  var chatTable = $('.chatTable');
  var chatForm = $('#chatForm');

  //getting chat data from server per second
  getChatData(); //initial
  var interval= setInterval(getChatData,1000); //repeat
  function getChatData(){
    $.ajax({
      method:"get",
      timeout:"1000",
      url: "http://"+ip+"/chatdata",
      success: function(data){
        if(localChatData.length<data.length){
          for(i=localChatData.length;i<data.length;i++){
            chatTable.append("<tr><td class='name' style='background-color:"+data[i].color+";color:white'>"+data[i].name+"</td><td class='chat'style='color:"+data[i].color+"'>"+data[i].chat+"</td></tr>");
          }
          localChatData=data;
          $(".chatDiv").scrollTop($(".chatDiv")[0].scrollHeight);
        }
      },
      error:function (err) {
        console.log(err);
        chatTable.append("<tr><td class='name' style='background-color:black'></td><td class='chat' style='background-color:black;color:white'>Server is down!</td></tr>");
        clearInterval(interval);
        chatForm.off("submit");
        chatForm.on("submit",function (event) {
          event.preventDefault();
        });
      }
    });
  }

  //sending chat data to server on submit
  chatForm.on("submit", function(event){
    event.preventDefault();
    if(event.target.name.value == 0){
      alert("Please type name");
    } else if(event.target.chat.value == 0){
      alert("Please type message");
    } else {
      $.ajax({
        method:"post",
        contentType: 'application/json; charset=UTF-8',
        dataType   : 'json',
        data: JSON.stringify({name:event.target.name.value,color:event.target.color.value,chat:event.target.chat.value}),
        url: "http://"+ip+"/chatdata",
        success: function(data){
          console.log("data sent");
          $("input[name='chat']").val("").focus();
          getChatData();
        },
      });
    }
  });


});
