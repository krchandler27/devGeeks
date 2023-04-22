// Update existing blog
const updateblogOutline = async (event) => {
    event.preventDefault();
  
    const blog_id = document.getElementById("blog-id").value;
    const title = document.getElementById("blog-title").value.trim();
    const body = document.getElementById("blog-body").value.trim();
  
    if (title, body) {
      try {
        const blogInfo = await fetch(`/api/blogs/${blog_id}`, {
          method: "PUT",
          body: JSON.stringify({ title: title , body: body}),
          headers: { "Content-Type": "application/json" },
        });
  
        if (blogInfo.ok) {
          // alert("blog Updated 👍");
          document.location.replace("/profile");
        } else {
          alert("🚫 Could not update blog 🚫");
        }
      } catch (err) {
        console.log("🐠🐠🐠🐠", err);
      }
    }
  };
  
  document
    .getElementById("update-blog-outline")
    .addEventListener("submit", updateBlogOutline);
  