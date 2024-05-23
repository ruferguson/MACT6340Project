(function () {
  "use strict";

  let form = document.querySelector('#contact-form')

  document
    .querySelector("#contact-form-button")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      let formValid = true;
      if (!form.checkValidity()) {
        formValid = false;
      }
      form.classList.add('was-validated');
      if (formValid) {
        sendTheEmail();
      }
    });

  function sendTheEmail() {
    console.log("Contact submit button was clicked.");
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#mail").value;
    let message = document.querySelector("#msg").value;
    console.log("Name: " + name);
    console.log("Email: " + email);
    console.log("Message: " + message);
  }
})();
