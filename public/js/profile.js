// User can delete blog which they have created
const deleteBlogButton = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    alert("Your blog post will be deleted 👍.");
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Could not delete blog 🚫');
    }
  }
};

// Delete an existing comment
const deleteCommentButton = async (event) => {
  
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const commentDelete = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (commentDelete.ok) {
      document.location.replace("/profile");
      
     } 
     alert("Your comment will be deleted 👍.");
  }
};

document.querySelector('.blog-list').addEventListener('click', deleteBlogButton);

document.querySelector(".comment-list").addEventListener("click", deleteCommentButton);