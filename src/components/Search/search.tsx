import { useEffect, useRef, useState } from "react";
import { Loading, Recipe } from "..";

const Search = () => {
  const queryRef = useRef() as any;
  const [query, setQuery] = useState("name");
  const [sort, setSort] = useState("meta-score");
  const [results, setResults] = useState([]);

  const findRecipes = async (e: any) => {
    e.preventDefault();

    switch (query) {
      case "name":
        try {
          const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${queryRef.current.value}&sort=${sort}&number=20&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
          );
          const { results } = await data.json();
          setResults(results);
        } catch (error) {
          console.log("%cAttempts to get results failed.", "color: crimson");
        }
        break;

      case "ingredient":
        try {
          const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${queryRef.current.value}&sort=${sort}&number=20&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
          );
          const { results } = await data.json();
          setResults(results);
        } catch (error) {
          console.log("%cAttempts to get results failed.", "color: crimson");
        }
        break;

      case "cuisine":
        try {
          const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?cuisine=${queryRef.current.value}&sort=${sort}&number=20&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
          );
          const { results } = await data.json();
          setResults(results);
        } catch (error) {
          console.log("%cAttempts to get results failed.", "color: crimson");
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <form onSubmit={findRecipes}>
        <input type="button" value="Name" onClick={() => setQuery("name")} />

        <input
          type="button"
          value="Ingredient"
          onClick={() => setQuery("ingredient")}
        />

        <input
          type="button"
          value="Cuisine"
          onClick={() => setQuery("cuisine")}
        />

        <input
          type="text"
          name="query"
          ref={queryRef}
          placeholder="Search a recipe, ingerdient or cuisine..."
          required
        />

        <input type="submit" value="Search" />

        <input
          type="submit"
          value="Rate/Score"
          onClick={() => setSort("meta-score")}
        />

        <input
          type="submit"
          value=" Number of Ingredients"
          onClick={() => setSort("max-used-ingredients")}
        />
      </form>

      {results.length ? (
        <Recipe recipes={results} origin="fromSearch" />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Search;
