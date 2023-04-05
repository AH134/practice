const person = {
  name: "joe",
  age: 23,
};

const person2 = { ...person, name: "bob" };

const names = ["joe", "bob", "jones"];

// acts like a for loop
const changedName = names.map((name) => {
  return name + "12";
});

//console.log(changedName);

const names2 = ["joe", "bob", "jones", "jones"];

const filteredList = names2.filter((name) => {
  return name !== "jones";
});

//console.log(filteredList);

const users = fetch("https://reqres.in/api/users/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "User 1",
  }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => console.log(data));
