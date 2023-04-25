const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", userExtractor, async (req, res) => {
  const { title, url, author } = req.body;
  const userFromToken = req.user;

  if (!title || !url) {
    return res.status(400).end();
  }

  const user = await User.findById(userFromToken.id);
  const blog = new Blog({
    title,
    author,
    url,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", userExtractor, async (req, res) => {
  const userFromToken = req.user;

  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(400).json({ error: "invalid id" });
  }

  const user = await User.findById(userFromToken.id);
  if (!(blog.user.toString() === user._id.toString())) {
    return res.status(401).json({ error: "invalid user" });
  }

  await Blog.findByIdAndRemove(req.params.id);
  user.blogs = user.blogs.filter((b) => b.toString() !== blog._id.toString());
  await user.save();
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: { likes: req.body.likes } },
    { new: true }
  );

  res.json(updatedBlog);
});

module.exports = blogRouter;
