const userId = localStorage.getItem("id");

document.addEventListener("DOMContentLoaded", async function () {
  const botonLogin = document.getElementById("botonLogin");
  const logoMiCuenta = document.getElementById("logoMiCuenta");

  if (userId !== null && !isNaN(userId)) {
    botonLogin.style.display = "none";
    logoMiCuenta.style.display = "block";

    try {
      const response = await fetch(`https://dariocabrera10.pythonanywhere.com/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      console.log("User data:", userData);

      document.getElementById("nameUpdateData").value = userData.name;
      document.getElementById("surnameUpdateData").value = userData.surname;
      document.getElementById("emailUpdateData").value = userData.email;
      document.getElementById("phoneUpdateData").value = userData.phone;
      document.getElementById("idUpdateData").value = userData.dni;
      document.getElementById("addressUpdateData").value = userData.address;

      const stateSelect = document.getElementById("stateUpdateData");
      const stateValue = userData.state;
      for (let i = 0; i < stateSelect.options.length; i++) {
        if (stateSelect.options[i].value === stateValue) {
          stateSelect.selectedIndex = i;
          break;
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    logoMiCuenta.style.display = "none";
    botonLogin.style.display = "block";
  }
});

const formUpdateData = document.getElementById("formUpdateData");
const modalUpdateData = document.getElementById("successModal");
const spanUpdateData = document.getElementsByClassName("closeUpdateData")[0];
const logoMiCuenta = document.getElementById("logoMiCuenta");
const dropdownMiCuenta = document.getElementById("dropdownMiCuenta");
const deleteAccountBtn = document.getElementById("deleteConfirmBtn");
const confirmDeleteModal = document.getElementById("confirmDeleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

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

deleteAccountBtn.addEventListener("click", function () {
  confirmDeleteModal.style.display = "block";
});

cancelDeleteBtn.addEventListener("click", function () {
  confirmDeleteModal.style.display = "none";
});

confirmDeleteBtn.addEventListener("click", async function () {
  try {
    const response = await fetch(`https://dariocabrera10.pythonanywhere.com/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user account");
    }

    console.log("User account deleted successfully");
    localStorage.removeItem("id");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error deleting user account:", error);
  }
});

formUpdateData.addEventListener("submit", async (e) => {
  e.preventDefault();

  let errors = document.querySelectorAll(".errorUpdateData");
  errors.forEach(function (error) {
    error.textContent = "";
  });

  let isValid = true;

  const inputName = document.getElementById("nameUpdateData");
  const inputSurname = document.getElementById("surnameUpdateData");
  const inputEmail = document.getElementById("emailUpdateData");
  const inputPassword = document.getElementById("passwordInputUpdateData");
  const inputPhone = document.getElementById("phoneUpdateData");
  const inputId = document.getElementById("idUpdateData");
  const inputAddress = document.getElementById("addressUpdateData");
  const inputState = document.getElementById("stateUpdateData");

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
    try {
      const userData = {
        name: inputName.value,
        surname: inputSurname.value,
        email: inputEmail.value,
        phone: inputPhone.value,
        dni: inputId.value,
        address: inputAddress.value,
        state: inputState.value,
        admin: false,
      };

      if (inputPassword.value.length >= 8) {
        userData.password = inputPassword.value;
      }

      console.log("Form data to be sent:", userData);

      const response = await fetch(`https://dariocabrera10.pythonanywhere.com/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      modalUpdateData.style.display = "block";
    } catch (error) {
      console.error("Error updating user data:", error);
    }
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
