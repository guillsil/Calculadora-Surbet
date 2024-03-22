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
    var label = document.querySelector(".inputs-seccion .input-seccion__odd-label.hidden");
    var input = document.querySelector(".inputs-seccion .input-seccion__odd-input.hidden");
    var odd3 = document.querySelector(".resultado__odd3.hidden");
    var valor3 = document.querySelector(".resultado__valor3.hidden");
    var tipOdd3 = document.querySelector(".resultado__tip-odd3.hidden");
    var specialButton = document.getElementById("specialButton"); 

    label.classList.remove("hidden");
    input.classList.remove("hidden");
    odd3.classList.remove("hidden");
    valor3.classList.remove("hidden");
    tipOdd3.classList.remove("hidden");
    specialButton.style.display = "none";
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
    } else {
        specialButton.textContent = "No Surebet";
        specialButton.style.backgroundColor = "#c70f0fff";
    }
}

function clearInputs() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("resultado-odd1").textContent = "";
    document.getElementById("resultado-odd2").textContent = "";
    document.getElementById("resultado-ganancia").textContent = "";
    document.getElementById("resultado-porcentaje").textContent = "";
    document.getElementById("specialButton").textContent = "?";
    document.getElementById("specialButton").style.backgroundColor = "";
}
