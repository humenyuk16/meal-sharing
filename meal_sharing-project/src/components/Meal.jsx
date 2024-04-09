/* build the Meal component so that you can use it in the MealsList and render a 
nice Meal card for each meal. The component should accept a meal object
 as a prop and render all its relevant details. The MealsList should render all 
 the meals in a grid. */
const Meal = ({ meal }) => {
  return (
    <div className="MealsList-item ">
      <img
        className="meal-card-image"
        src={meal.image_url}
        alt={meal.title}
      ></img>
      <h3 className="meal-card-title">{meal.title}</h3>
      <p className="meal-card-description">{meal.description}</p>
      <p className="meal-card-price">Price: ${meal.price}</p>
    </div>
  );
};

export default Meal;
