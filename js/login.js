const formLogIn=document.getElementById("formLogIn");
const inputEmail=document.getElementById("emailLogIn");
const inputPassword=document.getElementById("passwordInput");

const modalLogIn = document.getElementById("successModalLogIn");
const spanLogIn = document.getElementsByClassName("closeLogIn")[0];

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
formLogIn.addEventListener("submit", e => {

    //Prevent from submission
    e.preventDefault()

    //Clear previous error messages
    let errors = document.querySelectorAll('.errorLogIn');
    errors.forEach(function(error){
        error.textContent = '';
    })

    //Validation variables
    let isValid = true;

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

    // If form is valid, show modal
    if (isValid){
        // document.getElementById('formRegister').submit();
        modalLogIn.style.display = "block"
    };

});

// Close modal when click on <span> (x)
spanLogIn.onclick = function() {
    modalLogIn.style.display = "none";
    // Redirigir a la página principal
    window.location.href = "index.html"; 
}

//close modal when click outside the modal
window.onclick = function(event) {
    if (event.target == modalLogIn) {
        modalLogIn.style.display = "none";
        // Redirigir a la página principal
        window.location.href = "index.html";
    }
}

