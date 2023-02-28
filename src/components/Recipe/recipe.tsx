import { useState } from "react";
import { Loading } from "..";
import "./recipe.css";
import {
  RecipeComponentType,
  RecipeDetailsComponentType,
  RecipeType,
} from "../../global/types";

const Recipe = ({ recipes, origin }: RecipeComponentType) => {
  const [recipeDetails, setRecipeDetails] = useState({} as RecipeType);
  const [recipeNutriImg, setRecipeNutriImg] = useState("");
  const [recipePreview, setRecipePreview] = useState(false);
  const [fetching, setFetching] = useState(false);

  const fetchRecipeDetails = async (id: number) => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
      );
      const recipeInfo = await data.json();

      setRecipeDetails(recipeInfo);
    } catch (error) {
      console.log("%cAttempts to get recipe details failed.", "color: crimson");
    }
  };

  const fetchRecipeNutriFacts = async (id: number) => {
    try {
      const imageData = await fetch(
        `https://api.spoonacular.com/recipes/${id}/nutritionLabel.png?&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
      );

      const imageBlob = await imageData.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setRecipeNutriImg(imageObjectURL);
      setFetching(false);
    } catch (error) {
      console.log(
        "%cAttempts to get recipe nutri facts failed.",
        "color: crimson"
      );
    }
  };

  return (
    <>
      {fetching && <Loading />}

      <div className="recipe-container">
        {origin === "fromSearch" &&
          recipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => {
                setFetching(true);
                fetchRecipeDetails(recipe.id);
                fetchRecipeNutriFacts(recipe.id);
                setRecipePreview(true);
              }}
              className="recipe-button"
            >
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </button>
          ))}

        {origin === "fromPopular" &&
          recipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => {
                setFetching(true);
                setRecipeDetails(recipe);
                fetchRecipeNutriFacts(recipe.id);
                setRecipePreview(true);
              }}
              className="recipe-button"
            >
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </button>
          ))}

        {recipePreview &&
          recipeNutriImg &&
          Object.keys(recipeDetails).length > 0 && (
            <RecipeDetails
              viewRecipe={recipeDetails}
              modalBehavior={setRecipePreview}
              nutriImg={recipeNutriImg}
            />
          )}
      </div>
    </>
  );
};

const RecipeDetails = ({
  viewRecipe,
  modalBehavior,
  nutriImg,
}: RecipeDetailsComponentType) => {
  return (
    <div className="recipe-detail-container">
      <div className="recipe-detail">
        <h3>{viewRecipe.title}</h3>
        <img
          src={viewRecipe.image}
          alt={viewRecipe.title}
          className="recipe-detail-img"
        />

        <div
          dangerouslySetInnerHTML={{ __html: viewRecipe.summary }}
          className="recipe-detail-summary"
        />

        <div className="recipe-detail-ing">
          <h4>Ingredients</h4>
          <ul>
            {viewRecipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.original}>{ingredient.original}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-detail-ins">
          <h4>Instructions</h4>
          <ol>
            {viewRecipe.analyzedInstructions[0].steps.map((ingredient) => (
              <li key={ingredient.number}>{ingredient.step}</li>
            ))}
          </ol>
        </div>

        <img
          src={nutriImg}
          alt={viewRecipe.title}
          className="nutri-facts-img"
        />

        <button onClick={() => modalBehavior(false)} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Recipe;
