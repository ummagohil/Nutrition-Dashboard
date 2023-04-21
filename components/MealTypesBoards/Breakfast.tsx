import SearchItem from "../SearchItem";
import { BreakfastChart } from "..";

interface props {
  searchItems: { image: string; nutrients: any; name: string }[] | null;
  nurtrients: any;
  diet: string;
}
const Breakfast = ({ searchItems, nurtrients, diet }: props) => {
  const test = searchItems
    ?.map((a) => a?.nutrients)
    ?.reduce((a, b) => a?.concat(b, []), []);

  console.log(test, "breakfast");

  return (
    <>
      <h1 className="text-6xl text-black font-black text-center">Breakfast</h1>
      <BreakfastChart data={test} diet={diet} />
      {searchItems?.map((a) => (
        <SearchItem
          key={Math.random()}
          name={a.name[0]}
          image={a.image[0]}
          nutrients={a.nutrients}
        />
      ))}
    </>
  );
};

export default Breakfast;
