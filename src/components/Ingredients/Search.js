import React, { useEffect, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");

  const searchChangeHandler = (event) => {
    setEnteredFilter(event.target.value);
    // props.onLoadIngredients(event.target.value);
  };

  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch(
      "https://react-http-c5e4d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json" +
        query
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label htmlFor="search">Filter by Title</label>
          <input
            type="text"
            id="search"
            value={enteredFilter}
            onChange={searchChangeHandler}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
