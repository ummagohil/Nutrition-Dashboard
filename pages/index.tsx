import Head from "next/head";
import dynamic from "next/dynamic";
import {
  MealType,
  Breakfast,
  Lunch,
  Dinner,
  MockAutoComplete,
} from "../components";
import { ChangeEvent, useCallback, useState } from "react";
import { useFetchData } from "../data/getData";
import { useNutrientsMutation } from "../data/getNutrients";

import { search } from "@/types/types";

const OverallNoSSR = dynamic(() => import("../components/Analytics/Overall"), {
  ssr: false,
});

export default function Home() {
  const [mealType, setMealType] = useState<Boolean>(false);
  const [meal, setMeal] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [searchItems, setSearchItems] = useState<search>([]);

  const { data: test, isLoading, error } = useFetchData(value);
  const {
    mutateAsync,
    isLoading: loading,
    error: nutrientError,
  } = useNutrientsMutation();

  const onSubmitAC = (values: any) => {
    setValue(values.searchItem);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    const response = await mutateAsync({ query: value, meal: meal });
    setSearchItems((prevItems) => [...prevItems, ...response.searchItems]);
    onSubmitAC(value);
    setValue("");
  };

  const breakfastMeal = useCallback(() => {
    setMealType(true);
    setMeal("breakfast");
  }, [setMeal, setMealType]);

  const lunchMeal = useCallback(() => {
    setMealType(true);
    setMeal("lunch");
  }, [setMeal, setMealType]);

  const dinnerMeal = useCallback(() => {
    setMealType(true);
    setMeal("dinner");
  }, [setMeal, setMealType]);

  const onChangeAC = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // TO DO
  // 6. add error handling - formik [half done - 26/04]
  // 7. testing [done - 26/04 to 27/04]
  // 8. responsive styling [28/04]

  return (
    <>
      <Head>
        <title>Nutrition Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex">
          <div className="w-2/12 h-screen  p-4">
            <MealType
              breakfast={breakfastMeal}
              lunch={lunchMeal}
              dinner={dinnerMeal}
            />
            <MockAutoComplete
              onChangeAC={onChangeAC}
              dataAC={test}
              onSubmitAC={handleSubmit}
              valueAC={value}
              isLoading={isLoading}
            />
          </div>
          <div className="w-10/12 border-l-4 border-double	border-black">
            <div className="w-full">
              <OverallNoSSR data={searchItems} />
            </div>
            <div className="flex">
              <div className="w-full">
                <Breakfast
                  searchItems={searchItems.filter(
                    (item) => item.meal === "breakfast"
                  )}
                  diet={"breakfast"}
                />
              </div>
              <div className="w-full">
                <Lunch
                  searchItems={searchItems.filter(
                    (item) => item.meal === "lunch"
                  )}
                  diet={"lunch"}
                />
              </div>
              <div className="w-full">
                <Dinner
                  searchItems={searchItems.filter(
                    (item) => item.meal === "dinner"
                  )}
                  diet={"dinner"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
