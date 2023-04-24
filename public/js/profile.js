// User can delete blog which they have created
const deleteBlogButton = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
alert(id);
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });


    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Could not delete blog 🚫');
    }
  }
};

// Delete an existing comment
const deleteCommentButton = async (event) => {
  alert("Error!");
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

document.querySelector('.blog-list').addEventListener('click', deleteBlogButton);

document.querySelector(".comment-list").addEventListener("click", deleteCommentButton);