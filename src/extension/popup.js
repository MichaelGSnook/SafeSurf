// $.ajax({    
//         url: "http://fun.thomasmoll.co:5000/safesurf/users",
//         data: null,
//         success: loadUsers,
//         dataType: "json"  
//     });

function login(){
    var uname = document.getElementById('usernameBox').value;
    if(doesUserExist(uname)){
        //TODO login user and go to logged in state
        //TODO Call storeProfile(uname)
    }
    else{
        //TODO Err: User already exists, back to login state
    }
    
}

function createNewUser(){
    var uname = document.getElementById('usernameBox').value;
    if(doesUserExist(uname)){
        //TODO Err: User already exists, back to login state
    }
    else{
        //TODO register new user and go to logged in state
        //TODO Call storeProfile(uname)
    }

}
var jsonData;
function doesUserExist(uname){
    
    

    $.ajax({    
        url: "http://fun.thomasmoll.co:5000/safesurf/users",
        success: function(response){
                    console.log(response);
                    jsonData =  response;
                    console.log(jsonData);
                },
        dataType: "json"  
    });

    //GABBY METHOD:
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (xhttp.readyState == 4 && xhttp.status == 200) {
    //       response = xhttp
    //     }
    // };
    //   xhttp.open("GET", "http://fun.thomasmoll.co:5000/safesurf/users", true);
    //   xhttp.send();

    console.log(jsonData);
    console.log(JSON.stringify(jsonData));
    console.log(jsonData.users);
    for(var i = 0; i < response['number_of_users']; i++){
        console.log(i + ". " + response['users'][i]);
        if(uname.localeCompare(response['users'][i]) == 0){
            var profiles = document.getElementById('profiles-list');
            var btn = document.createElement("input");
            var name = response['users'][i];
            //Assign different attributes to the element.
            btn.setAttribute("type", "button");
            btn.setAttribute("value", name);
            btn.setAttribute("style", "width:100px;height:50px");
            btn.onlick = storeProfile;
            
            profiles.appendChild(btn);
            profiles.appendChild(document.createElement("div"));
        }
    }
}

// function test(response){
//     var uname = "jesusmom";
//     for(var i = 0; i < response['number_of_users']; i++){
//         if(uname.localeCompare(response['users'][i]) == 0){
//             var profiles = document.getElementById('profiles-list');
//             var btn = document.createElement("input");
//             var name = response['users'][i];
//             //Assign different attributes to the element.
//             btn.setAttribute("type", "button");
//             btn.setAttribute("value", name);
//             btn.setAttribute("style", "width:100px;height:50px");
//             btn.onlick = storeProfile;
            
//             profiles.appendChild(btn);
//             profiles.appendChild(document.createElement("div"));
//         }
//     }
// }

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
        btn.onlick = storeProfile;
        
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


document.getElementById('login').onclick = login;
document.getElementById('newUser').onclick = createNewUser;

//TODO:
// 1) add states. (login page, logged in, create new user etc) Login with profile name, return to login page on fail
// 2) Add functionality to add words to filter out for specific user.