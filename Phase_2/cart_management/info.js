var data = new Array();
function addData(item, price) {
    console.log("inside add function");
    var arr = JSON.parse(sessionStorage.getItem("array"));
    if (arr != null)
        data = arr;
    var json = {};
    json["item"] = item;
    json["price"] = price;
    console.log("data added");
    data.push(json);
    document.getElementById("size").innerHTML = "Cart Size : " + data.length;
    sessionStorage.setItem("array", JSON.stringify(data));
}
function displayData() {
    console.log("inside display function");
    var arr = JSON.parse(sessionStorage.getItem("array"));
    var total = 0;
    var startTable = "<tr><th>Item Name</th><th>Price</th></tr>";
    var tableContent = "";
    for (var i in arr) {
        total += arr[i]["price"];
        tableContent += "<tr><td>" + arr[i]["item"] + "</td><td>" + arr[i]["price"] + "</td></tr>";
    }
    document.getElementById("table_data").innerHTML = startTable + tableContent;
    document.getElementById("total").innerHTML = "Total Price: $" + total;
}
