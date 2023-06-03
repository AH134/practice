const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const likesList = blogs.map((blog) => {
    return blog.likes;
  });

  const total = likesList.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return total;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const likesList = blogs.map((blog) => {
    return blog.likes;
  });

  const highestLike = Math.max(...likesList);

  return blogs.find((blog) => {
    return blog.likes === highestLike;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  let authors = [];

  for (i = 0; i < blogs.length; i++) {
    let authorIndex = authors.findIndex(
      (author) => author.author === blogs[i].author
    );

    if (authorIndex === -1) {
      authors.push({
        author: blogs[i].author,
        blogs: 1,
      });
    } else {
      authors[authorIndex].blogs++;
    }
  }

  const mostBlogs = Math.max(...authors.map((author) => author.blogs));

  return authors.find((author) => author.blogs === mostBlogs);
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  let authors = [];

  for (i = 0; i < blogs.length; i++) {
    let authorIndex = authors.findIndex(
      (author) => author.author === blogs[i].author
    );

    if (authorIndex === -1) {
      authors.push({
        author: blogs[i].author,
        likes: blogs[i].likes,
      });
    } else {
      authors[authorIndex].likes += blogs[i].likes;
    }
  }

  const mostLikes = Math.max(...authors.map((author) => author.likes));

  return authors.find((author) => author.likes === mostLikes);
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
