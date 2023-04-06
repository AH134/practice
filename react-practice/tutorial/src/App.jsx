import "./App.css";

function App() {
  const bob = true;

  // basically a if statement
  const tes = bob && <h1>I am bob</h1>;

  const isBlack = false;

  return (
    <div className="App">
      {bob ? <h1>I am bob</h1> : <h1>I am not bob</h1>}
      <h1 style={{ color: isBlack ? "black" : "red" }}>
        {isBlack ? <h1>im black</h1> : <h1>im red</h1>}
      </h1>
    </div>
  );
}

export default App;
