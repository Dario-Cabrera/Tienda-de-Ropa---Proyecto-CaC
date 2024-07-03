const formRegister = document.getElementById("formRegister");
const inputName = document.getElementById("nameRegister");
const inputSurname = document.getElementById("surnameRegister");
const inputEmail = document.getElementById("emailRegister");
const inputPassword = document.getElementById("passwordInput");
const inputPhone = document.getElementById("phoneRegister");
const inputId = document.getElementById("idRegister");
const inputAddress = document.getElementById("addressRegister");
const inputState = document.getElementById("stateRegister");
const modalRegister = document.getElementById("successModal");
const spanRegister = document.querySelector(".closeRegister");
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

// Función para enviar los datos del usuario al backend
async function registerUser(userData) {
  try {
    const baseUrl = "https://dariocabrera10.pythonanywhere.com"; // Reemplaza con tu URL base del backend
    const response = await fetch(`${baseUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error registering user. Please try again later.");
    }

    return response.json(); // Suponiendo que el servidor devuelve un mensaje de éxito en JSON
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Clear previous error messages
  let errors = document.querySelectorAll(".errorRegister");
  errors.forEach(function (error) {
    error.textContent = "";
  });

  // Validate form inputs
  let isValid = true;

  // Name validation
  if (inputName.value.trim() === "") {
    document.getElementById("nameError").textContent = "Please enter a valid name (3 letters min. and spaces only).";
    isValid = false;
  } else if (inputName.value.length < 3) {
    document.getElementById("nameError").textContent = "Name must be at least 3 characters.";
    isValid = false;
  }

  // Surname validation
  if (inputSurname.value.trim() === "") {
    document.getElementById("surnameError").textContent = "Please enter a valid surname (letters and spaces only).";
    isValid = false;
  }

  // Email validation
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (inputEmail.value.trim() === "" || !regexEmail.test(inputEmail.value)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  // Password validation
  if (inputPassword.value.length < 8) {
    document.getElementById("passwordError").textContent = "Please enter a valid password (8 characters min.)";
    isValid = false;
  }

  // Phone validation
  let phonePattern = /^[0-9]+$/;
  if (!phonePattern.test(inputPhone.value)) {
    document.getElementById("phoneError").textContent = "Please enter a valid phone number (numbers only)";
    isValid = false;
  }

  // ID validation
  let idPattern = /^[0-9]+$/;
  if (!idPattern.test(inputId.value)) {
    document.getElementById("idError").textContent = "Please enter a valid ID number (numbers only)";
    isValid = false;
  }

  // Address validation
  if (inputAddress.value.trim() === "") {
    document.getElementById("addressError").textContent = "Please enter a valid address";
    isValid = false;
  }

  // State validation
  if (inputState.value === "default") {
    document.getElementById("stateError").textContent = "Please select your province/state";
    isValid = false;
  }

  // If form is valid, send data to backend
  if (isValid) {
    try {
      const userData = {
        name: inputName.value,
        surname: inputSurname.value,
        email: inputEmail.value,
        password: inputPassword.value,
        phone: inputPhone.value,
        dni: inputId.value,
        address: inputAddress.value,
        state: inputState.value,
        admin: 0,
      };

      console.log("Sending user data to backend:", userData);
      const result = await registerUser(userData);
      console.log("Registration result:", result);

      // Mostrar el modal solo si modalRegister existe
      if (modalRegister) {
        console.log("Mostrando modal"); // Verificar que se llegue a este punto
        modalRegister.style.display = "block"; // Muestra el modal de éxito
      } else {
        console.error("Modal no encontrado. Verifica la selección de modalRegister.");
      }

      // Update UI based on localStorage id
      checkLocalStorageId(); // Actualizar el estado de los botones
    } catch (error) {
      console.error("Registration error:", error);
      document.getElementById("error").textContent = "Registration failed. Please try again later.";
    }
  }
});

// Cerrar el modal y redirigir al login
spanRegister.onclick = function () {
  modalRegister.style.display = "none";
  window.location.href = "login.html"; // Reemplaza con la URL correcta de tu página de login
};

window.onclick = function (event) {
  if (event.target == modalRegister) {
    modalRegister.style.display = "none";
    window.location.href = "login.html"; // Reemplaza con la URL correcta de tu página de login
  }
};
