import { useState } from "react";
import {
  RecipeComponentType,
  RecipeDetailsComponentType,
  RecipeType,
} from "../../global/types";

const Recipe = ({ recipes, origin }: RecipeComponentType) => {
  const [recipeDetails, setRecipeDetails] = useState({} as RecipeType);
  const [recipeNutriImg, setRecipeNutriImg] = useState("");
  const [recipePreview, setRecipePreview] = useState(false);

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
    } catch (error) {
      console.log(
        "%cAttempts to get recipe nutri facts failed.",
        "color: crimson"
      );
    }
  };

  return (
    <>
      {origin === "fromSearch" &&
        recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => {
              fetchRecipeDetails(recipe.id);
              fetchRecipeNutriFacts(recipe.id);
              setRecipePreview(true);
            }}
          >
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </button>
        ))}

      {origin === "fromPopular" &&
        recipes.map((recipe) => (
          <button
            key={recipe.id}
            onClick={() => {
              setRecipeDetails(recipe);
              fetchRecipeNutriFacts(recipe.id);
              setRecipePreview(true);
            }}
          >
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
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
    </>
  );
};

const RecipeDetails = ({
  viewRecipe,
  modalBehavior,
  nutriImg,
}: RecipeDetailsComponentType) => {
  return (
    <div>
      <button onClick={() => modalBehavior(false)}>Close</button>
      <h1>{viewRecipe.title}</h1>
      <img src={viewRecipe.image} alt={viewRecipe.title} />

      <div dangerouslySetInnerHTML={{ __html: viewRecipe.summary }} />

      <div>
        <ul>
          {viewRecipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.original}>{ingredient.original}</li>
          ))}
        </ul>
      </div>

      <div>
        <ol>
          {viewRecipe.analyzedInstructions[0].steps.map((ingredient) => (
            <li
              key={ingredient.number}
            >{`${ingredient.number}. ${ingredient.step}`}</li>
          ))}
        </ol>
      </div>

      <img src={nutriImg} alt={viewRecipe.title} />
    </div>
  );
};

export default Recipe;
