import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button";
import Timer from "./components/Timer";
import { useState } from "react";

function App() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => setAlertVisible(false)}>My Alert</Alert>
      )}
      <Button
        color="secondary"
        onClick={() => {
          setAlertVisible(true);
        }}
      >
        My Button
      </Button>
      <Timer countdownTimestampMs={1712189298582}></Timer>
    </div>
  );
}

export default App;
