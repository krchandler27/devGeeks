// Form for creating new blog comment
const commentFormHandler = async function (event) {
  event.preventDefault();

  const blog_id = document.querySelector('input[name="blog_id"]').value;
  const body = document.getElementById("comment-body").value.trim();

  if (body && blog_id) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ body, blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/blogs/" + blog_id);
    } else {
      alert("Could not add comment 🚫");
    }
  }
};

document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);