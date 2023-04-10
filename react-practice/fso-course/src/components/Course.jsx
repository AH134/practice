const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Content = ({ course }) => {
  const totalExercises = course.reduce((acc, currValue) => {
    return acc + currValue.exercises;
  }, 0);

  const courseParts = course.map((part) => {
    return <ContentPart key={part.id} part={part} />;
  });

  return (
    <div>
      {courseParts}
      <li>
        <b>total of {totalExercises} exercises</b>
      </li>
    </div>
  );
};

const ContentPart = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <>
      <Header title={name} />
      <Content course={parts} />
    </>
  );
};

export default Course;
