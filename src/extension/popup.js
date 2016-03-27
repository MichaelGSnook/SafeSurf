$.ajax({    
        url: "http://fun.thomasmoll.co:5000/safesurf/users",
        data: null,
        success: loadUsers,
        dataType: "json"  
    });


function loadUsers(response){
    console.log(response['users'])
    var profiles = document.getElementById('profiles-list');

    for(var i = 0; i < response['users'].length; i++){
        var btn = document.createElement("input");
        var name = response['users'][i];
        //Assign different attributes to the element.
        btn.setAttribute("type", "button");
        btn.setAttribute("value", name);
        btn.setAttribute("style", "width:100px;height:50px");
        btn.onlick = storeProfile(btn.name);
        
        profiles.appendChild(btn);
        profiles.appendChild(document.createElement("div"));
    }
    
}

function storeProfile(username){
    chrome.storage.local.set({'profile': username}, function() {
          // Notify that we saved.
          console.log('Saved Profile '+username)
        });
}

// storeProfile("supermom")
document.getElementById('do-count').onclick = count;