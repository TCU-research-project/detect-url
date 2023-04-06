import { Pagination } from "antd";
import { useState } from "react";

export default function Table(props) {
	const { listData, onSetPage, onSetPageSize, total } = props;
	const [startIndex, setStartIndex] = useState(1);
	return (
		<>
			<div className="overflow-auto rounded-lg shadow hidden md:block">
				<table className="w-full">
					<thead className="bg-gray-50 border-b-2 border-gray-200">
						<tr>
							<th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">STT</th>
							<th className="p-3 text-sm font-semibold tracking-wide text-left">URL</th>
							<th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Nhận định</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{listData.map((item, index) => {
							return (
								<tr key={index} className="bg-white">
									<td className="p-3 text-sm text-gray-700 whitespace-nowrap font-bold text-blue-500">
										{index + startIndex}
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
			<div className="flex justify-center mt-2">
				<Pagination defaultCurrent={1} pageSize={10} total={total} onChange={(page, pageSize) => { onSetPage(page); onSetPageSize(pageSize); setStartIndex((page - 1) * pageSize + 1); }} />
			</div>

		</>
	);
}
