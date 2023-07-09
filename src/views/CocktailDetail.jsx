/** @format */

import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation, useParams } from "react-router-dom";
import { routes } from "../routes";
import log from "eslint-plugin-react/lib/util/log";
import { getCocktailDetail } from "../api/cocktail-service";
import { useEffect, useState } from "react";

export const CocktailDetail = () => {
  const { cocktailId } = useParams();
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const asyncWrapper = async () => {
      try {
        const cocktailDetail = await getCocktailDetail(cocktailId);
        setCocktailDetails(cocktailDetail);
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
      <h1 className="uppercase text-4xl text-gray-600 text-center">
        CocktailDetail
      </h1>
      {cocktailDetails && <CocktailInfo {...cocktailDetails} />}
      {isLoading && <Loader />}
    </>
  );
};
