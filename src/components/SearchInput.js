import { useState } from 'react';
import { message, Button } from 'antd';
import { handleApi } from '@/utils';
import { detectUrl } from '@/common/api/url';

export default function SearchInput(props) {
	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const { onSetStatus, onShowModal, onSetWhoisData, onSetNotFound } = props;

	const handleChange = (event) => {
		onSetStatus('');
		setUrl(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const response = await handleApi(detectUrl({ url: url }));
		const { data } = response;
		setLoading(false);
		if (data) {
			if (data.data.response.notFound) {
				onSetNotFound(1);
			} else {
				onSetNotFound(0);
			}
			onSetStatus(data.data.response.resultDetection);

			onSetWhoisData(data.data.whois);
			onShowModal();
		} else {
			console.log(response);
			message.error(response.error.message);
		}
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
					Search
				</label>
				<div className="relative flex">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
					<input
						type="search"
						id="default-search"
						className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-l bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Nhập đường dẫn để kiểm tra"
						value={url}
						onChange={handleChange}
						required
					/>
					<div>
						<Button className='h-full bg-black text-lg rounded-l-none rounded-r' loading={loading} type="primary" htmlType="submit">Kiểm tra</Button>
					</div>

				</div>
			</form>
		</>
	);
}
