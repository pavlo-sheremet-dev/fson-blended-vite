import { useState, useEffect } from "react";
import { CocktailsList } from "../components/CocktailsList";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { getTrendingCocktails } from "../api/cocktail-service";

export const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function asyncWrapper() {
      try {
        setIsError(false);
        setIsLoader(true);
        const cocktails = await getTrendingCocktails({
          signal: controller.signal,
        });
        setCocktails(cocktails);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoader(false);
      }
    }
    asyncWrapper();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <Section>
        <h1 className="text-center font-black text-gray-700 text-4xl mb-10">
          Trending cocktails
        </h1>

        <CocktailsList cocktails={cocktails} />
        {isLoader && <Loader />}
      </Section>
    </>
  );
};
