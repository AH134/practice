const Header = (props) => {
  return <h1>{props.courseName.name}</h1>;
};

const Total = (props) => {
  const partsArray = props.course.parts;
  let total = 0;

  partsArray.forEach((part) => {
    total += part.exercises;
  });

  return <p>Number of exercises {total}</p>;
};

const Part = (props) => {
  const partsArray = props.course.parts;
  const parts = partsArray.map((part) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
  });

  return <div className="parts">{parts}</div>;
};

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course} />
      <Part course={course} />
      <Total course={course} />
    </div>
  );
}

export default App;
