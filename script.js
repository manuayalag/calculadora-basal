document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const PESOINPUT = document.getElementById("peso");
  const calcularBtn = document.getElementById("calcular");
  const ERROR = document.getElementById("error");
  const FLU = document.getElementById("flu");
  const MAN = document.getElementById("man");
  const METODO = document.getElementById("metodo");
  const OPCIONES = document.getElementById("formularioOpciones");
  const enviarFactorBtn = document.getElementById("enviarFactor");
  const factor1500Checkbox = document.getElementById("factor1500");
  const factor2000Checkbox = document.getElementById("factor2000");
  let volumenDiario,
    metodo,
    mantenimiento,
    mMasM2,
    factorSuperficie,
    superficieCorporal;
  // Evento click del botón calcular
  calcularBtn.addEventListener("click", calcularHidratacion);

  // Función para calcular la hidratación
  function calcularHidratacion() {
    let peso = parseFloat(PESOINPUT.value);

    if (isNaN(peso) || peso <= 0) {
      //si no es un numero o peso negativo.
      ERROR.style.display = "block";
      FLU.style.display = "none";
      MAN.style.display = "none";
    } else {
      FLU.style.display = "none";
      MAN.style.display = "none";
      METODO.style.display = "none";
      if (peso <= 30) {
        OPCIONES.style.display = "none";
        if (peso <= 10) {
          volumenDiario = peso * 100;
        } else if (peso <= 20) {
          volumenDiario = 10 * 100 + (peso - 10) * 50;
        } else {
          volumenDiario = 10 * 100 + 10 * 50 + (peso - 20) * 20;
        }
        mantenimiento = Math.ceil(volumenDiario / 24);
        mMasM2 = mantenimiento * 1.5;
        metodo = "Holliday-Segar";

        ERROR.style.display = "none";
        FLU.textContent =
          "Volumen diario necesario: " + Math.ceil(volumenDiario) + " cc";
        FLU.style.display = "block";
        MAN.textContent =
          "Mantenimiento: " +
          mantenimiento +
          " cc/hr \n m+m/2: " +
          mMasM2 +
          " cc/hr";
        MAN.style.display = "block";
        METODO.textContent = "Metodo : " + metodo;
        METODO.style.display = "block";
      } else {
        superficieCorporal = (peso * 4 + 7) / (peso + 90);
        OPCIONES.style.display = "block";
      }
    }
  }
  factor1500Checkbox.addEventListener("change", function () {
    if (this.checked) {
      factor2000Checkbox.checked = false;
    }
  });

  factor2000Checkbox.addEventListener("change", function () {
    if (this.checked) {
      factor1500Checkbox.checked = false;
    }
  });
  enviarFactorBtn.addEventListener("click", function () {
    let factor1500 = factor1500Checkbox.checked;
    let factor2000 = factor2000Checkbox.checked;

    if (factor1500 && !factor2000) {
      factorSuperficie = factor1500Checkbox.value;
      supCorp();
    } else if (factor2000 && !factor1500) {
      factorSuperficie = factor2000Checkbox.value;
      supCorp();
    } else if (factor1500 && factor2000) {
      ERROR.style.display = "block";
      ERROR.style.textContent = "Por favor, seleccione solo 1 factor.";
      FLU.style.display = "none";
      MAN.style.display = "none";
    } else {
      ERROR.style.display = "block";
      ERROR.style.textContent = "Por favor ingrese un factor.";
      FLU.style.display = "none";
      MAN.style.display = "none";
    }
  });
  function supCorp(){
    volumenDiario = superficieCorporal * factorSuperficie;
    mantenimiento = Math.ceil(volumenDiario / 24);
    mMasM2 = mantenimiento * 1.5;
    ERROR.style.display = "none";
    metodo = "Superficie Corporal";
    FLU.textContent =
      "Volumen diario necesario: " + Math.ceil(volumenDiario) + " cc";
    FLU.style.display = "block";
    METODO.textContent = "Metodo : " + metodo;
    METODO.style.display = "block";
    OPCIONES.style.display = "none";
  }
});
