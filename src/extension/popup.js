var a=0;
function count() {
    a++;
    
    document.getElementById('demo').textContent = a;
    document.getElementById('profiles').textContent = "HEHEHE";

    $.get("06_2_simplestAjax.php?name=simanta", 
        function(data,status) {
           $("#myDiv").html(data);

   });

}
document.getElementById('do-count').onclick = count;

// GET THE DOM OBJECTS
// var btn1 = $("#button1");
// var btn2 = $("#button2"); // jquery is easier to use

// ATTACH HANDLERS
// First way - attach name of a function
// btn2.click(toggleColor);


// second way - attach ANONYMOUS handler 
// (makes sense to not give names to one-time time use handlers)
// console.log("About to attach handler");


// function loadProfiles() {
//   alert("Now going to make a GET ajax call - results will appear soon");
//   $.get("06_2_simplestAjax.php?name=simanta", 
//         function(data,status) {
//            $("#myDiv").html(data);

//    });
// }
// document.getElementById('button2').onclick = loadProfiles;