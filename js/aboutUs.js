const logoMiCuenta = document.getElementById("logoMiCuenta");
const dropdownMiCuenta = document.getElementById("dropdownMiCuenta");
const botonLogin = document.getElementById("botonLogin");

function checkLocalStorageId() {
  const userId = localStorage.getItem("id");
  if (userId !== null && !isNaN(userId)) {
    logoMiCuenta.style.display = "block";
    botonLogin.style.display = "none";
  } else {
    logoMiCuenta.style.display = "none";
    botonLogin.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", checkLocalStorageId);

logoMiCuenta.addEventListener("click", function () {
  dropdownMiCuenta.style.display = dropdownMiCuenta.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function (event) {
  if (!logoMiCuenta.contains(event.target)) {
    dropdownMiCuenta.style.display = "none";
  }
});

window.addEventListener("storage", function (event) {
  if (event.key === "id") {
    checkLocalStorageId();
  }
});
