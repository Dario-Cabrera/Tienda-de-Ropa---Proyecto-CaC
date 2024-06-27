const formRegister=document.getElementById("formRegister")
const inputName=document.getElementById("nameRegister")
const inputSurname=document.getElementById("surnameRegister")
const inputEmail=document.getElementById("emailRegister")
const inputPassword=document.getElementById("passwordInput")
const inputPhone=document.getElementById("phoneRegister")
const inputId=document.getElementById("idRegister")
const inputAddress=document.getElementById("addressRegister")
const inputState=document.getElementById("stateRegister")


const modalRegister = document.getElementById("successModal");
const spanRegister = document.getElementsByClassName("closeRegister")[0];

//Hide/show password
document.getElementById("togglePassword").addEventListener("click", function(){
    let passwordField = document.getElementById("passwordInput")
    if(passwordField.type === "password"){
        passwordField.type = "text"
    } else {
        passwordField.type = "password"
    }
}); 

//Form validation
formRegister.addEventListener("submit",e=>{

//Prevent from submission
e.preventDefault()

//Clear previous error messages
let errors = document.querySelectorAll('.errorRegister');
     errors.forEach(function(error){
         error.textContent = '';
        })

//Validation variables
let isValid=true;

//Validate Name
if(inputName.value.length < 3){
    document.getElementById('nameError').textContent = "Please enter a valid name (3 letters min. and spaces only).";
    isValid = false
}

//Validate Surname 
if(inputSurname.value.trim() === ""){
    document.getElementById('surnameError').textContent = 'Please enter a valid surname (letters and spaces only).';
    isValid = false;
}

//Validate Email
let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
if (inputEmail.value.trim() ==="" || !regexEmail.test(inputEmail.value)){
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    isValid = false;
}

//Validate password
if (inputPassword.value.length < 8){
    document.getElementById('passwordError').textContent = 'Please enter a valid password (8 characters min.)';
    isValid = false;
}

// Validate Phone
let phonePattern = /^[0-9]+$/;
if (!phonePattern.test(inputPhone.value)){
    document.getElementById('phoneError').textContent = 'Please enter a valid phone number (numbers only)'
    isValid = false;
}

//Validate ID
let idPattern = /^[0-9]+$/
if (!idPattern.test(inputId.value)){
    document.getElementById('idError').textContent = 'Please enter a valid ID number (numbers only)';
    isValid = false;
}

// Validate Address
if (inputAddress.value.trim() === '') {
    document.getElementById('addressError').textContent = 'Please enter a valid address';
    isValid = false;
}

// Validate State
    if (inputState.value === 'default') {
        document.getElementById('stateError').textContent = 'Please select your province/state';
        isValid = false;
    }

// If form is valid, show modal
    if (isValid){
    // document.getElementById('formRegister').submit();
    modalRegister.style.display = "block"};

});

// Close modal when click on <span> (x)
spanRegister.onclick = function() {
    modalRegister.style.display = "none";
    // Redirigir a la página principal
    window.location.href = "index.html"; 
}

//close modal when click outside the modal
window.onclick = function(event) {
    if (event.target == modalRegister) {
        modalRegister.style.display = "none";
        // Redirigir a la página principal
        window.location.href = "index.html";
    }
}

