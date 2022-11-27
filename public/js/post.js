const addNewPostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the new post form
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  const user_id = parseInt(document.querySelector("#post-title").getAttribute("data-user_id"));
  
  
  if (title && content && user_id) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content, user_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("post added successefully!");
      document.location.replace(`/dashboard/${user_id}`);
    } else {
      alert("failed to add post");
      alert(response.statusText);
    }
  }

}



document
  .querySelector(".new-post-form")
  .addEventListener("submit", addNewPostFormHandler);