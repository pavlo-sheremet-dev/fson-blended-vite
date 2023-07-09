import { SearchForm } from "../components/SearchForm";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";
import { searchByName } from "../api/cocktail-service";

export const Cocktails = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    const asyncWrapper = async () => {
      try {
        const queryCocktails = await searchByName(query);
        setCocktails(queryCocktails);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [query]);
  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          Search Cocktails
        </h1>

        <SearchForm />
        {isLoading && <Loader />}
        <CocktailsList cocktails={cocktails} />
      </Section>
    </>
  );
};
