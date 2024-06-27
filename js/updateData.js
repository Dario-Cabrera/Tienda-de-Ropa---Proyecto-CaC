const formUpdateData = document.getElementById("formUpdateData");
const inputName = document.getElementById("nameUpdateData");
const inputSurname = document.getElementById("surnameUpdateData");
const inputEmail = document.getElementById("emailUpdateData");
const inputPassword = document.getElementById("passwordInputUpdateData");
const inputPhone = document.getElementById("phoneUpdateData");
const inputId = document.getElementById("idUpdateData");
const inputAddress = document.getElementById("addressUpdateData");
const inputState = document.getElementById("stateUpdateData");

const modalUpdateData = document.getElementById("successModal");
const spanUpdateData = document.getElementsByClassName("closeUpdateData")[0];

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
document.getElementById("togglePasswordUpdateData").addEventListener("click", function () {
  let passwordField = document.getElementById("passwordInputUpdateData");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
});

formUpdateData.addEventListener("submit", (e) => {
  e.preventDefault();

  let errors = document.querySelectorAll(".errorUpdateData");
  errors.forEach(function (error) {
    error.textContent = "";
  });

  let isValid = true;

  if (inputName.value.length < 3) {
    document.getElementById("nameError").textContent = "Please enter a valid name (3 letters min. and spaces only).";
    isValid = false;
  }

  if (inputSurname.value.trim() === "") {
    document.getElementById("surnameError").textContent = "Please enter a valid surname (letters and spaces only).";
    isValid = false;
  }

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (inputEmail.value.trim() === "" || !regexEmail.test(inputEmail.value)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (inputPassword.value.length < 8) {
    document.getElementById("passwordError").textContent = "Please enter a valid password (8 characters min.)";
    isValid = false;
  }

  let phonePattern = /^[0-9]+$/;
  if (!phonePattern.test(inputPhone.value)) {
    document.getElementById("phoneError").textContent = "Please enter a valid phone number (numbers only)";
    isValid = false;
  }

  let idPattern = /^[0-9]+$/;
  if (!idPattern.test(inputId.value)) {
    document.getElementById("idError").textContent = "Please enter a valid ID number (numbers only)";
    isValid = false;
  }

  if (inputAddress.value.trim() === "") {
    document.getElementById("addressError").textContent = "Please enter a valid address";
    isValid = false;
  }

  if (inputState.value === "default") {
    document.getElementById("stateError").textContent = "Please select your province/state";
    isValid = false;
  }

  if (isValid) {
    modalUpdateData.style.display = "block";
  }
});

spanUpdateData.onclick = function () {
  modalUpdateData.style.display = "none";
  window.location.href = "index.html";
};

window.onclick = function (event) {
  if (event.target == modalUpdateData) {
    modalUpdateData.style.display = "none";
    window.location.href = "index.html";
  }
};
