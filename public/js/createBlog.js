// Form for creating new blog
const newBlogForm = async (event) => {
  event.preventDefault();

  const blogTitle = document.getElementById("blog-title").value.trim();
  const blogBody = document.getElementById("blog-body").value.trim();

  if (blogTitle && blogBody) {
    const response = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify({blogTitle, blogBody}),
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
