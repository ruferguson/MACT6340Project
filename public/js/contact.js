(function () {
  "use strict";

  let form = document.querySelector('#contact-form')
  
  document
    .querySelector("#contact-form-button")
    .addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();
      console.log("Contact submit button was clicked.");
      let name = document.querySelector("#name").value;
      let email = document.querySelector("#mail").value;
      let message = document.querySelector("#msg").value;
      console.log("Name: " + name);
      console.log("Email: " + email);
      console.log("Message: " + message);
    });
})();
  