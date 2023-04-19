const mongoose = require("mongoose");
const blogHelper = require("./test-helper");
const Blog = require("../models/blog");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

test("return blogs in JSON", async () => {
  const amountOfBlogs = await blogHelper.blogsInDb();
  const blogAtStart = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(blogAtStart.body).toHaveLength(amountOfBlogs.length);
});

test("blog unique identifiers are named id", async () => {
  const blogAtStart = await api.get("/api/blogs");
  blogAtStart.body.map((blog) => expect(blog.id).toBeDefined());
});

test("new blogs csan be added to the database", async () => {
  const blogAtStart = await blogHelper.blogsInDb();
  const newPost = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  };
  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAtEnd = await blogHelper.blogsInDb();
  const addedPostInDb = blogAtEnd.find(
    (blog) =>
      blog.title === newPost.title &&
      blog.author === newPost.author &&
      blog.url === newPost.url
  );

  expect(addedPostInDb).toBeDefined();
  expect(blogAtEnd).toHaveLength(blogAtStart.length + 1);
});

test("likes value defaults to 0 if it is missing", async () => {
  const newPost = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };

  await api.post("/api/blogs").send(newPost).expect(201);

  const blogAtEnd = await blogHelper.blogsInDb();
  const addedPostInDb = blogAtEnd.find(
    (blog) =>
      blog.title === newPost.title &&
      blog.author === newPost.author &&
      blog.url === newPost.url
  );

  expect(addedPostInDb.likes).toBe(0);
});

test("respond with status code 400 if title is missing", async () => {
  const newPost = {
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };
  await api.post("/api/blogs").send(newPost).expect(400);
});

test("respond with status code 400 if url is missing", async () => {
  const newPost = {
    title: "this is the title",
    author: "Michael Chan",
    likes: 7,
  };
  await api.post("/api/blogs").send(newPost).expect(400);
});
