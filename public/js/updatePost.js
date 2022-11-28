const updatePostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the update post form
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  const id = document
    .querySelector("#post-title")
    .getAttribute("data-id");
  const user_id = document
    .querySelector("#post-title")
    .getAttribute("data-user_id");
  
  if (id && title && content && user_id) {
    //update post 
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content, user_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("post updated successefully!");
      document.location.replace(`/dashboard/${user_id}`);
    } else {
      alert("failed to update post");
      alert(response.statusText);
    }

  }
  
};



document
  .querySelector(".update-post-form")
  .addEventListener("submit", updatePostFormHandler);