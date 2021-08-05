var data = []

function addData()
{

	var arr = JSON.parse(sessionStorage.getItem("array"));

	if(arr != null)
		data = arr
	var json = {}
	json["c_name"] = document.getElementById("c_name").value;
	json["p_name"] = document.getElementById("p_name").value
	json["budget"] = document.getElementById("budget").value
	console.log("data added")
	data.push(json)

	sessionStorage.setItem("array",JSON.stringify(data))
}

function displayData()
{
	console.log("displayData called")
	var jsonarr = JSON.parse(sessionStorage.getItem("array"));


	var startTable = "<table><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>"
	var endTable = "</table>"

	var tableContent = ""

	for(let i = 0; i < jsonarr.length; i++)
	{
		tableContent += "<tr><td>" + jsonarr[i]["c_name"] + "</td><td>"+ jsonarr[i]["p_name"]+ "</td><td>$" + jsonarr[i]["budget"]+"</td></tr>"
	}
	
	
	document.getElementById("b_table").innerHTML = startTable + tableContent + endTable

}