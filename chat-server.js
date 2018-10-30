var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var moment = require('moment')

var urlencodeParser = bodyParser.urlencoded({ extended: false });

var http = require('http').Server(app);//Express 初始化 app 作为 HTTP 服务器的回调函数
var io = require('socket.io')(http);//开发环境下， socket.io 自动提供客户端


app.use(express.static('public'));

function transform(code) {
    return code.replace('+', '*')
}

app.get('/abc', function (req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
    // res.send(transform('1 + 1'))
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


app.get('/abc/pic/QQ20180116215459', function (req, res) {
    res.sendFile(__dirname + "/src/" + "QQ20180116215459.jpg");
})



app.get('/abc/data/time', function (req, res) {
    res.send([
        moment().format('YYYY-MM-DD HH:mm:ss').toString()
    ]);

})

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

io.on('connection', function (socket) {
    socket.on('favorite-name', function (msg) {//事件名“favorite-name”,事件内容函数
        console.log('message: ' + msg);
    });
    socket.on("check-name",(valuemsg)=>{socket.broadcast.emit("check-name",valuemsg)});//选好的用户名
});


//聊天页面
app.get('/abc/data/people', function (req, res) {
    res.send([{
        "name": "Hafid Fachrudin",
        "distance": "8m",
        "IndividualResume": "Nggih mas,leres niki kulo hafid..."
    },
    {
        "name": "Ibnu Mas'ud",
        "distance": "13m",
        "IndividualResume": "jazakallah khairan"
    },
    {
        "name": "Anggit Yuniar",
        "distance": "25m",
        "IndividualResume": "Oh nggih saget mas"
    },
    {
        "name": "Winandra Adnnan",
        "distance": "1d",
        "IndividualResume": "Mugi-mugi barokah"
    },
    {
        "name": "Fikrun Nashih",
        "distance": "1d",
        "IndividualResume": "Slap mas!"
    },
    {
        "name": "Langgeng Nur",
        "distance": "2d",
        "IndividualResume": "Nanti soto batok masih ke utara..."
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

app.get('/abc/data/words', function (req, res) {
    res.send([
        { content: "今天天气真好呀~", type: "left" },
       /* { content: "有好吃的吗？", type: "left" },
        { content: "要跟我聊天吗？", type: "left" },
        { content: "路上有个汪汪", type: "left" },
        { content: "好呀~", type: "left" },
        { content: "真可爱！", type: "left" },
        { content: "(｡･∀･)ﾉﾞ嗨", type: "left" },*/
    ]);

})

/*
app.post("/process_post", urlencodeParser, function (req, res) {
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log(response);
   res.end(JOSN.stringify(response));
})

app.get('/process_get', function (req, res) {
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})
*/

http.listen(3000, function () {//使 http 服务器监听端口 3000。
    console.log('listening on *:3000');
});


