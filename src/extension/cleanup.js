// Asnyc call to load custom words
$.ajax({
    url: "http://fun.thomasmoll.co:5000/safesurf/words/supermom",
    data: null,
    success: clean,
    dataType: "json"  
});

// Async call to load the local bad words
$.get("http://fun.thomasmoll.co/safesurf/bad_words.txt", scrub)
    
function clean(response){
    console.log(response['result'][0])
   
    words = response['result']
   
    for(var i=0; i<words.length; i++){
        replace(words[i])
    }
}

function scrub(data){
    var lines = data.split('\n')
    
    $.each(lines, function(n, elem) {
        replace(elem)
    })
}

function replace(word){
    var str = new Array(word.length + 1).join("*");
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp("\\b"+word, "ig"), str)
}