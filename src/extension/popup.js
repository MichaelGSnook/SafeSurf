// $.ajax({    
//         url: "http://fun.thomasmoll.co:5000/safesurf/users",
//         data: null,
//         success: loadUsers,
//         dataType: "json"  
//     });
// if(document.getElementById('state').innerHTML.localeCompare("logged in") == 0){
//     document.getElementById('welcome').innerHTML = "Welcome, " + document.getElementById('uname').innerHTML + "!";
// }
// else{
//     document.getElementById('welcome').innerHTML = "";
// }

chrome.storage.local.get('profile', function(result){
    //result.profile
    if(result.profile){
        setLoggedInView(result.profile);
        // document.getElementById('welcome').innerHTML = "Welcome, " + result.profile + "!";
        // document.getElementById('noUser').style = "display:none";
        // document.getElementById('userExists').style = "display:none";
        // document.getElementById('addWordForm').style = "display:inline";
        // document.getElementById('loginActions').style = "display:none";
        // document.getElementById('logout').style = "width:150px;height:50px;display:inline";
    }
    else{
        setLoggedOutView();
        // document.getElementById('welcome').innerHTML = "";
        // document.getElementById('addWordForm').style = "display:none";
    }
    console.log(result.profile);
})

function login(){
    var uname = document.getElementById('usernameBox').value;
    $.ajax({    
        url: "http://fun.thomasmoll.co:5000/safesurf/users",
        success: function(response){
                    for(var i = 0; i < response['number_of_users']; i++){
                        // console.log(i + ". " + response['users'][i]);
                        //success
                        if(uname.localeCompare(response['users'][i]) == 0){
                            //TODO login user and go to logged in state
                            //TODO Call storeProfile(uname)
                            setLoggedInView(uname);
                            storeProfile(uname);
                            return;
                        }
                    }
                    //TODO Err: User doesn't exist, back to login page state
                    setLoggedOutView();
                    document.getElementById('noUser').style = "display:inline";
                    console.log("User: " + uname + " doesn't exist!");
                },
        dataType: "json"  
    });




    // console.log(doesUserExist(uname));
    // if(doesUserExist(uname)){
    //     //TODO login user and go to logged in state
    //     //TODO Call storeProfile(uname)
    //     console.log("User: " + uname + " exists!");
    // }
    // else{
    //     //TODO Err: User doesn't exist, back to login state
    // }
    
}

function createNewUser(){
    var uname = document.getElementById('usernameBox').value;
    $.ajax({    
        url: "http://fun.thomasmoll.co:5000/safesurf/users",
        success: function(response){
                    for(var i = 0; i < response['number_of_users']; i++){
                        // console.log(i + ". " + response['users'][i]);
                        if(uname.localeCompare(response['users'][i]) == 0){
                                //TODO Err: User already exists, back to login state
                                console.log("User: " + uname + " already exists!");
                                setLoggedOutView();
                                document.getElementById('userExists').style = "display:inline";
                                return;
                        }
                    }
                    setLoggedInView(uname);
                    storeProfile(uname);
                    $.ajax({
                        url: "http://fun.thomasmoll.co:5000/safesurf/register/" + uname,
                        data: null,
                        success: function(response){
                            console.log("Registered new user status: " + response['status']);
                        },
                        dataType: "json"  
                        });
                    console.log("Registering: " + uname);
                },
        dataType: "json"  
    });

}
// function loadUsers(response){
//     console.log(response['users'])
//     var profiles = document.getElementById('profiles-list');

//     for(var i = 0; i < response['users'].length; i++){
//         var btn = document.createElement("input");
//         var name = response['users'][i];
//         //Assign different attributes to the element.
//         btn.setAttribute("type", "button");
//         btn.setAttribute("value", name);
//         btn.setAttribute("style", "width:100px;height:50px");
//         btn.onlick = storeProfile;
        
//         profiles.appendChild(btn);
//         profiles.appendChild(document.createElement("div"));
//     }
    
// }

function addWord(){
    var word = document.getElementById('wordToAdd').value;
    document.getElementById('wordToAdd').value = "Add another";
    console.log(word);
    chrome.storage.local.get('profile', function(result){
        $.post({
            url: "http://fun.thomasmoll.co:5000/safesurf/user/" + result.profile + "?word=" + word,
            data: null,
            dataType: "json"  
        });
    })

//     chrome.storage.local.get('profile', function(result){
//     $.ajax({
//     url: "http://fun.thomasmoll.co:5000/safesurf/words/"+result.profile,
//     data: null,
//     success: clean,
//     dataType: "json"  
//     });
// })
}

function setLoggedInView(username){
    document.getElementById('welcome').innerHTML = "Welcome, " + username + "!";
    document.getElementById('noUser').style = "display:none";
    document.getElementById('userExists').style = "display:none";
    document.getElementById('addWordForm').style = "display:inline";
    document.getElementById('loginActions').style = "display:none";
    document.getElementById('logout').style = "width:150px;height:50px;display:inline";
}

function setLoggedOutView(){
    document.getElementById('welcome').innerHTML = "";
    document.getElementById('noUser').style = "display:none";
    document.getElementById('userExists').style = "display:none";
    document.getElementById('loginActions').style = "display:inline";
    document.getElementById('addWordForm').style = "display:none";
    document.getElementById('logout').style = "width:150px;height:50px;display:none";
}

function logout(){
    setLoggedOutView();
    // document.getElementById('welcome').innerHTML = "";
    // document.getElementById('noUser').style = "display:none";
    // document.getElementById('userExists').style = "display:none";
    // document.getElementById('loginActions').style = "display:inline";
    // document.getElementById('addWordForm').style = "display:none";
    // document.getElementById('logout').style = "width:150px;height:50px;display:none";
    chrome.storage.local.set({'profile': ""}, function() {
          // Notify that we saved.
          console.log('Unsaved Profile')
        });
}

function storeProfile(username){
    // document.getElementById('welcome').innerHTML = "Welcome, " + username + "!";
    // document.getElementById('noUser').style = "display:none";
    // document.getElementById('userExists').style = "display:none";
    // document.getElementById('addWordForm').style = "display:inline";
    // document.getElementById('loginActions').style = "display:none";

    chrome.storage.local.set({'profile': username}, function() {
          // Notify that we saved.
          console.log('Saved Profile '+username)
        });
}


document.getElementById('login').onclick = login;
document.getElementById('newUser').onclick = createNewUser;
document.getElementById('addWord').onclick = addWord;
document.getElementById('logout').onclick = logout;
