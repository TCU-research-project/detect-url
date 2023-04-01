import Link from "next/link";

export default function Table(props) {
	const { listData } = props;
	return (
		<>
			<div className="overflow-auto rounded-lg shadow hidden md:block">
				<table className="w-full">
					<thead className="bg-gray-50 border-b-2 border-gray-200">
						<tr>
							<th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
							<th className="p-3 text-sm font-semibold tracking-wide text-left">URL</th>
							<th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{listData.map((item, index) => {
							return (
								<tr key={index} className="bg-white">
									<td className="p-3 text-sm text-gray-700 whitespace-nowrap font-bold text-blue-500">
										{index + 1}
									</td>
									<td className="p-3 text-sm text-gray-700 whitespace-nowrap">{item.name}</td>
									<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
										<span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">
											{item.resultDetection}
										</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
