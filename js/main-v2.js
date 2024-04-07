document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearInputs);
document.getElementById("agregar").addEventListener("click", agregarOdd);

const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(width < 40em)');
const topNavMenu = document.querySelector('.topnav__menu');
const main = document.querySelector('main');
const body = document.querySelector('body');

// Contador para el número de inputs agregados
let inputCount = 4; // Iniciamos en 4 porque ya hay 4 inputs presentes inicialmente

function agregarOdd() {
    inputCount++;

    const newInput = document.createElement("input");
    newInput.id = "input" + inputCount;
    newInput.className = "input-seccion-v4__odd-input";
    newInput.type = "number";
    newInput.placeholder = "Odd " + inputCount;

    const container = document.querySelector(".input-seccion-v4");
    const columns = Math.min(Math.ceil(inputCount / 2), 2); // Máximo 2 columnas
    const rows = Math.ceil(inputCount / columns); // Calcular el número de filas

    // Establecer el grid-template-columns y grid-template-rows en el contenedor de inputs
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, auto)`;

    // Insertar el nuevo input en el contenedor de inputs
    container.appendChild(newInput);

    // Crear un nuevo conjunto de elementos de resultado dentro de un div
    const newResultDiv = document.createElement("div");

    const resultadoOdd = document.createElement("p");
    resultadoOdd.textContent = "Apuesta " + inputCount;
    resultadoOdd.className = "resultado__odd";

    const resultadoValor = document.createElement("p");
    resultadoValor.textContent = "/recomendacion";
    resultadoValor.className = "resultado__valor";

    const resultadoTipOdd = document.createElement("p");
    resultadoTipOdd.id = "resultado-odd" + inputCount;
    resultadoTipOdd.className = "resultado__tip-odd";
    resultadoTipOdd.textContent = "0.00";

    // Agregar los elementos de resultado al nuevo div
    newResultDiv.appendChild(resultadoOdd);
    newResultDiv.appendChild(resultadoValor);

    // Insertar el nuevo div de resultados en el contenedor de resultados
    const containerResult = document.querySelector(".resultado");
    containerResult.appendChild(newResultDiv);
    containerResult.appendChild(resultadoTipOdd);
}


function openMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'true');
    topNavMenu.removeAttribute('inert');
    topNavMenu.removeAttribute('style');
    main.setAttribute('inert', '');
    bodyScrollLockUpgrade.disableBodyScroll(body);
    btnClose.focus();
  }
  
  function closeMobileMenu() {
    btnOpen.setAttribute('aria-expanded', 'false');
    topNavMenu.setAttribute('inert', '');
    main.removeAttribute('inert');
    bodyScrollLockUpgrade.enableBodyScroll(body);
    btnOpen.focus();
  
    setTimeout(() => {
      topNavMenu.style.transition = 'none';
    }, 500);
  }
  
  function setupTopNav(e) {
    if (e.matches) {
      // is mobile
      console.log('is mobile');
      topNavMenu.setAttribute('inert', '');
      topNavMenu.style.transition = 'none';
    } else {
      // is tablet/desktop
      console.log('is desktop');
      closeMobileMenu();
      topNavMenu.removeAttribute('inert');
    }
  }
  
  setupTopNav(media);
  
  btnOpen.addEventListener('click', openMobileMenu);
  btnClose.addEventListener('click', closeMobileMenu);
  
  media.addEventListener('change', function (e) {
    setupTopNav(e);
  });
  

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
document.getElementById("input3").addEventListener("input", function() {
    if (document.getElementById("monto").value.trim() !== "" && document.getElementById("input1").value.trim() !== "" && document.getElementById("input2").value.trim() !== ""){
        calculate();
    }
}
);
document.getElementById("monto").addEventListener("input", function() {
    if (document.getElementById("input1").value.trim() !== "" && document.getElementById("input2").value.trim() !== "") {
        calculate();
    }
});

  

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

function calculate2() {
    var odd1 = parseFloat(document.getElementById("input1").value);
    var odd2 = parseFloat(document.getElementById("input2").value);
    var odd3 = parseFloat(document.getElementById("input3").value); 
    var stake = parseFloat(document.getElementById("monto").value);

    var result = 1 / odd1 + 1 / odd2 + (odd3 ? 1 / odd3 : 0); // Solo incluir odd3 si está presente
    var isSurebet = result < 1 ? true : false;

    // Normalizar las probabilidades
    var normalOdd1 = (1 / odd1) / result;
    var normalOdd2 = (1 / odd2) / result;
    var normalOdd3 = odd3 ? (1 / odd3) / result : 0; // Normalizar solo si odd3 está presente

    // Ganancia en cada apuesta
    var ganancia1 = stake / normalOdd1;
    var ganancia2 = stake / normalOdd2;
    var ganancia3 = odd3 ? stake / normalOdd3 : 0; // Calcular ganancia solo si odd3 está presente

    // Calculo de la cantidad a apostar
    var howMuchbet_1 = stake * normalOdd1;
    var howMuchbet_2 = stake * normalOdd2;
    var howMuchbet_3 = odd3 ? stake * normalOdd3 : 0; // Calcular solo si odd3 está presente

    // Calculo de la ganancia de cada apuesta
    var winning_1 = howMuchbet_1 * odd1 - stake;
    var winning_2 = howMuchbet_2 * odd2 - stake;
    var winning_3 = howMuchbet_3 * odd3 - stake;

    // Calculo de la ganancia total
    var totalWinning = winning_1 + winning_2 ;
    var profitPercentage = 0;

    // Solo incluir la ganancia de la tercera apuesta si odd3 está presente
    if (odd3) {
        totalWinning += winning_3;
        profitPercentage = (totalWinning / (stake * 3)) * 100;
    }else{
        totalWinning = totalWinning/2;
        profitPercentage = (totalWinning / (stake * 2)) * 100*2;
    }


    // Redondeo
    howMuchbet_1 = Math.round(howMuchbet_1);
    howMuchbet_2 = Math.round(howMuchbet_2);
    howMuchbet_3 = Math.round(howMuchbet_3);
    totalWinning = Math.round(totalWinning);
    profitPercentage = Math.round(profitPercentage);
    
    // Actualización de los elementos HTML con los resultados
    document.getElementById("resultado-odd1").textContent = howMuchbet_1.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-odd2").textContent = howMuchbet_2.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-odd3").textContent = howMuchbet_3.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-ganancia").textContent = totalWinning.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-porcentaje").textContent = profitPercentage.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    // Mostrar si es surebet o no
    var specialButton = document.getElementById("specialButton");
    if (isSurebet) {
        specialButton.textContent = "Surebet";
        specialButton.style.backgroundImage = "linear-gradient(90deg, hsl(45, 100%, 50%), hsl(220, 100%, 15%))";
        newSpecialButton.textContent = "Surebet";
        newSpecialButton.style.backgroundImage = "linear-gradient(90deg, hsl(45, 100%, 50%), hsl(220, 100%, 15%))";
    } else {
        specialButton.textContent = "No Surebet";
        specialButton.style.backgroundImage = "linear-gradient(to right, hsl(45, 100%, 50%), hsl(220, 100%, 15%))";
        newSpecialButton.textContent = "No Surebet";
        newSpecialButton.style.backgroundImage = "linear-gradient(to right, hsl(45, 100%, 50%), hsl(220, 100%, 15%))";
    }
}

function calculate() {
    var stake = parseFloat(document.getElementById("monto").value);
    var totalWinning = 0;
    var result = 0;
    var totalBets = 0;
    var profitPercentage = 0;

    for (let i = 1; i <= inputCount; i++) {
        var odd = parseFloat(document.getElementById("input" + i).value);
        totalBets += odd ? 1 : 0;
        result += odd ? 1 / odd : 0;

        // Actualizar los elementos HTML con los resultados de cada apuesta
        document.getElementById("resultado-odd" + i).textContent = (odd ? (stake / odd).toLocaleString('es-ES', { minimumFractionDigits: 2 }) : "0.00");
    }

    var isSurebet = result < 1;

    if (totalBets > 0) {
        for (let i = 1; i <= inputCount; i++) {
            var odd = parseFloat(document.getElementById("input" + i).value);
            var normalOdd = odd ? (1 / odd) / result : 0;
            var howMuchbet = odd ? stake * normalOdd : 0;
            var winning = odd ? howMuchbet * odd - stake : 0;

            totalWinning += winning;
        }

        profitPercentage = (totalWinning / (stake * totalBets)) * 100;
    }

    // Redondeo
    totalWinning = Math.round(totalWinning);
    profitPercentage = Math.round(profitPercentage);

    // Actualización de los elementos HTML con los resultados totales
    document.getElementById("resultado-ganancia").textContent = totalWinning.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    document.getElementById("resultado-porcentaje").textContent = profitPercentage.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    // Mostrar si es surebet o no
    var specialButton = document.getElementById("specialButton");
    if (isSurebet) {
        specialButton.textContent = "Surebet";
        specialButton.style.backgroundImage = "hsl(20.62, 100%, 62.35%)";
        newSpecialButton.textContent = "Surebet";
        newSpecialButton.style.backgroundImage = "hsl(20.62, 100%, 62.35%)";
    } else {
        specialButton.textContent = "No Surebet";
        specialButton.style.backgroundImage = "linear-gradient(to right, hsl(45, 100%, 50%), hsl(220, 100%, 15%))";
        newSpecialButton.textContent = "No Surebet";
        newSpecialButton.style.backgroundImage = "linear-gradient(to right, hsl(45, 100%, 50%), hsl(220, 100%, 15%))";
    }
}



function limpiarGenericsInputs() {
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("resultado-odd1").textContent = "0.00";
    document.getElementById("resultado-odd2").textContent = "0.00";
    document.getElementById("resultado-ganancia").textContent = "0.00";
    document.getElementById("resultado-porcentaje").textContent = "0.00";
    document.getElementById("specialButton").textContent = "?";
    document.getElementById("specialButton").style.backgroundColor = "";
    document.getElementById("newSpecialButton").textContent = "?";
    document.getElementById("newSpecialButton").style.backgroundColor = "";
}

function clearInputs() {
    limpiarGenericsInputs();
    clearAddInputs();
    document.getElementById("input3").value = "";
    document.getElementById("resultado-odd3").textContent = "0";
    var botones = document.querySelectorAll(".btns-status__boton");
    var header_titulo = document.querySelectorAll(".header-titulo");
    var btns_status = document.querySelectorAll(".btns-status");
    botones.forEach(function(boton) {
        boton.classList.remove("pressed");
    });
    btns_status.forEach(function(boton) {
    boton.classList.remove("pressed-status");
    });
    header_titulo.forEach(function(boton) {
        boton.classList.remove("pressed-titulo");
    });
}
