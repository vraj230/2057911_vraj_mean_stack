let express = require("express");
let bodyParser = require("body-parser");
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.pluralize(null);

let url = "mongodb+srv://mongoDB_Admin:tcs123@cluster0.teugt.mongodb.net/Course"

let courseSchema= mongoose.Schema({
    _id:{type:Number,unique:true},
    courseName:String,
    description:String,
    amount:Number
});

let courseModule = mongoose.model("courses", courseSchema);

app.get("/",(request,response)=> {
    response.sendFile(__dirname + "/main.html");
})

app.get("/main",(request,response)=> {
    response.sendFile(__dirname + "/main.html");
})

app.get("/add_course",(request,response)=> {
    response.sendFile(__dirname + "/add_course.html");
})

app.post("/register",(request,response)=>{
    let info = request.body;

    mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
    let db = mongoose.connection;
    db.once("open", ()=>{
        
        let p1 = new courseModule({_id: info.courseID, courseName: info.courseName, description: info.description, amount:info.amount});
        
        courseModule.insertMany(p1, (err,result)=>{
            if(!err)
            {
                console.log(result);
            }
            else
            {
                console.log(err);
            }
             mongoose.disconnect();
        })
    })
    //get back to the main page
    response.sendFile(__dirname+"/main.html")
});

app.get("/update_course", (resquest, response) => {
    response.sendFile(__dirname + "/update_course.html");
})

app.post("/update", (request, response) => {
    let info = request.body;

    mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
    let db = mongoose.connection;
    db.once("open", ()=>{
        //console.log(info.courseID, info.amount);
        courseModule.updateOne({_id : info.courseID}, {$set:{amount: info.amount}}, (err,result)=>{
            if(!err)
            {
                console.log(result);
            }
            else
            {
                console.log(err);
            }
            mongoose.disconnect();
        })
    })
    //get back to the main page
    response.sendFile(__dirname+"/main.html")
})

app.get("/delete_course", (request, response) => {
    response.sendFile(__dirname + "/delete_course.html");
})

app.post("/delete", (request, response) => {
    let info = request.body;
    mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
    let db = mongoose.connection;
    db.once("open", ()=>{
        
        courseModule.deleteOne({_id:info.courseID},(err,result)=> {
            if(!err){
                console.log(result)
            }else {
                console.log(err);
            }
            mongoose.disconnect();
        })
    })
    response.sendFile(__dirname+"/main.html");
})

app.get("/show_courses", (request, response) => {
    
    mongoose.connect(url).then(res=>console.log("connected")).catch(error=>console.log(error));
    let db = mongoose.connection;
    db.once("open", ()=>{
        
        courseModule.find({},(err,data)=> {
            if(!err){
                let startTable ="<div><h1>Show Courses</h1> <table border = 1px><tr><th>Course ID</th><th>Course Name</th><th>Description</th><th>Amount</th></tr>";
                let tableContent = "";
                    data.forEach(info=> {
                        //console.log(rec);
                        tableContent+="<tr><td>"+info._id+"</td><td>"+info.courseName+"</td><td>"+info.description+"</td><td>"+info.amount+"</td></tr>"
                    })
                    let endTable="</table><br><a href='main'>Back</a></div>";
                    let page = startTable+tableContent+endTable
                    response.send(page);
            }else {
                console.log(err);
            }
            mongoose.disconnect();
        })
    })
})

app.listen(9090,()=>console.log("Server running on port number 9090"))