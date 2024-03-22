document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearInputs);
document.getElementById("agregar").addEventListener("click", showAddInput);

// Añadir eventos input a los campos de entrada de las apuestas y al campo de entrada del monto
document.getElementById("input1").addEventListener("input", function() {
    if (document.getElementById("monto").value.trim() !== "" && document.getElementById("input2").value.trim() !== ""){
        calculate();
    }
});
document.getElementById("input2").addEventListener("input", function() {
    if (document.getElementById("monto").value.trim() !== "" && document.getElementById("input1").value.trim() !== ""){
        calculate();
    }
});
document.getElementById("monto").addEventListener("input", function() {
    if (document.getElementById("input1").value.trim() !== "" && document.getElementById("input2").value.trim() !== "") {
        calculate();
    }
});

function showAddInput() {
    var label = document.querySelector(".inputs-seccion .input-seccion__odd-label__tres.hidden");
    var input = document.querySelector(".inputs-seccion .input-seccion__odd-input__tres.hidden");
    var odd3 = document.querySelector(".resultado__odd3.hidden");
    var valor3 = document.querySelector(".resultado__valor3.hidden");
    var tipOdd3 = document.querySelector(".resultado__tip-odd3.hidden");
    var specialButton = document.getElementById("specialButton");
    var newspecialButton = document.getElementById("newSpecialButton");
    var ocultarBotonAdd = document.getElementById("agregar");

    label.classList.remove("hidden");
    input.classList.remove("hidden");
    odd3.classList.remove("hidden");
    valor3.classList.remove("hidden");
    tipOdd3.classList.remove("hidden");
    specialButton.style.display = "none";
    newspecialButton.style.display = "block";
    ocultarBotonAdd.style.display = "none";
}

function clearAddInputs() {
    var label = document.querySelector(".inputs-seccion .input-seccion__odd-label__tres");
    var input = document.querySelector(".inputs-seccion .input-seccion__odd-input__tres");
    var odd3 = document.querySelector(".resultado__odd3");
    var valor3 = document.querySelector(".resultado__valor3");
    var tipOdd3 = document.querySelector(".resultado__tip-odd3");
    var specialButton = document.getElementById("specialButton");
    var newspecialButton = document.getElementById("newSpecialButton");
    var ocultarBotonAdd = document.getElementById("agregar");

    label.classList.add("hidden");
    input.classList.add("hidden");
    odd3.classList.add("hidden");
    valor3.classList.add("hidden");
    tipOdd3.classList.add("hidden");
    specialButton.style.display = "block";
    newspecialButton.style.display = "none";
    ocultarBotonAdd.style.display = "block";
}

function calculate() {
    var input1 = document.getElementById("input1").value.trim();
    var input2 = document.getElementById("input2").value.trim();
    var input4 = document.getElementById("monto").value.trim();

    var odd1 = parseFloat(document.getElementById("input1").value);
    var odd2 = parseFloat(document.getElementById("input2").value);
    var stake = parseFloat(document.getElementById("monto").value);

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

    winning = (howMuchbet1 * Bigodd) - stake;

    profitPercentage = ((winning / (stake * 2)) * 100 * 2); // Calculating profit percentage

    //redondeo
    howMuchbet1 = Math.round(howMuchbet1);
    howMuchbet_2 = Math.round(howMuchbet_2);
    winning = Math.round(winning);
    profitPercentage = Math.round(profitPercentage);
    
    document.getElementById("resultado-odd1").textContent = howMuchbet_2.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-odd2").textContent = howMuchbet1.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-ganancia").textContent = winning.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-porcentaje").textContent = profitPercentage.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    // Mostrar si es surebet o no
    var specialButton = document.getElementById("specialButton");
    if (isSurebet) {
        specialButton.textContent = "Surebet";
        specialButton.style.backgroundColor = "#0fc73cff";
        newSpecialButton.textContent = "Surebet";
        newSpecialButton.style.backgroundColor = "#0fc73cff";
    } else {
        specialButton.textContent = "No Surebet";
        specialButton.style.backgroundColor = "#c70f0fff";
        newSpecialButton.textContent = "No Surebet";
        newSpecialButton.style.backgroundColor = "#c70f0fff";
    }
   
}

function clearInputs() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("resultado-odd1").textContent = "0";
    document.getElementById("resultado-odd2").textContent = "0";
    document.getElementById("resultado-ganancia").textContent = "000";
    document.getElementById("resultado-porcentaje").textContent = "000";
    document.getElementById("specialButton").textContent = "?";
    document.getElementById("specialButton").style.backgroundColor = "";
    clearAddInputs();
}
