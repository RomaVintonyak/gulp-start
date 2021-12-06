jQuery(document).ready(function () {
  "use script";
 
  var btn = $("._callback");
  btn.on("click", function(){
    alert("Its work");
    prompt();
  });
});