import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  // **** Use the githubcontext ***
  const githubContext = useContext(GithubContext);
  const alertContex = useContext(AlertContext);

  const [text, setText] = useState("");

  const onChangHandler = (e) => setText(e.target.value);

  // If we don't use arrow function then we have to bind this in the caller
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      alertContex.setAlert("Please enter something", "light");
    } else {
      // // Pass the user up to the App component
      // searchUsers(text);

      // call searchUsers from the context instead
      githubContext.searchUsers(text);

      setText("");
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          value={text}
          onChange={onChangHandler}
        />
        <input type="submit" name="Search" className="btn btn-dark btn-block" />
      </form>
      {githubContext.users.length > 0 && (
        <button
          type="button"
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
