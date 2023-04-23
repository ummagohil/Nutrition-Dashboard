import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface props {
  data: any;
  overall?: boolean;
}

const Chart = ({ data, overall }: props) => {
  const addData = data?.reduce(
    (acc, curr) => ({
      nf_calories: acc.nf_calories + curr.nf_calories,
      nf_cholesterol: acc.nf_cholesterol + curr.nf_cholesterol,
      nf_dietary_fiber: acc.nf_dietary_fiber + curr.nf_dietary_fiber,
      nf_potassium: acc.nf_potassium + curr.nf_potassium,
      nf_protein: acc.nf_protein + curr.nf_protein,
      nf_saturated_fat: acc.nf_saturated_fat + curr.nf_saturated_fat,
      nf_sodium: acc.nf_sodium + curr.nf_sodium,
      nf_sugars: acc.nf_sugars + curr.nf_sugars,
      nf_total_carbohydrate:
        acc.nf_total_carbohydrate + curr.nf_total_carbohydrate,
      nf_total_fat: acc.nf_total_fat + curr.nf_total_fat,
    }),
    {
      nf_calories: 0,
      nf_cholesterol: 0,
      nf_dietary_fiber: 0,
      nf_potassium: 0,
      nf_protein: 0,
      nf_saturated_fat: 0,
      nf_sodium: 0,
      nf_sugars: 0,
      nf_total_carbohydrate: 0,
      nf_total_fat: 0,
    }
  );

  //console.log("addData", addData);
  const test = [addData]
    ?.map((a) => [
      { name: "calories", value: a.nf_calories, fill: "#6ee7b7" },
      { name: "cholesterol", value: a.nf_cholesterol, fill: "#06b6d4" },
      { name: "fiber", value: a.nf_dietary_fiber, fill: "#93c5fd" },
      { name: "potassium", value: a.nf_potassium, fill: "#3b82f6" },
      { name: "protein", value: a.nf_protein, fill: "#6366f1" },
      { name: "saturated fat", value: a.nf_saturated_fat, fill: "#f9a8d4" },
      { name: "sodium", value: a.nf_sodium, fill: "#fb7185" },
      { name: "sugars", value: a.nf_sugars, fill: "#f43f5e" },
      {
        name: "carbohydrates",
        value: a.nf_total_carbohydrate,
        fill: "#fb923c",
      },
      { name: "total fats", value: a.nf_total_fat, fill: "#fbbf24" },
    ])
    .pop();
  //console.log("data", data);
  const pieData = [
    {
      name: "Apple",
      value: 54.85,
    },
    {
      name: "Samsung",
      value: 47.91,
    },
    {
      name: "Redmi",
      value: 16.85,
    },
    {
      name: "One Plus",
      value: 16.14,
    },
    {
      name: "Others",
      value: 10.25,
    },
  ];

  const legendWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }
    return null;
  };
  return (
    <PieChart width={350} height={350}>
      <Pie
        data={overall ? data : test}
        color="#000000"
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={75}
        key={Math.random()}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} />
        ))}
      </Pie>
      <Tooltip />

      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        iconType="circle"
      />
    </PieChart>
  );
};
export default Chart;
