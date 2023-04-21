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
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [nutrients, setNutrients] = useState();

  const [searchItems, setSearchItems] = useState<
    {
      meal: string;
      name: string;
      image: string;
      nutrients: any;
    }[]
  >([]);

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

  const onChangeAC = (e: any) => {
    setValue(e.target.value);
    fetchData();
  };

  const fetchData = async () => {
    const data = await fetch(
      `https://trackapi.nutritionix.com/v2/search/instant?query=${value}&common=true&branded=true`,
      {
        headers: {
          "x-app-id": `${process.env.ID}`,
          "x-app-key": `${process.env.API_KEY}`,
        },
      }
    ).then((res) => res.json());
    //const responseData = await data.json();
    //const commonArray = responseData.common;
    //console.log(data);
    setData(data.common);
    setName(data.common?.map((a: any) => a.food_name));
    setImage(data.common?.map((a: any) => a.photo.thumb));
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
        setNutrients(data.foods);

        const newItem = {
          meal,
          name,
          image,
          nutrients: data.foods, // Use the updated nutrients state
        };
        setSearchItems((prevItems) => [...prevItems, newItem]);
        setValue("");
      } else {
        console.error("Error fetching nutrients data:", response);
      }
    } catch (error) {
      console.error("Error fetching nutrients data:", error);
    }
  };

  // BUGS/FIXES
  // search => allow user to click on the picture and add to board
  // search should send the correct data, not first item in array
  // type checking - interfaces and generics
  // the re-rendering of the dropdown menu in breakfast

  // BEST PRACTISES
  // add react-query for data handling
  // create data hooks
  // look into state management (context API or zustand)
  // testing + coverage via vitest
  // READ ME docs

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
          <div className="h-screen border-r-4 border-double	border-black p-4">
            <MealType
              breakfast={breakfastMeal}
              lunch={lunchMeal}
              dinner={dinnertMeal}
            />

            <MockAutoComplete
              onChangeAC={onChangeAC}
              dataAC={Array.isArray(data) ? data : []}
              onSubmitAC={() => onSubmitAC(value)}
              valueAC={value}
            />
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
                    onClick={() => onSubmitAC(item.food_name)}
                  >
                    {item.food_name}
                    <img src={item.photo.thumb} />
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full">
            <Breakfast
              searchItems={searchItems.filter(
                (item) => item.meal === "breakfast"
              )}
              nurtrients={nutrients}
              diet={"breakfast"}
            />
          </div>
          <div className="w-full">
            <Lunch
              searchItems={searchItems.filter((item) => item.meal === "lunch")}
              nurtrients={nutrients}
              diet={"lunch"}
            />
          </div>
          <div className="w-full">
            <Dinner
              searchItems={searchItems.filter((item) => item.meal === "dinner")}
              nurtrients={nutrients}
              diet={"dinner"}
            />
          </div>
          <div className="w-full">
            <OverallAnalytics data={searchItems} />
          </div>
        </div>
      </main>
    </>
  );
}
