document.addEventListener("DOMContentLoaded", function () {
  const logoMiCuenta = document.getElementById("logoMiCuenta");
  const dropdownMiCuenta = document.getElementById("dropdownMiCuenta");

  function checkLocalStorageId() {
    const userId = localStorage.getItem("id");
    if (userId !== null && !isNaN(userId)) {
      logoMiCuenta.style.display = "block";
    } else {
      logoMiCuenta.style.display = "none";
    }
  }

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
