import Chart from "../Analytics/Chart";
import { data } from "@/types/types";

const LunchChart = ({ data }: data) => (
  <div className="border border-black p-2 m-6  text-white">
    <Chart data={data} />
  </div>
);

export default LunchChart;
