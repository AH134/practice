import React from "react";

type NavbarProps = {
  jobFilter: string;
  setJobFilter: (value: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ jobFilter, setJobFilter }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setJobFilter(e.target.value);

  return (
    <nav className="navbar navbar-light bg-light p-2">
      <a className="navbar-brand">Job Board</a>
      <div className="form-inline d-flex">
        <input
          className="form-control mr-sm-2"
          type="search"
          value={jobFilter}
          placeholder="Search"
          aria-label="Search"
          onChange={handleOnChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
