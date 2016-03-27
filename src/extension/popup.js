// 

var a=0;
function count() {
    a++;
    
    document.getElementById('demo').textContent = a;
    var profiles = document.getElementById('profiles');
    var div = document.getElementById('profiles-list');
    // profiles.textContent = "HAHAHAHA";

    $.ajax({	
	    url: "http://fun.thomasmoll.co:5000/safesurf/users",
	    data: null,
	    success: loadUsers,
	    dataType: "json"  
	});
}

function loadUsers(response){
	console.log(response['users'])
	var profiles = document.getElementById('profiles-list');
	

	var name;
	// var radioHtml = "";
	// for (var i = 0; i < response['users'].length; i++) {
	// 	var name = response['users'][i];
	// 	var element = document.createElement("input");
	// 	//Assign different attributes to the element.
 //        element.setAttribute("type", "radio");
 //        element.setAttribute("name", name);
	    
	//     // radioHtml += '<input type="radio" name="' + name + '"' + '/>';
	//     profiles.appendChild(element);
	//     // profiles.innerHTML.append(radioHtml);
	// }​

	for(name in response['users']){
		var radioBtn = document.createElement("input");
		//Assign different attributes to the element.
	    radioBtn.setAttribute("type", "radio");
	    radioBtn.setAttribute("name", name);
	    
	    // radioHtml += '<input type="radio" name="' + name + '"' + '/>';
	    profiles.appendChild(radioBtn);
	    profiles.appendChild(document.createElement("div"));
	}
	
}
document.getElementById('do-count').onclick = count;