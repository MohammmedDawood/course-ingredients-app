import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
  // const [inputState, setInputState] = useState({ title: "", amount: "" });
  const [enteredtitle, setEnteredtitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredtitle(event.target.value);
    // setInputState((prevState) => ({
    //   title: event.target.value,
    //   amount: prevState.amount,
    // }));
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
    // setInputState((prevState) => ({
    //   title: prevState.title,
    //   amount: event.target.value,
    // }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddIngredient({ title: enteredtitle, amount: enteredAmount });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={enteredtitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>

            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
