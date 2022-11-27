const commentFormHandler = async (event) => {

  event.preventDefault();

  // Collect values from the comment form
  const comment = document.querySelector("#comment").value.trim();
  const post_id = document.querySelector("#comment").getAttribute("data-id");
  const user_name = document.querySelector("#comment").getAttribute("data-name");
  const current_date = new Date();


  content =`${comment}\n - created by:  ${user_name} on ${current_date.toLocaleDateString()}`;
  
  if (content && post_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, post_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, stay in the same page
      alert("comment successfully created");
      document.location.reload();
    } else {
      alert("failed to post comment")
      alert(response.statusText);
    }
  }
}


document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);