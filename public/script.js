const socket = io();

$('#chat-box').hide();

$('#send-btn').on("click",()=>{
    const msgText = $('#inp').val();
    console.log(msgText);

    //socket of current client 
    socket.emit('send-msg',{
        msg:msgText
    })
    
    $('#inp').val("");
});

socket.on('received-msg', (data)=>{
    //console.log(data);
    $('#chat').append(`<li class="border p-2 ms-0 mb-2 rounded-pill"><span class="fw-bold"> ${data.username} </span> - <span> ${data.msg} </span></li>`);
    $('#chat').scrollTop($('#chat').outerHeight());
});

$('#login-btn').click(()=>{
    const username = $('#username').val();

    socket.emit('login',{
        username: username
    });

    $('#login').hide();
    $('#chat-box').show();

    $('#username').val(""); 

});