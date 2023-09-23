import { useEffect, useRef, useState } from "react";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation, useParams } from "react-router-dom";
import { getCocktailDetail } from "../api/cocktail-service";
import { routes } from "../routes";

export const CocktailDetail = () => {
  const { cocktailId } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const goBack = useRef(location.state?.from ?? routes.COCKTAILS);

  useEffect(() => {
    async function asyncWrapper() {
      try {
        setIsError(false);
        setIsLoader(true);
        const cocktail = await getCocktailDetail(cocktailId);
        setCocktail(cocktail);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoader(false);
      }
    }
    asyncWrapper();

    return () => {};
  }, [cocktailId]);

  return (
    <Section>
      <h1 className="uppercase text-4xl text-gray-600 text-center">
        CocktailDetail
      </h1>
      <GoBackBtn path={goBack.current} />
      {cocktail && <CocktailInfo {...cocktail} />}
      {isLoader && <Loader />}
    </Section>
  );
};
