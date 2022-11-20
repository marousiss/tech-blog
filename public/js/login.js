const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector("#name-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  const btnValue = document.querySelector("#login-btn").innerHTML;
  

  if (name && password) {
    // Send a POST request to the API endpoint
    if (btnValue === 'sign in') {

      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace("/");
      } else {
        alert(response.statusText);
        document.querySelector("#name-login").value = "";
        document.querySelector("#password-login").value = "";
        document.querySelector("#login-btn").innerHTML = "sign up instead";
      }

    } else {

      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }

    }
      
  }

}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);