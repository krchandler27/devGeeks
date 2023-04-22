// Form for creating new blog
const newBlogForm = async (event) => {
  event.preventDefault();

  const title = document.getElementById("blog-title").value.trim();
  const body = document.getElementById("blog-body").value.trim();

  if (title && body) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({title, body}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Could not create blog 🚫");
    }
  }
};

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newBlogForm);
