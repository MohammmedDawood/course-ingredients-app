import React, { useReducer, useEffect, useCallback, useMemo } from "react"; //useEffect,useState,

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
};

// const httpReducer = (curHttpState, action) => {
//   switch (action.type) {
//     case "SEND":
//       return { loading: true, error: null };
//     case "RESPONSE":
//       return { ...curHttpState, loading: false };
//     case "ERROR":
//       return { loading: false, error: action.errorMessage };
//     case "CLEAR":
//       return { ...curHttpState, error: null };
//     default:
//       throw new Error("Should not be reached!");
//   }
// };

const Ingredients = () => {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier } =
    useHttp();
  // const [httpState, dispatchHttp] = useReducer(httpReducer, {
  //   loading: false,
  //   error: null,
  // });

  console.log("RENDERING INGREDIENTS", userIngredients);

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    sendRequest(
      `https://react-http-c5e4d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json`,
      "POST",
      JSON.stringify(ingredient),
      ingredient,
      "ADD_INGREDIENT"
    );
    // dispatchHttp({ type: "SEND" });
    // //server update
    // fetch(
    //   "https://react-http-c5e4d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(ingredient),
    //     headers: { "Content-Type": "application/json" },
    //   }
    // )
    //   .then((response) => {
    //     dispatchHttp({ type: "RESPONSE" });
    //     return response.json();
    //   })
    //   .then((responseData) => {
    // dispatch({
    //   type: "ADD",
    //   ingredient: { id: responseData.name, ...ingredient },
    // });
    //   });
  }, []);

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `https://react-http-c5e4d-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_INGREDIENT"
      );
      // dispatchHttp({ type: "SEND" });
      // fetch(
      //   `https://react-http-c5e4d-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${ingredientId}.json`,
      //   {
      //     method: "DELETE",
      //   }
      // )
      //   .then((response) => {
      //     dispatchHttp({ type: "RESPONSE" });
      //     dispatch({ type: "DELETE", id: ingredientId });
      //   })
      //   .catch((error) => {
      //     dispatchHttp({ type: "ERROR", errorMessage: "Something went wrong!" });
      //   });
    },
    [sendRequest]
  );

  const clearError = useCallback(() => {
    // dispatchHttp({ type: "CLEAR" });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveIngredient={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
        {/* <IngredientList
          ingredients={userIngredients}
          onRemoveIngredient={removeIngredientHandler}
        /> */}
      </section>
    </div>
  );
};

export default Ingredients;
