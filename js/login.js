const formLogIn = document.getElementById("formLogIn");
const inputEmail = document.getElementById("emailLogIn");
const inputPassword = document.getElementById("passwordInput");
const modalLogIn = document.getElementById("successModalLogIn");
const spanLogIn = document.getElementsByClassName("closeLogIn")[0];
const submitSignUp = document.getElementById("submitSignUp");
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

document.getElementById("togglePassword").addEventListener("click", function () {
  let passwordField = document.getElementById("passwordInput");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
});

async function fetchUserByEmail(email) {
  const baseUrl = "https://dariocabrera10.pythonanywhere.com";
  const response = await fetch(`${baseUrl}/api/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching user. Please try again later.");
  }

  return response.json();
}

formLogIn.addEventListener("submit", async (e) => {
  e.preventDefault();

  let errors = document.querySelectorAll(".errorLogIn");
  errors.forEach(function (error) {
    error.textContent = "";
  });

  let isValid = true;

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (inputEmail.value.trim() === "" || !regexEmail.test(inputEmail.value)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (inputPassword.value.length < 8) {
    document.getElementById("passwordError").textContent = "Please enter a valid password (8 characters min.)";
    isValid = false;
  }

  if (isValid) {
    const emailLogin = inputEmail.value;
    const passwordLogin = inputPassword.value;

    console.log("Email:", emailLogin);
    console.log("Password:", passwordLogin);

    try {
      const user = await fetchUserByEmail(emailLogin);
      console.log("User fetched from DB:", user);

      const verificacionPassword = user.password;

      console.log("Password from DB:", verificacionPassword);

      if (verificacionPassword === passwordLogin) {
        console.log("Login successful!");

        localStorage.setItem("id", user.id_user);

        modalLogIn.style.display = "block";

        checkLocalStorageId();
      } else {
        console.log("Incorrect password");
        document.getElementById("passwordError").textContent = "Incorrect password.";
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      document.getElementById("error").textContent = "User not found. Please register.";
    }
  }
});

spanLogIn.onclick = function () {
  modalLogIn.style.display = "none";
  window.location.href = "index.html";
};

window.onclick = function (event) {
  if (event.target == modalLogIn) {
    modalLogIn.style.display = "none";
    window.location.href = "index.html";
  }
};

submitSignUp.addEventListener("click", function (event) {
  event.preventDefault();

  window.location.href = "register.html";
});
