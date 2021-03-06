import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";

import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, sethttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "https://react-project-809e7-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );

        const responseData = response.data;

        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            ...responseData[key],
          });
        }

        setMeals(loadedMeals);
      } catch (error) {
        return Promise.reject(error);
      }
    };

    // Call the function and catch any errors
    fetchMeals().catch((error) => {
      setIsLoading(false);
      sethttpError(error.message);
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>{<ul>{mealsList}</ul>}</Card>
    </section>
  );
};

export default AvailableMeals;
