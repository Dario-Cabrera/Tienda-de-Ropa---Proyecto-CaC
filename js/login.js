const formLogIn = document.getElementById("formLogIn");
const inputEmail = document.getElementById("emailLogIn");
const inputPassword = document.getElementById("passwordInput");
const modalLogIn = document.getElementById("successModalLogIn");
const spanLogIn = document.getElementsByClassName("closeLogIn")[0];
const submitSignUp = document.getElementById("submitSignUp");
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

document.getElementById("togglePassword").addEventListener("click", function () {
  let passwordField = document.getElementById("passwordInput");
  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
});

// Function to fetch user by email
async function fetchUserByEmail(email) {
  const baseUrl = "https://dariocabrera10.pythonanywhere.com"; // Reemplaza con tu URL base del backend
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

// Form validation
formLogIn.addEventListener("submit", async (e) => {
  // Prevent form submission
  e.preventDefault();

  // Clear previous error messages
  let errors = document.querySelectorAll(".errorLogIn");
  errors.forEach(function (error) {
    error.textContent = "";
  });

  // Validation variables
  let isValid = true;

  // Validate Email
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (inputEmail.value.trim() === "" || !regexEmail.test(inputEmail.value)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  // Validate password
  if (inputPassword.value.length < 8) {
    document.getElementById("passwordError").textContent = "Please enter a valid password (8 characters min.)";
    isValid = false;
  }

  // If form is valid, capture email and password values
  if (isValid) {
    // Capture email and password values
    const emailLogin = inputEmail.value;
    const passwordLogin = inputPassword.value;

    // Log the captured values to the console
    console.log("Email:", emailLogin);
    console.log("Password:", passwordLogin);

    try {
      // Fetch user by email
      const user = await fetchUserByEmail(emailLogin);
      console.log("User fetched from DB:", user);

      // Save the password from the fetched user in a variable
      const verificacionPassword = user.password;

      // Log the password for verification
      console.log("Password from DB:", verificacionPassword);

      // You can now compare the fetched user data with the entered password or take other actions
      if (verificacionPassword === passwordLogin) {
        console.log("Login successful!");

        // Save user ID in localStorage
        localStorage.setItem("id", user.id_user);

        // Show modal or redirect to another page
        modalLogIn.style.display = "block";

        // Update UI based on localStorage id
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

// Close modal when click on <span> (x)
spanLogIn.onclick = function () {
  modalLogIn.style.display = "none";
  // Redirect to homepage
  window.location.href = "index.html";
};

// Close modal when click outside the modal
window.onclick = function (event) {
  if (event.target == modalLogIn) {
    modalLogIn.style.display = "none";
    // Redirect to homepage
    window.location.href = "index.html";
  }
};

submitSignUp.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default button behavior (form submission)

  // Redirect to the registration page
  window.location.href = "register.html";
});
