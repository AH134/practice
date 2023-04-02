import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["japan", "tokyo", "kyoto", "fukuoka", "osaka"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  }

  return (
    <div>
      <Alert>
        <h1>joe</h1>
        Hello World
      </Alert>
    </div>
  );
}

export default App;
