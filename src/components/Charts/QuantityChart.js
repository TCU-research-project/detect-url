import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const data = [
	{
		name: 'Page A',
		uv: 8,
		pv: 4,
	},
	{
		name: 'Page B',
		uv: 10,
		pv: 9,
	},
	{
		name: 'Page C',
		uv: 7,
		pv: 9,
	},
	{
		name: 'Page D',
		uv: 8,
		pv: 2,
	},
	{
		name: 'Page E',
		uv: 10,
		pv: 15,
	},
	{
		name: 'Page F',
		uv: 4,
		pv: 8,
	},
	{
		name: 'Page G',
		uv: 5,
		pv: 7,
	},
];

const dataChart = [];

let count = 1;

for (let i in data) {
	const appendData = {
		name: moment().subtract(count, "days").format("DD-MM"),
		uv: data[i].uv,
		pv: data[i].pv
	};
	dataChart.push(appendData);
	count++;
}

dataChart.reverse();

export default function QuantityChart() {
	return (
		<ResponsiveContainer width="100%" height={400}>
			<BarChart
				width={500}
				height={300}
				data={dataChart}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="uv" name='Website an toàn' fill="#0088FE" />
				<Bar dataKey="pv" name='Website độc hại' fill="#DAA464" />
			</BarChart>
		</ResponsiveContainer>
	);
}
