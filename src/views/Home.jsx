import { useEffect, useState } from "react";
import { CocktailsList } from "../components/CocktailsList";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { getTrendingCocktails } from "../api/cocktail-service";

export const Home = () => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const asyncWrapper = async () => {
      try {
        const trendingCocktails = await getTrendingCocktails();
        setCocktails(trendingCocktails);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, []);

  return (
    <>
      <Section>
        <h1 className="text-center font-black text-gray-700 text-4xl mb-10">
          Trending cocktails
        </h1>
        {isLoading && <Loader />}
        <CocktailsList cocktails={cocktails} />
      </Section>
    </>
  );
};
