const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { title, url, author } = req.body;
  if (!title || !url) {
    return res.status(400).end();
  }

  const user = await User.find({});
  const blog = new Blog({
    title,
    author,
    url,
    user: user[0]._id,
  });

  const savedBlog = await blog.save();
  console.log(user[1]);
  user[1].blogs = user[1].blogs.concat(savedBlog._id);
  await user[1].save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
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
