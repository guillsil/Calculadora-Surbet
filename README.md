# surebet-calculator
<!DOCTYPE html>
<html>
  <head>
    <title>Surebet Calculator</title>
    <link rel="stylesheet" href="style.css">
	<style>
	
	body {
	  background-color: lightgreen;
	}

	.center {
	  position: absolute;
	  top: 50%;
	  left: 50%; 
	  transform: translate(-50%, -50%);
	  width: 600px;
	  height: 400px;
	  background-color: #ddd;
	  text-align: center;
	}

	.input-wrapper {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: center;
	  align-items: center;
	  margin-bottom: 15px;
	}

	.input-wrapper label, .input-wrapper input[type=text] {
	  margin: 5px;
	}
	
	.button {
	  margin-top: 15px; 
	  margin-left: 10px; 
	  width: 100px; 
	  height: 40px; 
	  background: #1096ef; 
	  font-size: 17px;
	  padding: 5px; 
	}
	
	.button:hover {
	opacity: 0.8;
	}
	
	#result {
	  font-size: 22px;
	  font-weight: bold;
	  background-color: lightblue;
	  color: red; 
	  padding: 10px; 
	}
  
	#betting {
	  font-size: 20px;
	  margin-top: 10px;
	  background-color: lightyellow;
	  padding: 10px; 
	}
	
	
	</style>
  </head>
  <body>
    <div class="center">
      <h1>Surebet Calculator</h1>
	  <div class="input-wrapper">
	    <label>Enter 1st odd:</label>
	    <input type="text" id="input1" placeholder="Enter a number"> 
	  </div>
	  <div class="input-wrapper">
	    <label>Enter 2nd odd:</label>
	    <input type="text" id="input2" placeholder="Enter another number"> 
	  </div>
	  <div class="input-wrapper">
	    <label>Enter tax value:</label>
	    <input type="text" id="input3" placeholder="Enter tax amount">
	  </div>
	  <div class="input-wrapper">
	    <label>Enter your stake:</label>
	    <input type="text" id="input4" placeholder="Enter your stake"> 
	  </div>
      <button class="button" id="calculate" onclick="calculate()">Calculate</button>
      <button class="button" id="clear" onclick="clearInputs()">Clear</button>
      <p id="result"></p>
	  <p id="betting"></p>
    </div>

    <script>
	

function calculate() {

    var odd1 = parseFloat(document.getElementById("input1").value);
	var odd2 = parseFloat(document.getElementById("input2").value);
	var tax = parseInt(document.getElementById("input3").value);
	var stake = parseFloat(document.getElementById("input4").value);
	
	if (isNaN(tax)) {
	tax = 0;
	}
	else {
	tax = tax / 100; 
	}
	
var result = 1/odd1 + 1/odd2 + tax; 

var isSurebet = result < 1 ? true : false;

if (odd1 > odd2) {
var dividing = odd1/odd2;
var Bigodd = odd1; 
}
else {
var dividing = odd2/odd1;
var Bigodd = odd2; 
}

var howMuchbet1 = stake / (dividing + 1); 
var howMuchbet_2 = stake - howMuchbet1; 


if (tax === 0) {
var winning = (howMuchbet1 * Bigodd) - stake;
}
else {
var winning = (howMuchbet1 * Bigodd) - (howMuchbet1 * Bigodd * tax) - stake; 
}

 
if (isSurebet) {

document.getElementById("result").innerHTML = "Yes, this is a surebet!";
}

else {

	document.getElementById("result").innerHTML = "No, this is not a surebet!";
	
	}
	
		document.getElementById("betting").innerHTML = "You should bet " + howMuchbet1.toFixed(2) + " for bigger rate and " + howMuchbet_2.toFixed(2) + 
		" for smaller rate. The profit you can make is " + winning.toFixed(2);
}

function clearInputs() {

document.getElementById("input1").value = "";
document.getElementById("input2").value = "";
document.getElementById("input3").value = "";
document.getElementById("input4").value = "";
document.getElementById("result").innerHTML = "";
document.getElementById("betting").innerHTML = "";
}
	</script>
  </body>
</html>
