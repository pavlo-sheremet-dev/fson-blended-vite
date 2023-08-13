
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useEffect, useRef, useState } from "react";
import { getCocktailDetail } from "../api/cocktail-service";

export const CocktailDetail = () => {
  const { cocktailId } = useParams();
  // const location = useRef(useLocation());

  const [cocktail, setCocktail] = useState(null);
  const location = useLocation();
  const goBackLink = useRef(location.state?.from ?? "/");

  useEffect(() => {
    // if (!query) {
    //   return;
    // }

    async function asyncWrapper() {
      try {
        const cocktail = await getCocktailDetail(cocktailId);
        setCocktail(cocktail);
      } catch (error) {
        console.log("error");
      }
    }

    asyncWrapper();

    return () => {};
  }, [cocktailId]);

  return (
    <>
      <GoBackBtn path={goBackLink.current}>Go ba</GoBackBtn>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center"></h1>
        {cocktail && <CocktailInfo {...cocktail} />}
      </Section>
    </>

  );
};
