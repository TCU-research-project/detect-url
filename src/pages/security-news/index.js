import AppLayout from '@/components/Layout';
import { Collapse } from 'antd';
import { useEffect, useState } from 'react';
import { handleApi } from '@/utils';
import { getListArticle } from '@/common/api/article';
import Link from 'next/link';

const { Panel } = Collapse;

export default function SecurityNews() {

	const [listArticle, setListArticle] = useState([]);

	const handleListArticle = async () => {
		const response = await handleApi(getListArticle(1, 10));
		const { data } = response;
		if (data) {
			setListArticle(data.data.data);
		} else {
			message.error("Error get list article");
		}
	};
	useEffect(() => {
		handleListArticle();
	}, []);
	return (
		<div className='grid grid-cols-6'>
			<div></div>
			<div className='col-span-4'>
				{listArticle.map((item, index) => {
					return (
						<div key={index} className="mb-4">
							<Collapse>
								<Panel header={item.title}>
									<p>{item.description}</p>
									<p className='my-2'>Ngày đăng: {item.public_time}</p>
									<Link
										href={item.link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
									>
										{`Đọc thêm`}
										<svg className="w-3 h-3 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
												clipRule="evenodd"
											></path>
										</svg>
									</Link>
								</Panel>
							</Collapse>
						</div>
					);
				})}
			</div>
		</div>
	);
}

SecurityNews.getLayout = (page) => <AppLayout>{page}</AppLayout>;
