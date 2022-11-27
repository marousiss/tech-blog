
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector("#name-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (!name) {
    alert("please enter username");
  }

  if (!password) {
    alert("please enter password");
  }

  //Create new user
  if (name && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace("/");
    } else {
      alert("User already exists. Login instead.");
      //alert(response.statusText);
    }
  }


}





document
  .querySelector(".signUp-form")
  .addEventListener("submit", loginFormHandler);