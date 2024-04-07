document.getElementById("calculate").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", resetAll);
document.getElementById("agregar").addEventListener("click", agregarOdd);

const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(width < 40em)');
const topNavMenu = document.querySelector('.topnav__menu');
const main = document.querySelector('main');
const body = document.querySelector('body');

// Contador para el número de inputs agregados
let inputCount = 4; // Iniciamos en 4 porque ya hay 4 inputs presentes inicialmente


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

function calculate() {
    var stake = parseFloat(document.getElementById("monto").value);
    var totalWinning = 0;
    var profitPercentage = 0;
    
    var result = 0;
    var totalBets = 0;
    

    for (let i = 1; i <= inputCount; i++) {
        var odd = parseFloat(document.getElementById("input" + i).value);
        totalBets += odd ? 1 : 0;
        result += odd ? 1 / odd : 0;

        // Actualizar los elementos HTML con los resultados de cada apuesta
        document.getElementById("resultado-odd" + i).textContent = (odd ? (stake / odd).toLocaleString('es-ES', { minimumFractionDigits: 1 }) : "0.00");
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
    } else {
        specialButton.textContent = "No Surebet";
        specialButton.style.backgroundImage = "hsl(0, 100%, 50%)";
    }
}


function limpiarGenericsInputs() {
    for (let i = 1; i <= inputCount; i++) {
        document.getElementById("input" + i).value = "";
        document.getElementById("resultado-odd" + i).textContent = "0.00";
    }
    document.getElementById("monto").value = "";
    document.getElementById("resultado-ganancia").textContent = "0.00";
    document.getElementById("resultado-porcentaje").textContent = "0.00";
    document.getElementById("specialButton").textContent = "";
    document.getElementById("specialButton").style.backgroundColor = "";
    document.getElementById("newSpecialButton").textContent = "";
    document.getElementById("newSpecialButton").style.backgroundColor = "";
}

function resetAll() {
    limpiarGenericsInputs();
    clearAddInputs();
}
