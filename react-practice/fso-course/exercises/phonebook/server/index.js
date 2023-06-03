require("dotenv").config();
const Person = require("./models/person");
const morgan = require("morgan");
const express = require("express");
const app = express();

morgan.token("data", function getData(req) {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (body.name && body.number) {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person
      .save()
      .then((savedPerson) => {
        res.json(savedPerson);
      })
      .catch((err) => next(err));
  } else {
    res.status(404).end();
  }
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res, next) => {
  const date = new Date();

  Person.countDocuments({})
    .then((totalDoc) => {
      res.send(
        `<p>Phone book has info for ${totalDoc} people</p> <p>${date.toUTCString()}</p>`
      );
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(404).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
