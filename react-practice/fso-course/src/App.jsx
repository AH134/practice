import { useEffect, useState } from "react";
import axios from "axios";
const Filter = ({ onChange }) => {
  return (
    <>
      <span>filter shown with</span>
      <input type="text" onChange={onChange} />
    </>
  );
};

const PersonForm = (props) => {
  const {
    newName,
    newNumber,
    handleOnSubmit,
    handleOnNameChange,
    handleOnNumberChange,
  } = props;

  return (
    <form onSubmit={handleOnSubmit}>
      <div>debug name: {newName}</div>
      <div>debug name: {newNumber}</div>
      <div>
        name: <input value={newName} onChange={handleOnNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleOnNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = (props) => {
  const { isFiltered, filteredList, personList } = props;
  return (
    <ol>
      {isFiltered
        ? filteredList.map((filteredPerson) => {
            return (
              <li key={filteredPerson.id}>
                {filteredPerson.name} {filteredPerson.number}
              </li>
            );
          })
        : personList.map((person) => {
            return (
              <li key={person.id}>
                {person.name} {person.number}
              </li>
            );
          })}
    </ol>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState([]);
  const [filtering, setFiltering] = useState(false);

  // the [] makes it so that it only runs at first render
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3000/persons").then((response) => {
      console.log("reponse fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "rendered");

  const handleOnNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleOnNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find((person) => {
      return person.name === newName;
    });
    if (newName !== "" && newNumber !== "") {
      if (personExists === undefined) {
        const newPersonList = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        };

        setPersons(persons.concat(newPersonList));
        setNewName("");
        setNewNumber("");
      } else {
        window.alert(`${newName} is already added to phonebook`);
      }
    } else {
      window.alert("name or number cannot be empty");
    }
  };

  const handleOnFiltered = (e) => {
    const filteredWord = e.target.value.toLowerCase();
    const filteredList = persons.filter((person) => {
      return person.name.toLowerCase().includes(filteredWord);
    });

    setFiltering(filteredWord !== "");
    setFilter(filteredList);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleOnFiltered} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleOnSubmit={handleOnSubmit}
        handleOnNameChange={handleOnNameChange}
        handleOnNumberChange={handleOnNumberChange}
      />

      <h2>Numbers</h2>
      <Numbers
        isFiltered={filtering}
        filteredList={filter}
        personList={persons}
      />
    </div>
  );
};

export default App;
