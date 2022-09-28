import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    //server update
    fetch(
      "https://react-http-c5e4d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setUserIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />
      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveIngredient={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
