chrome.storage.local.get('profile', function(result){
    //result.profile
    if(result.profile){
        setLoggedInView(result.profile);
    }
    else{
        setLoggedOutView();
    }
    console.log(result.profile);
})

function login(){
    var uname = document.getElementById('usernameBox').value;
    $.ajax({    
        url: "http://fun.thomasmoll.co:5000/safesurf/users",
        success: function(response){
                    for(var i = 0; i < response['number_of_users']; i++){
                        if(uname.localeCompare(response['users'][i]) == 0){
                            setLoggedInView(uname);
                            storeProfile(uname);
                            return;
                        }
                    }
                    setLoggedOutView();
                    document.getElementById('noUser').style = "display:inline";
                    console.log("User: " + uname + " doesn't exist!");
                },
        dataType: "json"  
    });    
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
    chrome.storage.local.set({'profile': ""}, function() {
          // Notify that we saved.
          console.log('Unsaved Profile')
        });
}

function storeProfile(username){
    chrome.storage.local.set({'profile': username}, function() {
          // Notify that we saved.
          console.log('Saved Profile '+username)
        });
}


document.getElementById('login').onclick = login;
document.getElementById('newUser').onclick = createNewUser;
document.getElementById('addWord').onclick = addWord;
document.getElementById('logout').onclick = logout;
