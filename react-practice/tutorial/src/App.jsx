import "./App.css";
import Planet from "./Planet";

function App() {
  const planets = [
    {
      name: "pedro",
      isGasPlanet: true,
    },
    {
      name: "joe",
      isGasPlanet: false,
    },
    {
      name: "bob",
      isGasPlanet: true,
    },
  ];

  return (
    <div className="App">
      {planets.map((planet, key) => {
        return <Planet name={planet.name} isGasPlanet={planet.isGasPlanet} />;
      })}
    </div>
  );
}

export default App;
