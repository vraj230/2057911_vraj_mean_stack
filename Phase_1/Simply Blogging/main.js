let data= []
function printBlog()
{
	let jsonarr = JSON.parse(sessionStorage.getItem("array"));
	let lastTag = ""
	let count = 1
	for(let i = 0; i < jsonarr.length; i++)
	{
		let title = jsonarr[i]["title"]
		let article = jsonarr[i]["article"]
		let image = jsonarr[i]["image"]

		
		//add the blog in html

		/*
		<div class = "row">
	    		<div class="col">
	    			<div class="card" style="width: 18rem;">
	  					<img class="card-img-top" src="https://www.mikereyfman.com/Photography-New-Releases/Gallery-2/photos/MR0101.jpg" alt="Card image cap">
	  					<div class="card-body">
	  						<h5 class="card-title">Natinal Parks</h5>
	    					<p class="card-text">Here are some examples of the articles related to national park.</p>
	 				 	</div>
					</div>
	    		</div>
		*/

		let start_row = " <div class = 'row'> "
		let start_col = " <div class = 'col'> "
		let start_card = " <div class= 'card' style= 'width: 18rem;' > "
		let content = " <img class= 'card-img-top' src= \"" + image +  "\"> "	
		console.log("content: " + content)
		let card_body = " <div class='card-body' > <h5 class= 'card-title'>" + title + "</h5>" + "<p class = 'card-text'>" + article + "</p>"

		let endtag = " </div> "
		let breakTag = "<br>"
		let final_tag = ""
		if( (count - 1) % 3 == 0 || count == 1)
		{
			final_tag = start_row + start_col + start_card + content + card_body + endtag + endtag + endtag

		}
		else if (count % 3 == 0 )
		{
			final_tag = start_col + start_card + content + card_body + endtag + endtag + endtag + endtag + breakTag
		}
		else{

			final_tag = start_col + start_card + content + card_body + endtag + endtag + endtag
		}
		lastTag += final_tag
		count ++
	}
	document.getElementById("add_stuff").innerHTML = lastTag
}

function addBlog() 
{
	console.log("funciton was called");
	//event.preventDefault();
	let json = {}
	
	json["title"] = document.getElementById("title").value;
	json["article"] = document.getElementById("article").value
	json["image"] = document.getElementById("image").value
	
	data.push(json)

	sessionStorage.setItem("array",JSON.stringify(data))
	printBlog();
}


function displayblog()
{
	let json = {}
	json["title"] = "Food"
	json["article"] = "Nowadays, food have plenty of cusines with different flavors from all over the world."
	json["image"] =  "https://media.istockphoto.com/photos/top-view-table-full-of-food-picture-id1220017909?b=1&k=6&m=1220017909&s=170667a&w=0&h=yqVHUpGRq-vldcbdMjSbaDV9j52Vq8AaGUNpYBGklXs="
	data.push(json)
console.log("data: " + data.length)

	json = {}
	json["title"] = "Travel"
	json["article"] = "There are many places to travel in this world inclduing diverse cites and peaceful national parks"
	json["image"] =  "https://api.time.com/wp-content/uploads/2016/08/gettyimages-535829001.jpg"
	data.push(json)
console.log("data: " + data.length)
	json= {}
	json["title"] = "History"
	json["article"] = "History teaches us plaenty of important lessons in our lives. War, treaties and revolutions."
	json["image"] =  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSALd03k1j76GELeOcRBttU0G6AAC0GQcOjRQ&usqp=CAU"
	data.push(json)

	console.log("data: " + data.length)

	sessionStorage.setItem("array",JSON.stringify(data))
	printBlog();

}
