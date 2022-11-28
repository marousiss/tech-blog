const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const user_id = event.target.getAttribute("data-user_id");

    //Delete post
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("post delete successfully.");
      document.location.replace(`/dashboard/${user_id}`);
    } else {
      alert("Failed to delete post");
    }
  }
};


document
  .querySelector("#delete-post")
  .addEventListener("click", delButtonHandler);