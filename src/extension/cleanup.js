$.ajax({
    url: "http://fun.thomasmoll.co:5000/safesurf/words/supermom",
    data: null,
    success: clean,
    dataType: "json"  
});

function clean(response){
    console.log(response['result'][0])
   
    words = response['result']
   
    for(var i=0; i<words.length; i++){
        replace(words[i])
    }
}

function replace(word){
    var str = new Array(word.length + 1).join("*");
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(word, "ig"), str)
}