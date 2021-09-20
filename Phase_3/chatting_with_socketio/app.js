//const { Socket } = require("dgram");
let express = require("express");

let app = express();

//load the http module and connect to express module with server property
let http = require("http").Server(app);

//load the socket.io module and connect to http module with IIFE features
let io = require("socket.io")(http);

let msgs = ["Hello Client, Welcome to the chat-bot", "How can I help you?", "Someone from our team will contact you soon"];
let count = 0;
app.get("/", (req,res) => {
    res.sendFile(__dirname+"//index.html");
})

io.on("connection", (socket) => {
    //console.log("Client connected");
    //recieve the msg from client
    socket.on("obj", (msg) =>{
        console.log(msg);
        
        //console.log(msgs[count])
        socket.emit("res", msgs[count])
        if (count >= 2)
        {
            count = 0;
        }
        else
        {
            count ++;
        }
    })
    //send msg to the client
    // console.log(msgs[count])
    // socket.emit("res", msgs[count])
    // if (count >= 2)
    // {
    //     count = 0;
    // }
    // else
    // {
    //     count ++;
    // }
})

http.listen(9090, () => console.log("server running on port 9090"));