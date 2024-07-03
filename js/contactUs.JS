document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
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

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const reason = document.getElementById("contactReason").value;

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const lastnameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messageRegex = /^.{1,500}$/;

    let hasError = false;

    if (!nameRegex.test(name)) {
      showError("nameError", "Please enter a valid name (at least 3 letters and spaces only).");
      hasError = true;
    }

    if (!lastnameRegex.test(lastname)) {
      showError("lastnameError", "Please enter a valid last name (letters and spaces only).");
      hasError = true;
    }

    if (!phoneRegex.test(phone)) {
      showError("phoneError", "Please enter a valid phone number (numbers only - 10 digits).");
      hasError = true;
    }

    if (!emailRegex.test(email)) {
      showError("emailError", "Please enter a valid email address.");
      hasError = true;
    }

    if (!messageRegex.test(message)) {
      showError("messageError", "Please enter a message (up to 500 characters).");
      hasError = true;
    }

    if (reason === "" || reason === "query") {
      showError("contactReasonError", "Please select a reason for contact.");
      hasError = true;
    }

    if (!hasError) {
      form.submit();
    }
  });

  function showError(elementId, errorMessage) {
    const errorElement = document.getElementById(elementId);
    errorElement.style.display = "block";
    errorElement.textContent = errorMessage;
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (errorMessage) {
      errorMessage.style.display = "none";
      errorMessage.textContent = "";
    });
  }
});
