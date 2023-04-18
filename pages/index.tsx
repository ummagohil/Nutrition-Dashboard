import Head from "next/head";
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

import MockAutoComplete from "../components/autoComplete";

export default function Home() {
  const [dietType, setDietType] = useState<Boolean>(false);
  const [mealType, setMealType] = useState<Boolean>(false);
  const [diet, setDiet] = useState<string>("");
  const [meal, setMeal] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<[]>([]);
  const [name, setName] = useState("");

  const [searchItems, setSearchItems] = useState<
    {
      search: string;
      diet: string;
      meal: string;
      name: any;
    }[]
  >([]);

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
    const newItem = { search, diet, meal, name };
    setSearchItems((prevItems) => [...prevItems, newItem]);
    setSearch("");
  };

  const onChangeAC = (e: any) => {
    setValue(e.target.value);
    fetchData();
  };

  const fetchData = async () => {
    const data = await fetch(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${value}`,
      {
        headers: {
          "x-app-id": `${process.env.ID}`,
          "x-app-key": `${process.env.API_KEY}`,
        },
      }
    ).then((res) => res.json());
    //const responseData = await data.json();
    //const commonArray = responseData.common;
    console.log(data);
    setData(data.common);
    setName(data.common?.map((a: any) => a.food_name));
    return data.common;
  };

  const onSubmitAC = async (searchTerm: any) => {
    setValue(searchTerm);
    console.log("search", searchTerm);
    try {
      // Make API call to fetch nutrients data
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": `${process.env.ID}`,
            "x-app-key": `${process.env.API_KEY}`,
          },
          body: JSON.stringify({ query: value }),
        }
      );

      // Check if response is successful
      if (response.ok) {
        const data = await response.json();
        // Extract and use the nutrients data as needed
        console.log("Nutrients data:", data.foods);
      } else {
        console.error("Error fetching nutrients data:", response);
      }
    } catch (error) {
      console.error("Error fetching nutrients data:", error);
    }
    const newItem = { search, diet, meal, name };
    setSearchItems((prevItems) => [...prevItems, newItem]);
    setSearch("");
  };

  // TO DO
  // have that item go to the correct board
  // make an api call to get the data for servings, nutrition data etc.
  // then do the meal analytics (basic stuff for now)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
            <Search onChange={onChange} search={search} />
            <MockAutoComplete
              onChangeAC={onChangeAC}
              dataAC={data}
              onSubmitAC={onSubmitAC}
              valueAC={value}
            />
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
            <Breakfast
              searchItems={searchItems.filter(
                (item) => item.meal === "breakfast"
              )}
            />
          </div>
          <div className="w-full">
            <Lunch
              searchItems={searchItems.filter((item) => item.meal === "lunch")}
            />
          </div>
          <div className="w-full">
            <Dinner
              searchItems={searchItems.filter((item) => item.meal === "dinner")}
            />
          </div>
          <div className="w-full">
            <OverallAnalytics />
          </div>
        </div>

        <div>
          {data
            ?.filter((item) => {
              const searchTerm = value;
              const fullName = item.food_name.toLowerCase();

              return (
                (searchTerm &&
                  fullName.startsWith(searchTerm) &&
                  fullName !== searchTerm) ||
                fullName == searchTerm
              );
            })
            ?.map((item) => (
              <div
                key={item.food_name}
                onClick={() => onSubmit(item.food_name)}
              >
                {item.food_name}
                <img src={item.photo.thumb} />
              </div>
            ))}
        </div>
      </main>
    </>
  );
}
