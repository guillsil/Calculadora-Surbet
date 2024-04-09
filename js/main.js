document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", resetAll);
document.getElementById("agregar").addEventListener("click", agregarOdd);


// Contador para el número de inputs agregados
let inputCount = 4; // Iniciamos en 4 porque ya hay 4 inputs presentes inicialmente

// Añadir eventos input a los campos de entrada de las apuestas y al campo de entrada del monto
for (let i = 1; i <= inputCount; i++) {
    document.getElementById("input" + i).addEventListener("input", function() {
        if (areTwoInputsFilled() && isAmountFilled()) {
            calculate();
        }
    });
}

document.getElementById("monto").addEventListener("input", function() {
    if (areTwoInputsFilled() && isAmountFilled()) {
        calculate();
    }
});

function areTwoInputsFilled() {
    let filledCount = 0;
    for (let i = 1; i <= inputCount; i++) {
        if (document.getElementById("input" + i).value.trim() !== "") {
            filledCount++;
        }
    }
    return filledCount >= 2;
}

function isAmountFilled() {
    return document.getElementById("monto").value.trim() !== "";
}

function agregarOdd() {
    inputCount++;

    const newInput = document.createElement("input");
    newInput.id = "input" + inputCount;
    newInput.className = "input-seccion-v4__odd-input";
    newInput.type = "number";
    newInput.placeholder = "Odd " + inputCount + " ";

    const container = document.querySelector(".input-seccion-v4");
    const columns = Math.min(Math.ceil(inputCount / 2), 2);
    const rows = Math.ceil(inputCount / columns);

    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, auto)`;

    container.appendChild(newInput);

    const newResultDiv = document.createElement("div");
    newResultDiv.className = "result-" + inputCount;

    const resultadoOdd = document.createElement("p");
    resultadoOdd.textContent = "Odds " + inputCount;
    resultadoOdd.className = "resultado__odd";

    const resultadoValor = document.createElement("p");
    resultadoValor.textContent = "/suggestion";
    resultadoValor.className = "resultado__valor";

    const resultadoTipOdd = document.createElement("p");
    resultadoTipOdd.className = "resultado__tip-odd";
    resultadoTipOdd.id = "resultado-odd" + inputCount;
    resultadoTipOdd.textContent = "0.00";

    newResultDiv.appendChild(resultadoOdd);
    newResultDiv.appendChild(resultadoValor);

    const containerResult = document.querySelector(".resultado");
    containerResult.appendChild(newResultDiv);
    containerResult.appendChild(resultadoTipOdd);
}



function calculate() {
    var stake = parseFloat(document.getElementById("monto").value);
    var totalWinning = 0;
    var profitPercentage = 0;
    
    var result = 0;

    for (let i = 1; i <= inputCount; i++) {
        var odd = parseFloat(document.getElementById("input" + i).value);
        result += odd ? 1 / odd : 0;
    }

    var isSurebet = result < 1;
    if (inputCount > 0) {
        for (let i = 1; i <= inputCount; i++) {
            var odd = parseFloat(document.getElementById("input" + i).value);
            var normalOdd = odd ? (1 / odd) / result : 0;
            var howMuchbet = odd ? stake * normalOdd : 0;
            howMuchbet = Math.round(howMuchbet);
            document.getElementById("resultado-odd" + i).textContent = (odd ? howMuchbet.toLocaleString('es-ES', { minimumFractionDigits: 0 }) : "0.0");
            var winning = odd ? howMuchbet * odd - stake : 0;
            totalWinning += winning;
        }

        profitPercentage = (totalWinning / (stake * inputCount)) * 100;
    }
    totalWinning = totalWinning/inputCount;
    totalWinning = Math.round(totalWinning);
    profitPercentage = Math.round(profitPercentage);
    document.getElementById("resultado-ganancia").textContent = totalWinning.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-porcentaje").textContent = profitPercentage.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    var specialButton = document.getElementById("specialButton");
    if (isSurebet) {
        specialButton.textContent = "Surebet";
        specialButton.style.backgroundColor = "hsl(40.09, 100%, 53.92%)";
    } else {
        specialButton.textContent = "No Surebet";
        specialButton.style.backgroundColor = "hsl(220, 89.36%, 18.43%)";
    }
}


function resetAll() {
    for (let i = 1; i <= inputCount; i++) {
        document.getElementById("input" + i).value = "";
        document.getElementById("resultado-odd" + i).textContent = "0.00";
    }
    for (let i = 5; i <= inputCount; i++) {
        const inputToRemove = document.getElementById("input" + i);
        inputToRemove.parentNode.removeChild(inputToRemove);

        const resultDivToRemove = document.querySelector(".result-" + i);
        resultDivToRemove.parentNode.removeChild(resultDivToRemove);

        const resultadoOddToRemove = document.getElementById("resultado-odd"+i);
        resultadoOddToRemove.parentNode.removeChild(resultadoOddToRemove);
    }
    
    inputCount = 4;

    const montoInput = document.getElementById("monto");
    const montoValue = montoInput.value;
    montoInput.value = "";

    document.getElementById("resultado-ganancia").textContent = "0.00";
    document.getElementById("resultado-porcentaje").textContent = "0.00";

    document.getElementById("specialButton").textContent = "";
    document.getElementById("specialButton").style.backgroundColor = "";
}


