document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Previene el envío del formulario

    console.log("Formulario enviado"); // Verifica si se está activando el evento submit

    // Obtener los valores de los campos
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log(name, lastname, phone, email, message); // Verifica los valores de los campos

    // Definir las expresiones regulares
    const nameRegex = /^[A-Za-z\s]+$/;
    const lastnameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/; // 10 dígitos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messageRegex = /.+/; // Al menos un carácter

    // Validar los campos
    if (!nameRegex.test(name)) {
      alert("Por favor, introduce un nombre válido (solo letras y espacios).");
      return;
    }

    if (!lastnameRegex.test(lastname)) {
      alert("Por favor, introduce un apellido válido (solo letras y espacios).");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Por favor, introduce un número de teléfono válido (10 dígitos).");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    if (!messageRegex.test(message)) {
      alert("Por favor, introduce un mensaje.");
      return;
    }

    // Si todas las validaciones pasan, se puede enviar el formulario
    form.submit();
  });
});
