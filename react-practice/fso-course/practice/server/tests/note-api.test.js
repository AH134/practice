const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test-helper");
const app = require("../app");
const api = supertest(app);
const Note = require("../models/note");

beforeEach(async () => {
  await Note.deleteMany({});

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }
});

describe("When there is initially some ntoes saved", () => {
  test("notes are returned as JSON", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("all notes are returned", async () => {
    const res = await api.get("/api/notes");

    expect(res.body).toHaveLength(helper.initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const res = await api.get("/api/notes");

    const contents = res.body.map((r) => r.content);

    expect(contents).toContain("Browser can execute only JavaScript");
  });
});

describe("viewing a specific note", () => {
  test("succeeds with a valid id", async () => {
    const noteAtStart = await helper.notesInDb();

    const noteToView = noteAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultNote.body).toEqual(noteToView);
  });

  test("fails with status code 404 if note does note exist", async () => {
    const validNonExistingId = await helper.nonExistingId();

    await api.get(`/api/notes/${validNonExistingId}`).expect(404);
  });

  test("fails with status code 400 if id is invalid", async () => {
    const invalidId = "3123asdfsd3434";

    await api.get(`/api/notes/${invalidId}`).expect(400);
  });
});

describe("addition of a new note", () => {
  test("suceeds with valid data", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((r) => r.content);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("fails if status code 400 if data invalid ", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote).expect(400);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe("deletion of a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const noteAtStart = await helper.notesInDb();
    const noteToDelete = noteAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

    const contents = notesAtEnd.map((r) => r.content);
    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
