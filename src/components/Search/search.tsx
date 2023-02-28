import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { Loading, Recipe } from "..";
import { RecipeType } from "../../global/types";
import "./search.css";

const Search = () => {
  const [query, setQuery] = useState("name");
  const [sort, setSort] = useState("meta-score");
  const [fetching, setFetching] = useState(false);
  const [results, setResults] = useState<Array<RecipeType>>([]);
  const queryRef = useRef() as MutableRefObject<HTMLInputElement>;

  const findRecipes = async (e: FormEvent) => {
    e.preventDefault();
    setFetching(true);

    switch (query) {
      case "name":
        try {
          const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?query=${queryRef.current.value}&sort=${sort}&number=20&apiKey=${process.env.REACT_APP_RECIPE_KEY}`
          );
          const { results } = await data.json();
          setResults(results);
          setFetching(false);
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
          setFetching(false);
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
          setFetching(false);
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
      {fetching && <Loading />}

      <section className="search-container">
        <form onSubmit={findRecipes}>
          <input
            type="text"
            ref={queryRef}
            placeholder="Search a recipe..."
            required
          />

          <input type="submit" value="Search" />

          <div className="search-options">
            <ul>
              <li>
                <p>
                  {query === "name" && "Name"}
                  {query === "ingredient" && "Ingredient"}
                  {query === "cuisine" && "Cuisine"}
                </p>
                <ul>
                  <li>
                    <input
                      type="button"
                      value="Name"
                      onClick={() => setQuery("name")}
                    />
                  </li>
                  <li>
                    <input
                      type="button"
                      value="Ingredient"
                      onClick={() => setQuery("ingredient")}
                    />
                  </li>
                  <li>
                    <input
                      type="button"
                      value="Cuisine"
                      onClick={() => setQuery("cuisine")}
                    />
                  </li>
                </ul>
              </li>

              <li>
                <p>
                  {sort === "meta-score" && "Rate/Score"}
                  {sort === "max-used-ingredients" && "# of Ingredients"}
                </p>
                <ul>
                  <li>
                    <input
                      type="submit"
                      value="Rate/Score"
                      onClick={() => setSort("meta-score")}
                    />
                  </li>
                  <li>
                    <input
                      type="submit"
                      value="# of Ingredients"
                      onClick={() => setSort("max-used-ingredients")}
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </form>
      </section>

      <section className="search-results">
        {results.length ? <h2>Search Results</h2> : ""}
        {results.length ? <Recipe recipes={results} origin="fromSearch" /> : ""}
      </section>
    </>
  );
};

export default Search;
