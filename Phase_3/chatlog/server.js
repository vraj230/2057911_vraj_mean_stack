let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.pluralize(null);

let url = "mongodb+srv://mongoDB_Admin:tcs123@cluster0.teugt.mongodb.net/Log"

let schema= mongoose.Schema({
    name:String,
    message:String,
});

let logsModule = mongoose.model("logs", schema);
//load the http module and connect to express module with server property
let http = require("http").Server(app);

//load the socket.io module and connect to http module with IIFE features
let io = require("socket.io")(http);

app.get("/", (req,res) => {
    res.sendFile(__dirname+"//index.html");
})

io.on("connection", (socket) => {
    console.log("Client connected");
    
    socket.on("data", ({nam, msg}) =>{
        console.log(nam)
        console.log(msg) 
        //add to db
        mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
        let db = mongoose.connection;
        db.once("open", ()=>{
        
            // let p1 = new logsModule({ name: nam, message: msg});
            logsModule.insertMany({name: nam, message: msg}, (err, result) => {
                if(! err)
                {
                    console.log("success");
                    socket.emit("res", "Log sucessfully added to db")
                }
                else
                {
                    //console.log(err);
                    socket.emit("res", "error occured");
                }
                mongoose.disconnect();
            });
            
            //    mongoose.disconnect();
            //})
        });
    })
})

http.listen(9090, () => console.log("server running on port 9090"));