const router = require("express").Router();
const { Blog } = require("../../models");
const authorize = require("../../utils/auth");

// Post/create new blog after being signed in to profile
router.post("/", authorize, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(202).json(newBlog);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Update blog created by user from profile
router.put("/:id", authorize, async (req, res, next) => {
  try {
    const findBlog = await Blog.update(
      {
        blog_name: req.body.blog_name,
        author: req.body.author,
        description: req.body.description,
        genres: req.body.genres,
        image: req.body.image,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!findBlog) {
      res.status(404).json({ message: "🚫 Could not Update blog 🚫" });
      return;
    }
    res.status(202).json(findBlog);
  } catch (err) {
    res.status(505).json(err);
  }
});

// Delete blog created by user
router.delete("/:id", authorize, async (req, res) => {
  try {
    const blogInfo = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogInfo) {
      res.status(404).json({
        message: "🚫 No matching blog ID 🚫",
      });
      return;
    }
    res.status(202).json(blogInfo);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
