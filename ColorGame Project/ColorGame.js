colors=[
"rgb(255,255,0)",
"rgb(255,0,255)",
"rgb(0,255,255)",
"rgb(255,0,0)",
"rgb(0,255,0)",
"rgb(0,0,255)",
]

var pickedColor ="rgb(255,0,0)";
var dispColor=document.getElementById("DispalyColor");
//dispColor.textContent=pickedColor;
var squares=document.querySelectorAll(".square");
for(var i =0; i<colors.length; i++){
	squares[i].style.backgroundColor= colors[i];
}



