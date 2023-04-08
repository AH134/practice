import { useState } from "react";

const App = () => {
  const [value, setValue] = useState(10);

  // function that returns a function
  // function call return another function which executes when button is clicked
  const hello = (who) => {
    const handler = () => {
      console.log("hello", who);
    };
    return handler;
  };

  // short version
  // const hello = (who) => () => {
  //   console.log('hello', who)
  // }

  const setToValue = (newValue) => () => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  // another way without returning a function
  const setToValue2 = (newValue) => {
    console.log("value now", newValue);
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
      <button
        onClick={() => {
          setToValue2(value + 1);
        }}
      >
        increment
      </button>
    </div>
  );
};
export default App;
