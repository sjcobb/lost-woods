/*
*** INVENTORY JS ***
*/
console.log("inventory.js called");

var hasKey = false;

function updateInventory() {
	console.log("updateInventory() called");
	hasKey = true;
	keyNum = 1;

	keyHTML = '<div class="key" style="display:block; width:30px; height:30px; margin:0 0 20px 0; background:#fff; position:relative; top:10px; left:10px;"><div class="circle" style="display:block; margin: 0 auto; background:#000; width:10px; height:10px; position:absolute; top:10px; bottom:0; left:0;right:0; border-radius:50%;"><div class="handle" style="display:block; width:50px; height:5px; position:relative; left:20px; background:#fff;"><div class="end" style="display:block; width:5px; height:15px; position:absolute; top:0; right:15px; background:#fff;"></div><div class="end2" style="display:block; width:5px; height:15px; position:absolute; top:0; right:5px; background:#fff;"></div></div></div></div>'+keyNum;
	var keyDiv = document.createElement("div");
	keyDiv.setAttribute("id", "keyDiv");
	var style = "position:absolute; top:0; left:0; width:100px; height:100px; padding:10px; background:#000; text-align:center; font-size:20px;"
	keyDiv.setAttribute("style", style);

	document.body.appendChild(keyDiv);

	document.getElementById("keyDiv").innerHTML = keyHTML;
	//console.log(document.getElementById("keyDiv").innerHTML);

	//parent.location = "?hasKey=true";
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

//console.log(getQueryVariable("id"));
var queryKey = getQueryVariable("hasKey");
console.log(queryKey);

if (queryKey == "true") {
	console.log("key queried");
	updateInventory();
}