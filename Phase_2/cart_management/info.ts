let data:JSON[] = new Array();

function addData(item:string, price:number):void 
{
    console.log("inside add function")
    let arr:any = JSON.parse(sessionStorage.getItem("array"));

    if(arr != null)
		data = arr
    
    let json:any = {}
    json["item"] = item;
    json["price"] = price;
    console.log("data added")
    data.push(json)
    document.getElementById("size").innerHTML = "Cart Size : " + data.length 

    sessionStorage.setItem("array", JSON.stringify(data));

}

function displayData():any
{
    console.log("inside display function")
    let arr:any = JSON.parse(sessionStorage.getItem("array"));
    let total:number = 0;
    let startTable:string = "<tr><th>Item Name</th><th>Price</th></tr>"
    let tableContent:string = ""
    
    for(let i in arr)
    {
       total += arr[i]["price"];
       tableContent += "<tr><td>" + arr[i]["item"] + "</td><td>" + arr[i]["price"] + "</td></tr>"
    }

    document.getElementById("table_data").innerHTML = startTable + tableContent;
    document.getElementById("total").innerHTML = "Total Price: $" + total;
}

