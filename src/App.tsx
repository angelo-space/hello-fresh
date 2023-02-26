import { useEffect } from "react";

const App = () => {
  const findRecipe = async () => {
    const recipe = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
    );
    const response = await recipe.json();
    console.log("🚀 ~ file: App.tsx:5 ~ findRecipe ~ response:", response);
  };

  useEffect(() => {
    //findRecipe();
  }, []);

  return <div>Hello Fresh sdwd</div>;
};

export default App;
