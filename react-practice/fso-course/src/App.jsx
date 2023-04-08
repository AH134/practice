import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, givenFeedback } = props;
  const total = good + neutral + bad;
  const average = good + bad / total;
  const positive = good / bad;

  return (
    <div>
      {givenFeedback ? (
        <table>
          <tbody>
            <StatsLine text="good" value={good} />
            <StatsLine text="neutral" value={neutral} />
            <StatsLine text="bad" value={bad} />
            <StatsLine text="total" value={total} />
            <StatsLine text="average" value={average} />
            <StatsLine text="positive" value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [givenFeedback, setGivenFeedback] = useState(false);

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => {
          setGood(good + 1);
          setGivenFeedback(true);
        }}
        text="good"
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
          setGivenFeedback(true);
        }}
        text="neutral"
      />
      <Button
        handleClick={() => {
          setBad(bad + 1);
          setGivenFeedback(true);
        }}
        text="bad"
      />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        givenFeedback={givenFeedback}
      />
    </div>
  );
};
export default App;
