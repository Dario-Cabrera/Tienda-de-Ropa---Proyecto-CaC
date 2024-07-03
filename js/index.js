document.addEventListener("DOMContentLoaded", function () {
  const logoMiCuenta = document.getElementById("logoMiCuenta");
  const dropdownMiCuenta = document.getElementById("dropdownMiCuenta");

  // Función para verificar si hay un ID en localStorage
  function checkLocalStorageId() {
    const userId = localStorage.getItem("id");
    if (userId !== null && !isNaN(userId)) {
      // Mostrar logoMiCuenta
      logoMiCuenta.style.display = "block";
    } else {
      // Ocultar logoMiCuenta
      logoMiCuenta.style.display = "none";
    }
  }

  // Llamar a la función al cargar la página
  checkLocalStorageId();

  logoMiCuenta.addEventListener("click", function () {
    dropdownMiCuenta.style.display = dropdownMiCuenta.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function (event) {
    if (!logoMiCuenta.contains(event.target)) {
      dropdownMiCuenta.style.display = "none";
    }
  });
});
