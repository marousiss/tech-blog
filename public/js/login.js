const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector("#name-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (!name) {
    alert("Please enter username");
  }

  if (!password) {
    alert("please enter password");
  }

  if (name && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace("/");
    } else {
      alert("Incorrect user or password. Please try again!");
      alert(response.statusText);
    }
  
  }

}


document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);