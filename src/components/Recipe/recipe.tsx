import { useEffect, useState } from "react";

const Recipe = ({ recipes, origin }: any) => {
  const [recipeDetails, openRecipeDetails] = useState() as any;
  const [recipeNutriImg, setRecipeNutriImg] = useState() as any;

  const fetchRecipeDetails = async (id: any) => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
      );
      const recipeInfo = await data.json();

      openRecipeDetails(recipeInfo);
    } catch (error) {
      console.log("%cAttempts to get recipe details failed.", "color: crimson");
    }
  };

  const fetchRecipeNutriFacts = async (id: any) => {
    try {
      const imageData = await fetch(
        `https://api.spoonacular.com/recipes/${id}/nutritionLabel.png?&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
      );

      const imageBlob = await imageData.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob as any);
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
        recipes.map((recipe: any) => (
          <button
            key={recipe.id}
            onClick={() => {
              fetchRecipeDetails(recipe.id);
              fetchRecipeNutriFacts(recipe.id);
            }}
          >
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </button>
        ))}

      {origin === "fromPopular" &&
        recipes.map((recipe: any) => (
          <button
            key={recipe.id}
            onClick={() => {
              openRecipeDetails(recipe);
              fetchRecipeNutriFacts(recipe.id);
            }}
          >
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </button>
        ))}

      {recipeDetails && (
        <RecipeDetails
          viewRecipe={recipeDetails}
          modalBehavior={openRecipeDetails}
          nutriImg={recipeNutriImg}
        />
      )}
    </>
  );
};

const RecipeDetails = ({ viewRecipe, modalBehavior, nutriImg }: any) => {
  return (
    <div>
      <button onClick={() => modalBehavior()}>Close</button>
      <h1>{viewRecipe.title}</h1>
      <img src={viewRecipe.image} alt={viewRecipe.title} />

      <div dangerouslySetInnerHTML={{ __html: viewRecipe.summary }} />

      <div>
        <ul>
          {viewRecipe.extendedIngredients.map((ing: any) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      </div>

      <div>
        <ol>
          {viewRecipe.analyzedInstructions[0].steps.map((ing: any) => (
            <li key={ing.number}>{`${ing.number}. ${ing.step}`}</li>
          ))}
        </ol>
      </div>

      <img src={nutriImg} alt={viewRecipe.title} />
    </div>
  );
};

export default Recipe;
