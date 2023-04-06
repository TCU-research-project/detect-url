import SearchInput from '@/components/SearchInput';
import { Modal, Button, Divider, message } from 'antd';
import ListArticle from '@/components/ListArticle';
import Table from '@/components/Table';
import AppLayout from '@/components/Layout';
import { getListUrl } from '@/common/api/url';
import { handleApi } from '@/utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getListArticle } from '@/common/api/article';
const QuantityChart = dynamic(import('@/components/Charts/QuantityChart'), { ssr: false });

const PercentChart = dynamic(import('@/components/Charts/PercentChart'), { ssr: false });
export default function Home() {
	const [status, setStatus] = useState();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [listWebsite, setListWebsite] = useState([]);
	const [listArticle, setListArticle] = useState([]);
	const [listSize, setListSize] = useState(0);

	const router = useRouter();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = async () => {
		setIsModalOpen(false);
		await handleListWebsite();
	};

	const handleSetStatus = (value) => {
		setStatus(value);
	};

	const handleSetPage = (page) => {
		setPage(page);
	};

	const handleSetPageSize = (pageSize) => {
		setPageSize(pageSize);
	};

	const handleListWebsite = async () => {
		const response = await handleApi(getListUrl(page, pageSize));
		const { data } = response;
		if (data) {
			setListWebsite(data.data.data);
			setListSize(data.data.count);
		} else {
			message.error("Error get list website");
		}
	};

	const handleListArticle = async () => {
		const response = await handleApi(getListArticle(1, 3));
		const { data } = response;
		if (data) {
			setListArticle(data.data.data);
		} else {
			message.error("Error get list article");
		}
	};

	useEffect(() => {
		handleListWebsite();
		handleListArticle();
	}, [page, pageSize]);

	return (
		<>
			<div className="grid grid-cols-4 gap-4">
				<div></div>
				<div className="col-span-2">
					<SearchInput onSetStatus={handleSetStatus} onShowModal={showModal} />
				</div>
				<div></div>
			</div>
			<div className="grid grid-cols-2 gap-4 mt-16">
				<div>
					<h3 className="text-center text-4xl">Tỉ lệ phát hiện chính xác</h3>
					<div className="flex mt-2">
						<PercentChart />
						<div className="flex items-center">
							<div>
								<div className="flex items-center">
									{' '}
									<div className="w-4 h-4 bg-[#0088FE] mr-2"></div> dương tính
								</div>
								<div className="flex items-center">
									{' '}
									<div className="w-4 h-4 bg-[#00C49F] mr-2"></div> dương tính giả
								</div>
								<div className="flex items-center">
									{' '}
									<div className="w-4 h-4 bg-[#FFBB28] mr-2"></div> âm tính
								</div>
								<div className="flex items-center">
									{' '}
									<div className="w-4 h-4 bg-[#FF8042] mr-2"></div> âm tính giả
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h3 className="text-center text-4xl">Số lượng website phát hiện gần đây</h3>
					<div className="chart mt-2">
						<QuantityChart />
					</div>
				</div>
			</div>
			<div className="relative mt-4 parent">
				<div className="grid grid-cols-4 gap-4 p-4 child">
					<div className="col-span-3 overflow-y-auto p-2">
						<div className="ml-4">
							<h2 className="text-xl font-bold">Danh sách website đã phát hiện</h2>
						</div>
						<div className="mt-4">
							<Table listData={listWebsite} onSetPage={handleSetPage} onSetPageSize={handleSetPageSize} total={listSize} />
						</div>
					</div>
					<div className="overflow-y-auto">
						<div className="ml-4">
							<h2 className="text-xl font-bold cursor-pointer hover:text-sky-700" onClick={() => { router.push('/security-news'); }}>Tin tức an ninh mạng</h2>
						</div>
						<div className="mt-4">
							<ListArticle listData={listArticle} />
						</div>
					</div>
				</div>
			</div>

			<Modal title={<>
				<div className="text-center">Thông tin</div>
				<Divider />
			</>} open={isModalOpen} onCancel={handleCancel} footer={null}>
				<p className='text-center text-3xl'>{status}</p>

				<Divider />

				<div className='mt-2 text-center'>
					<Button type="default" size="small" className='mr-2' onClick={handleCancel}>cancel</Button>
					<Button type="default" size="small" className='text-[#625DF5] bg-[#EFF0FF]' onClick={handleOk}>OK</Button>
				</div>
			</Modal>
		</>
	);
}

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;
