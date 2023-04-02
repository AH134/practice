import { MouseEvent, useState } from "react";

function ListGroup() {
  let items = ["japan", "tokyo", "kyoto", "fukuoka", "osaka"];
  // Hook
  let [selectedIndex, setSelectedIndex] = useState(-1);

  // eventhandler
  // const handleClick = (e: MouseEvent) => {console.log(e)};

  return (
    // <> is same as react fragment
    // {items.length === 0 ? <p>No items found</p> : null}
    <>
      <h1>List</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
