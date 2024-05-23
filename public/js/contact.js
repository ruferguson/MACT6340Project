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
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#inputEmail").value;
    let message = document.querySelector("#inputMessage").value;
    let obj = {
      sub: `${document.querySelector("#firstName").value} ${document.querySelector("#lastName").value} submitted a contact form!`,
      txt:
      `${document.querySelector("#firstName").value} ${document.querySelector("#lastName").value} sent you a message that reads:
      
        ${document.querySelector("#inputMessage").value}.

Their email address is ${document.querySelector("#inputEmail").value}`,
    };
    fetch("/mail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((r) => r.json())
      .then((response) => {
        document.querySelector("#contact-button-response").innerHTML = response.result;
      })
      .then(() => {
        setTimeout(() => {
          document.querySelector("#contact-button-response").innerHTML = "";
        }, "5000");
      });

    console.log("Name: " + firstName + " " + lastName);
    console.log("Email: " + email);
    console.log("Message: " + message);
    console.log(obj);
  }
})();
