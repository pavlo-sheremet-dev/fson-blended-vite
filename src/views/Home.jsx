
import { CocktailsList } from "../components/CocktailsList";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";

import { getTrendingCocktails } from "../api/cocktail-service";

export const Home = () => {
  const [cocktails, setCocktails] = useState([]);


  useEffect(() => {
    const controller = new AbortController();
    async function asyncWrapper() {
      try {
        const cocktailsList = await getTrendingCocktails(controller.signal);
        setCocktails(cocktailsList);
      } catch (error) {
        console.log("error");
      }
    }

    asyncWrapper();

    return () => {
      // controller.abort();
    };

  }, []);

  return (
    <>
      <Section>
        <h1 className="text-center font-black text-gray-700 text-4xl mb-10">
          Trending cocktails
        </h1>

        <CocktailsList cocktails={cocktails} />
      </Section>
    </>
  );
};
