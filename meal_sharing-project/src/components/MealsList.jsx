import React from "react";
import useFetch from "./useFetch";
function MealsList() {
  const {
    data: meals,
    isLoading,
    error,
  } = useFetch("http://127.0.0.1:5001/api/meals");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="MealsList-title">Meals List</h2>
      <div className="MealsList-container">
        {meals.map((meal) => (
          <div key={meal.id} className="MealsList-item">
            <h3 className="MealsList-item-title">{meal.title}</h3>
            <p className="MealsList-item-description">{meal.description}</p>
            <p className="MealsList-item-price">Price: ${meal.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealsList;
