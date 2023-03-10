import { useEffect, useState } from "react";
import { Loading, Recipe } from "..";
import { RecipeType } from "../../global/types";
import "./popular.css";

const Popular = () => {
  const date = new Date();
  const today = date.getDate().toLocaleString();

  const [popRecipes, setPopRecipes] = useState<Array<RecipeType>>([]);

  const getRecipes = async () => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
      );
      const { recipes } = await data.json();
      localStorage.setItem("popularRecipes", JSON.stringify(recipes));
      setPopRecipes(recipes);
    } catch (error) {
      console.log("%cAttempts to get recipes failed.", "color: crimson");
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("date") as string) === today) {
      setPopRecipes(
        JSON.parse(localStorage.getItem("popularRecipes") as string)
      );
    } else {
      localStorage.setItem("date", JSON.stringify(today));
      getRecipes();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!popRecipes) {
    return <Loading />;
  }

  return (
    <>
      {popRecipes.length && (
        <section className="popular-container">
          <h2>Popular Recipes</h2>

          <Recipe recipes={popRecipes} origin="fromPopular" />
        </section>
      )}
    </>
  );
};

export default Popular;
