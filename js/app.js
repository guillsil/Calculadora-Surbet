let roundButtonState = false;

document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearInputs);
document.getElementById("roundToggleButton").addEventListener("click", toggleRound);

function calculate() {
    var input1 = document.getElementById("input1").value.trim();
    var input2 = document.getElementById("input2").value.trim();
    var input4 = document.getElementById("input4").value.trim();

    if (input1 === "" || input2 === "" || input4 === "") {
        alert("Por favor Complete Correctamente o sera golpeado.");
        return; // No hacer nada si falta algún valor
    }

    var odd1 = parseFloat(document.getElementById("input1").value);
    var odd2 = parseFloat(document.getElementById("input2").value);
    var tax = 0;
    var stake = parseFloat(document.getElementById("input4").value);

    var result = 1 / odd1 + 1 / odd2;
    var isSurebet = result < 1 ? true : false;

    var dividing, Bigodd, howMuchbet1, howMuchbet_2, winning, profitPercentage;

    if (odd1 > odd2) {
        dividing = odd1 / odd2;
        Bigodd = odd1;
    } else {
        dividing = odd2 / odd1;
        Bigodd = odd2;
    }

    howMuchbet1 = stake / (dividing + 1);
    howMuchbet_2 = stake - howMuchbet1;

    if (tax === 0) {
        winning = (howMuchbet1 * Bigodd) - stake;
    } else {
        winning = (howMuchbet1 * Bigodd) - (howMuchbet1 * Bigodd) - stake;
    }

    profitPercentage = ((winning / (stake * 2)) * 100 * 2); // Calculating profit percentage

    if (roundButtonState == true) {
        howMuchbet1 = Math.round(howMuchbet1);
        howMuchbet_2 = Math.round(howMuchbet_2);
        winning = Math.round(winning);
        profitPercentage = Math.round(profitPercentage);
    }

    document.getElementById("result").innerHTML = isSurebet ? "Sí, esta es una apuesta segura.!" : "No, esto no es una apuesta segura.!";
    document.getElementById("betting").innerHTML = "Deberías Apostar $" + howMuchbet_2.toLocaleString('es-ES', {minimumFractionDigits: 2}) + " a la Apuesta A y $" + howMuchbet1.toLocaleString('es-ES', {minimumFractionDigits: 2}) +
        " a la apuesta B. El beneficio que puedes obtener es $" + winning.toLocaleString('es-ES', {minimumFractionDigits: 2}) + " con un porcentaje de ganancia del " + profitPercentage.toLocaleString('es-ES', {minimumFractionDigits: 2}) + "%.";
}

function clearInputs() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input4").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("betting").innerHTML = "";
    //Deactivate the round button
    roundButtonState = false; // Restablecer roundButtonState a false al limpiar los inputs
}

function toggleRound() {
    roundButtonState = !roundButtonState;
    document.getElementById("roundToggleButton").classList.toggle("active");
    calculate(); // Recalculate with the new state of the round button
}
