const logoMiCuenta = document.getElementById("logoMiCuenta");
const dropdownMiCuenta = document.getElementById("dropdownMiCuenta");

logoMiCuenta.addEventListener("click", function () {
  dropdownMiCuenta.style.display = dropdownMiCuenta.style.display === "block" ? "none" : "block";
});
document.addEventListener("click", function (event) {
  if (!logoMiCuenta.contains(event.target)) {
    dropdownMiCuenta.style.display = "none";
  }
});
