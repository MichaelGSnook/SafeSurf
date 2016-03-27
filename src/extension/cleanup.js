
$.ajax({
    url: "localhost:5000/words/supermom",
    data: null,
    sucess: clean,
    dataType: "json"  
});


function clean(word){
    document.body.innerHTML = document.body.innerHTML.replace(new RegExp(word, "ig"), 'cluck')
}