document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const PESOINPUT = document.getElementById("peso");
  const calcularBtn = document.getElementById("calcular");
  const ERROR = document.getElementById("error");
  const FLU = document.getElementById("flu");
  const MAN = document.getElementById("man");
  const METODO = document.getElementById("metodo");


  // Función para calcular la hidratación
  function calcularHidratacion() {
    let peso = parseFloat(PESOINPUT.value);

    if (isNaN(peso) || peso <= 0) {
      ERROR.style.display = "block";
      FLU.style.display = "none";
      MAN.style.display = "none";
    } else {
      let volumenDiario, metodo, mantenimiento, mMasM2;

      if (peso <= 30) {
        if (peso <= 10) {
          volumenDiario = peso * 100;
        } else if (peso <= 20) {
          volumenDiario = 10 * 100 + (peso - 10) * 50;
        } else {
          volumenDiario = 10 * 100 + 10 * 50 + (peso - 20) * 20;
        }
        metodo = "Holliday-Segar";
      } else {
        let superficieCorporal = ((peso * 4) + 7) / (peso + 90);
        
        volumenDiario = superficieCorporal * factorSuperficie;
        metodo = "Superficie Corporal";
      }

      mantenimiento = Math.ceil(volumenDiario / 24);
      mMasM2 = mantenimiento * 1.5;

      ERROR.style.display = "none";
      FLU.textContent =
        "Volumen diario necesario: " + volumenDiario.toFixed(2) + " cc";
      FLU.style.display = "block";
      MAN.textContent =
        "Mantenimiento: " +
        mantenimiento.toFixed(2) +
        " cc/hr | m+m/2: " +
        mMasM2.toFixed(2) +
        " cc/hr";
      MAN.style.display = "block";
      METODO.textContent = "Metodo : " + metodo;
      METODO.style.display = "block";
    }
  }

  // Evento click del botón calcular
  calcularBtn.addEventListener("click", calcularHidratacion);
});
