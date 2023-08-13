import { SearchForm } from "../components/SearchForm";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchByName } from "../api/cocktail-service";

export const Cocktails = () => {
  const [searchQuery] = useSearchParams();
  const query = searchQuery.get("query");

  const [loading, setLoading] = useState(false);
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    if (!query) {
      return;
    }

    async function asyncWrapper() {
      try {
        const cocktailsList = await searchByName(query);
        setCocktails(cocktailsList);
        console.log(cocktailsList);
      } catch (error) {
        console.log("error");
      }
    }

    asyncWrapper();

    return () => {};
  }, [query]);

  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          Search Cocktails
        </h1>

        <SearchForm />
        <CocktailsList cocktails={cocktails} />
      </Section>
    </>
  );
};
