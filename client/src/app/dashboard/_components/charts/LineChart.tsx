import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentMonthInd = new Date().getMonth();
let data: any[] = [];

for (let i = 0; i < currentMonthInd; i++) {
  data.push({
    name: months[i],
    uv: Math.floor(Math.random() * 1000),
    pv: Math.floor(Math.random() * 1000),
    amt: Math.floor(Math.random() * 1000),
  });
}

const RenderLineChart = () => (
  <LineChart
    width={600}
    height={300}
    data={data}
    className="w-1/2"
    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
  >
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

export default RenderLineChart;
