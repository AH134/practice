import { useEffect, useState } from "react";
import personService from "./services/persons";

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
  const { isFiltered, filteredList, personList, handleOnDelete } = props;
  return (
    <>
      {isFiltered
        ? filteredList.map((filteredPerson) => {
            return (
              <div key={filteredPerson.id}>
                <li>
                  {filteredPerson.name} {filteredPerson.number}
                  <button onclick={() => handleOnDelete(filteredPerson)}>
                    delete
                  </button>
                </li>
              </div>
            );
          })
        : personList.map((person) => {
            return (
              <div key={person.id}>
                <li>
                  {person.name} {person.number}
                  <button onClick={() => handleOnDelete(person)}>delete</button>
                </li>
              </div>
            );
          })}
    </>
  );
};

const Notification = ({ message, color }) => {
  if (message == null) {
    return null;
  }
  return <div className={color}>{message}</div>;
};
const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filter, setFilter] = useState([]);
  const [filtering, setFiltering] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleOnFiltered = (e) => {
    const filteredWord = e.target.value.toLowerCase();
    const filteredList = persons.filter((person) => {
      return person.name.toLowerCase().includes(filteredWord);
    });

    setFiltering(filteredWord !== "");
    setFilter(filteredList);
  };

  const handleOnDelete = (person) => {
    const { name, id } = person;
    if (confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          setNotificationMessage(
            `Information of ${name} has already been removed from server`
          );
          setSuccess(false);

          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);

          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const handleOnNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleOnNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  // the [] makes it so that it only runs at first render
  useEffect(() => {
    personService
      .getAll()
      .then((returnedPersons) => setPersons(returnedPersons));
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find((person) => person.name === newName);

    if (newName !== "" && newNumber !== "") {
      if (personExists === undefined) {
        const newPerson = {
          name: newName,
          number: newNumber,
        };

        personService.create(newPerson).then((returnedPersons) => {
          setPersons(persons.concat(returnedPersons));
          setNewName("");
          setNewNumber("");
        });

        setNotificationMessage(`Added ${newName}`);
        setSuccess(true);

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      } else {
        // if name exists
        const updateNumber = window.confirm(
          `${personExists.name} is already added to phonebook, replace the old number with a new one?`
        );

        if (updateNumber) {
          const updatedNumber = { ...personExists, number: newNumber };
          personService
            .update(personExists.id, updatedNumber)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.name !== newName ? person : returnedPerson
                )
              );
              setNewName("");
              setNewNumber("");
            });
        }
      }
    } else {
      window.alert("name or number cannot be empty");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {success ? (
        <Notification message={notificationMessage} color="success" />
      ) : (
        <Notification message={notificationMessage} color="error" />
      )}
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
        handleOnDelete={handleOnDelete}
      />
    </div>
  );
};

export default App;
