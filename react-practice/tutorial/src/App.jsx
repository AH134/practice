import "./App.css";

function App() {
  const users = [
    {
      name: "pedro",
      age: 12,
    },
    {
      name: "joe",
      age: 12,
    },
    {
      name: "bob",
      age: 23,
    },
  ];

  return (
    <div className="App">
      {users.map((user, key) => {
        return <User name={user.name} age={user.age} />;
      })}
    </div>
  );
}

const User = (props) => {
  return (
    <div>
      {props.name} {props.age}
    </div>
  );
};

export default App;
