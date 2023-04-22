// User can delete blog which they have created
const deleteBlogButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      console.log(id);

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE'
      });
  console.log(`/api/blogs/${id}`);
  console.log(response);

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Could not delete blog 🚫');
      }
    }
  };
  
  document.querySelector('.blog-list').addEventListener('click', deleteBlogButton);

// Delete an existing comment
const deleteCommentButton = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const commentDelete = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (commentDelete.ok) {
      document.location.replace("/profile");
    } else {
      alert("🚫 Could not delete Comment 🚫");
    }
  }
};

document
  .querySelector(".comment-list")
  .addEventListener("click", deleteCommentButton);