var express = require('express');
var app = express();
var bodyParser = require("body-parser");
//var moment = require('moment');

var urlencodeParser = bodyParser.urlencoded({ extended: false });

var http = require('http').Server(app);//Express 初始化 app 作为 HTTP 服务器的回调函数
var io = require('socket.io')(http);//开发环境下， socket.io 自动提供客户端

app.use(express.static('public'));

app.get('/abc', function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.get('/abc/process_post', function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.get('/abc/js', function (req, res) {
    res.sendFile(__dirname + "/" + "Chat.js");
})

app.get('/Friend', function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
})

/*app.get('/abc/data/time', function (req, res) {
    res.send([
        moment().format('YYYY-MM-DD HH:mm:ss').toString()
    ]);

})*/

//入口页面
app.get('/Entrance', function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.get('/entra/pic/001', function (req, res) {
    res.sendFile(__dirname + "/src/" + "001.jpg");
})

app.get('/entra/pic/002', function (req, res) {
    res.sendFile(__dirname + "/src/" + "002.jpg");
})

app.get('/entra/pic/003', function (req, res) {
    res.sendFile(__dirname + "/src/" + "003.jpg");
})

app.get('/entra/pic/004', function (req, res) {
    res.sendFile(__dirname + "/src/" + "004.jpg");
})

app.get('/entra/pic/QQ20180116215459', function (req, res) {
    res.sendFile(__dirname + "/src/" + "QQ20180116215459.jpg");
})

io.on('connection', function (socket) {
    socket.on('favorite-name', function (msg) {//事件名“favorite-name”,事件内容函数
        console.log('message: ' + msg);
    });
    socket.on("check-name",(valuemsg)=>{socket.broadcast.emit("check-name",valuemsg)});//选好的用户名
});

//聊天页面
app.get('/abc/data/people', function (req, res) {
    res.send([{
        "name": "Rem",
        "author": "Nagatsuki Tappei",
        "resume": "《Re:ゼロから始める異世界生活》"
    },
    ])
})

io.on('connection', function (socket) {//相当于用户连上了网络
    console.log('a user connected');
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {//事件名“chat message”,事件内容函数
        console.log('message: ' + msg);
    });
    socket.on("chatTime",(valuemsg)=>{socket.broadcast.emit("chatTime",valuemsg)});
});

http.listen(3000, function () {//使 http 服务器监听端口 3000。
    console.log('listening on *:3000');
});


