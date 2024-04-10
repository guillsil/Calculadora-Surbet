document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculate");
    const clearButton = document.getElementById("clear");
    const agregarButton = document.getElementById("agregar");
    const inputContainer = document.querySelector(".input-seccion-v4");
    const montoInput = document.getElementById("monto");
    const specialButton = document.getElementById("specialButton");

    let inputCount = 4;

    calculateButton.addEventListener("click", calculate);
    clearButton.addEventListener("click", resetAll);
    agregarButton.addEventListener("click", agregarOdd);

    for (let i = 1; i <= inputCount; i++) {
        const input = document.getElementById("input" + i);
        input.addEventListener("input", function() {
            if (areTwoInputsFilled() && isAmountFilled()) {
                calculate();
            }
        });
    }

    montoInput.addEventListener("input", function() {
        if (areTwoInputsFilled() && isAmountFilled()) {
            calculate();
        }
    });

    function areTwoInputsFilled() {
        let filledCount = 0;
        for (let i = 1; i <= inputCount; i++) {
            const input = document.getElementById("input" + i);
            if (input.value.trim() !== "") {
                filledCount++;
            }
        }
        return filledCount >= 2;
    }

    function isAmountFilled() {
        return montoInput.value.trim() !== "";
    }

    function agregarOdd() {
        inputCount++;

        const newInput = document.createElement("input");
        newInput.id = "input" + inputCount;
        newInput.className = "input-seccion-v4__odd-input";
        newInput.type = "number";
        newInput.placeholder = "Odd " + inputCount + " ";

        const columns = Math.min(Math.ceil(inputCount / 2), 2);
        const rows = Math.ceil(inputCount / columns);

        inputContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        inputContainer.style.gridTemplateRows = `repeat(${rows}, auto)`;

        inputContainer.appendChild(newInput);

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
        // Llamar a calculate automáticamente si los nuevos inputs están completos
        newInput.addEventListener("input", function() {
            if (areTwoInputsFilled() && isAmountFilled()) {
                calculate();
            }
        });
    }

    function calculateIndividualBet(result, stake, totalWinning) {
        for (let i = 1; i <= inputCount; i++) {
            const odd = parseFloat(document.getElementById("input" + i).value);
            const normalOdd = odd ? (1 / odd) / result : 0;
            let howMuchbet = odd ? stake * normalOdd : 0;
            howMuchbet = Math.round(howMuchbet);
            document.getElementById("resultado-odd" + i).textContent = (odd ? howMuchbet.toLocaleString('es-ES', { minimumFractionDigits: 0 }) : "0.0");
            const winning = odd ? howMuchbet * odd - stake : 0;
            totalWinning += winning;
        }
        return totalWinning;
    }

    function calculateTotalResult() {
        let result = 0;
        for (let i = 1; i <= inputCount; i++) {
            const odd = parseFloat(document.getElementById("input" + i).value);
            result += odd ? 1 / odd : 0;
        }
        return result;
    }


    function calculate() {
        const stake = parseFloat(montoInput.value);
        let totalWinning = 0;
        let profitPercentage = 0;
        let result = calculateTotalResult();

        if (inputCount > 0) {
            totalWinning = calculateIndividualBet(result, stake, totalWinning);
            profitPercentage = (totalWinning / (stake * inputCount)) * 100;
        }
        totalWinning = totalWinning/inputCount;
        totalWinning = Math.round(totalWinning);
        profitPercentage = Math.round(profitPercentage);

        document.getElementById("resultado-ganancia").textContent = totalWinning.toLocaleString('es-ES', { minimumFractionDigits: 2 });
        document.getElementById("resultado-porcentaje").textContent = profitPercentage.toLocaleString('es-ES', { minimumFractionDigits: 2 });

        if (result < 1) {
            specialButton.textContent = "Surebet";
            specialButton.classList.add("isSurbet");
        } else {
            specialButton.textContent = "No Surebet";
            specialButton.classList.add("noSurbet");
        }
    }

    function resetValues() {
        // Restablecer los valores de los inputs, los resultados y el botón especial
        for (let i = 1; i <= inputCount; i++) {
            const input = document.getElementById("input" + i);
            if (input) {
                input.value = "";
                document.getElementById("resultado-odd" + i).textContent = "0.00";
            }
        }

        document.getElementById("resultado-ganancia").textContent = "0.00";
        document.getElementById("resultado-porcentaje").textContent = "0.00";
        specialButton.textContent = "";
        specialButton.style.backgroundColor = "";
        specialButton.classList.remove("isSurbet");
        specialButton.classList.remove("noSurbet");
    }

    function deleteInputResultAdd() {
        for (let i = 5; i <= inputCount; i++) {
            const inputToRemove = document.getElementById("input" + i);
            if (inputToRemove) {
                inputToRemove.parentNode.removeChild(inputToRemove);
    
                const resultDivToRemove = document.querySelector(".result-" + i);
                if (resultDivToRemove) {
                    resultDivToRemove.parentNode.removeChild(resultDivToRemove);
                }
    
                const resultadoOddToRemove = document.getElementById("resultado-odd" + i);
                if (resultadoOddToRemove) {
                    resultadoOddToRemove.parentNode.removeChild(resultadoOddToRemove);
                }
            }
        }
    }

    function resetAll() {
        resetValues();
        deleteInputResultAdd();
        // Restablecer el contador de inputs y el valor del monto
        inputCount = 4;
        if (montoInput) {
            montoInput.value = "";
        }
        inputContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
        inputContainer.style.gridTemplateRows = "auto";
    }
});
