import Head from "next/head";
import DisplayLocations from "@/components/DisplayLocations";
import {
  MealType,
  DietType,
  Search,
  OverallAnalytics,
  Breakfast,
  Lunch,
  Dinner,
} from "../components";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [dietType, setDietType] = useState<Boolean>(false);
  const [mealType, setMealType] = useState<Boolean>(false);
  const [diet, setDiet] = useState<string>("");
  const [meal, setMeal] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchItems, setSearchItems] = useState(null);

  const allDiet = () => {
    setDietType(true);
    setDiet("all");
  };

  const vegDiet = () => {
    setDietType(true);
    setDiet("vegetarian");
  };

  const veganDiet = () => {
    setDietType(true);
    setDiet("vegan");
  };

  const nonGlutenDiet = () => {
    setDietType(true);
    setDiet("non-gluten");
  };

  const breakfastMeal = () => {
    setMealType(true);
    setMeal("breakfast");
  };

  const lunchMeal = () => {
    setMealType(true);
    setMeal("lunch");
  };

  const dinnertMeal = () => {
    setMealType(true);
    setMeal("dinner");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    console.log({
      search,
      diet,
      meal,
    });

    /*setSearchItems({
      search,
      diet,
      meal,
    });*/

    return [
      {
        search,
        diet,
        meal,
      },
    ];
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DisplayLocations />
        <div className="flex">
          <div className="w-full">
            <DietType
              all={allDiet}
              vegetarian={vegDiet}
              vegan={veganDiet}
              nonGluten={nonGlutenDiet}
            />
          </div>
          <div className="w-full">
            <MealType
              breakfast={breakfastMeal}
              lunch={lunchMeal}
              dinner={dinnertMeal}
            />
          </div>
          <div className="w-full">
            <Search onChange={onChange} />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="bg-emerald-400 px-20 rounded"
              onClick={onSubmit}
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <Breakfast />
          </div>
          <div className="w-full">
            <Lunch searchItems={onSubmit()} />
          </div>
          <div className="w-full">
            <Dinner />
          </div>
          <div className="w-full">
            <OverallAnalytics />
          </div>
        </div>
      </main>
    </>
  );
}
