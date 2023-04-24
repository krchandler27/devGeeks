const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const authorize = require("../utils/auth");

// Find all blogs and add User name
router.get("/", async (req, res) => {
  try {
    const blogInfo = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize or make the data easier to read
    const blogs = blogInfo.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Find all comments and add User name
router.get("/", async (req, res) => {
  try {
    const commentInfo = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize or make the data easier to read
    const comments = commentInfo.map((comment) => comment.get({ plain: true }));

    res.render("homepage", {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Get One blog by ID along with comments
router.get("/blogs/:id", authorize, async (req, res) => {
  try {
    const blogInfo = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ["name"] }],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
      // order: [[{ model: Comment}, "date_created", DESC]]
    });

    const blog = blogInfo.get({ plain: true });

    const blogComments = blogInfo.comments.map((comment) =>
      comment.get({ plain: true })
    );

    res.render("blog", {
      ...blog,
      ...blogComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to create blog
router.get("/profile/createBlog", authorize, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userInfo.get({ plain: true });

    res.render("createBlog", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Update blog using blog id
router.get("/blogs/:id/updateBlog", authorize, async (req, res) => {
  try {
    const findBlog = await Blog.findByPk(req.params.id);
    const blog = findBlog.get({ plain: true });

    res.render("updateBlog", {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to add comment
router.get("/blogs/:id/addComment", authorize, async (req, res) => {
  try {
    const blogInfo = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
        },
      ],
    });
    const blog = blogInfo.get({ plain: true });

    res.render("addComment", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Update comment by comment id
router.get("/comments/:id/updateComment", authorize, async (req, res) => {
  try {
    const findcomment = await Comment.findByPk(req.params.id);
    const comment = findcomment.get({ plain: true });

    res.render("updateComment", {
      comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// Must be logged in to get profile information
router.get("/profile", authorize, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }, { model: Comment }],
    });

    const user = userInfo.get({ plain: true });
    console.log(user);
    res.render("profile", {
      blogs: user.Blogs,
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(505).json(err);
  }
});

// After logging in go to profile page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("login");
});

module.exports = router;
