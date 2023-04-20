import SearchItem from "../SearchItem";
import { DinnerChart } from "..";

interface props {
  searchItems: { image: string; nutrients: any; name: string }[] | null;
  nurtrients: any;
  diet: string;
}
const Dinner = ({ searchItems, nurtrients, diet }: props) => {
  //console.log(searchItems, "searchitems");
  const test = searchItems
    ?.map((a) => a?.nutrients)
    ?.reduce((a, b) => a?.concat(b, []), []);
  return (
    <div>
      Dinner
      <DinnerChart data={test} diet={diet} />
      {searchItems?.map((a) => (
        <SearchItem
          key={a.name[0]}
          image={a.image[0]}
          name={a.name[0]}
          nutrients={a.nutrients}
        />
      ))}
      {/*<MealAnalytics data={nurtrients} diet={diet} />*/}
    </div>
  );
};

export default Dinner;
