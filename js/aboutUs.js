const logoMiCuenta = document.getElementById("logoMiCuenta");
const dropdownMiCuenta = document.getElementById("dropdownMiCuenta");
const botonLogin = document.getElementById("botonLogin");

// Función para verificar si hay un ID en localStorage
function checkLocalStorageId() {
  const userId = localStorage.getItem("id");
  if (userId !== null && !isNaN(userId)) {
    // Mostrar logoMiCuenta y ocultar botonLogin
    logoMiCuenta.style.display = "block";
    botonLogin.style.display = "none";
  } else {
    // Ocultar logoMiCuenta y mostrar botonLogin
    logoMiCuenta.style.display = "none";
    botonLogin.style.display = "block";
  }
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", checkLocalStorageId);

logoMiCuenta.addEventListener("click", function () {
  dropdownMiCuenta.style.display = dropdownMiCuenta.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function (event) {
  if (!logoMiCuenta.contains(event.target)) {
    dropdownMiCuenta.style.display = "none";
  }
});

// Actualizar UI si cambia el estado de localStorage
window.addEventListener("storage", function (event) {
  if (event.key === "id") {
    checkLocalStorageId();
  }
});
