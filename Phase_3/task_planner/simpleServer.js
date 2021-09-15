let http = require("http");
let url = require("url");
let arr = []
let fs = require("fs");

let mainpage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Login Page</h2>
    <form action="checkLogin">
        <label>Employee ID: </label>
        <input type="text" name="emp_id"/><br/>
        <label>Task ID: </label>
        <input type="text" name="task_id"/><br/>
        <label>Task: </label>
        <input type="text" name="task_name"/><br/>
        <label>Deadline: </label>
        <input type="date" name="deadline"/><br/>
        <input type="submit" value="Add Task"/> </br>
       <a href="listTask">List Tasks</a>
    </form>
    </br> </br>
    <h2>Delete Task</h2>
    <form action="deleteTask">
        <label>Task ID: </label>
        <input type="text" name="del_id"/><br/>
        <input type="submit" value="Delete Task"/>
    </form>
    </br> </br>

</body>
</html> 
`
let server = http.createServer((req, res) => {
    let urlInfo = url.parse(req.url,true);
    if(urlInfo.path != "/favicon.ico")
    {
        if(urlInfo.pathname == "/deleteTask")
        {
            //Find task id and delete it
            let info= urlInfo.query
            if(arr.find(p => p.task_id == info.del_id) != undefined)
            {
                let index = arr.findIndex(l => l.task_id == info.del_id)
                arr.splice(index, 1);
                //update the list and write to json file
                fs.writeFileSync("tasks.json", JSON.stringify(arr));

                res.writeHead(200,{"content-type":"text/html"});
                res.write(mainpage)
                res.write("Task Deleted");
            }
            else
            {
                res.writeHead(200,{"content-type":"text/html"});
                res.write(mainpage)
                res.write("Task ID is not added");
            }
        }
        else if (urlInfo.path == "/listTask")
        {
            let content = ""
            for(let i = 0; i < arr.length; i ++)
            {
                content += "<tr>"
                content += "<td>" + arr[i].emp_id + "</td>";
                content += "<td>" + arr[i].task_id + "</td>";
                content += "<td>" + arr[i].task_name + "</td>";
                content += "<td>" + arr[i].deadline + "</td>"
                content += "</tr>"
            }
            

            let listpage = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h2>List Tasks</h2>
                <table border= 1>
                <tr>
                <th>Employee ID</th>
                <th>Task ID</th>
                <th>Task</th>
                <th>Deadline</th>
                </tr>
                ${content}
                </table> </br> </br>
            </body>
            </html>
            `
            res.write(listpage)
        }
        else if (urlInfo.pathname == "/checkLogin")
        {
            //add task to the file
            let data = urlInfo.query;
            console.log("data info: " + data.task_id);
            //console.log(data.emp_id + ", " + data.task_id + ", " + data.task_name + ", "+ data.deadline);
            if(arr.find(l => l.task_id == data.task_id) == undefined)
            {
                let temp = {emp_id: data.emp_id, task_id: data.task_id, task_name: data.task_name, deadline: data.deadline}
                arr.push(temp)
                //update list and write to json file
                fs.writeFileSync("tasks.json", JSON.stringify(arr));

                res.writeHead(200,{"content-type":"text/html"});
                res.write(mainpage)
                res.write("Task suceessfully added")
            }
            else
            {
                //task id already exists
                res.writeHead(200,{"content-type":"text/html"});
                res.write(mainpage)
                res.write("Task ID already exists")
            }
        }
        else
        {
            res.write(mainpage);
        }
        res.end();
    }
});

server.listen(9090, ()=>console.log("Server is running on port number 9090"))