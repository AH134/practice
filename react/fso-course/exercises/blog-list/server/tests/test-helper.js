const Blog = require("../models/blog");
const User = require("../models/user");

const blogsInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

const invalidId = async () => {
  const newBlog = new Blog({
    title: "joe",
    author: "jodjsa",
    url: "dasd",
  });

  await newBlog.save();
  await newBlog.deleteOne();

  return newBlog._id.toString();
};

const userInDb = async () => {
  const users = await User.find({});

  return users.map((u) => u.toJSON());
};

module.exports = { blogsInDb, invalidId, userInDb };
