const morgan = require("morgan");
const express = require("express");
const app = express();

morgan.token("data", function getData(req) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const id = Math.round(Math.random() * 100000);
  return id;
};

const createPerson = (name, number) => {
  const person = {
    id: generateId(),
    name: name,
    number: number,
  };
  return person;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (body.name && body.number) {
    if (!persons.find((person) => person.name.toLowerCase() === body.name)) {
      const person = createPerson(body.name, body.number);
      persons.concat(person);
      res.json(person);
    } else {
      res.json({ error: "name must be unique" });
    }
  } else {
    res.status(404).end();
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return res.status(204).end();
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  const date = new Date();
  const totalInfo = persons.length;

  res.send(
    `<p>Phone book has info for ${totalInfo} people</p> <p>${date.toUTCString()}</p>`
  );
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
