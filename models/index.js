const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Post has many comments, defining foreign key and onDelete method
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

Blog.belongsTo(User, {
  foreignKey: "user_id",
});

// Comment belongs to User, defining foreign key and onDelete method
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
});

module.exports = {
  User,
  Comment,
  Blog,
};
