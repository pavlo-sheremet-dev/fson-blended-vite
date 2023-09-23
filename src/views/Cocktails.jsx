import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchForm } from "../components/SearchForm";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";
import { searchByName } from "../api/cocktail-service";

export const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchparams] = useSearchParams();
  const query = searchparams.get("query");
  useEffect(() => {
    if (!query) return;
    async function asyncWrapper() {
      try {
        setIsError(false);
        setIsLoader(true);
        const cocktails = await searchByName(query);
        setCocktails(cocktails);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoader(false);
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
        {isLoader && <Loader />}
      </Section>
    </>
  );
};
