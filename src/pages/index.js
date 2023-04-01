import SearchInput from '@/components/SearchInput';
import { Modal, Button, Divider } from 'antd';
import ListArticle from '@/components/ListArticle';
import Table from '@/components/Table';
import AppLayout from '@/components/Layout';
import { getListUrl } from '@/common/api/url';
import { handleApi } from '@/utils';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const QuantityChart = dynamic(import('@/components/Charts/QuantityChart'), { ssr: false });

const PercentChart = dynamic(import('@/components/Charts/PercentChart'), { ssr: false });
export default function Home() {
	const [status, setStatus] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleSetStatus = (value) => {
		setStatus(value);
	};

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
					<h3 className="text-center text-4xl">Percent Chart</h3>
					<div className="flex mt-2">
						<PercentChart />
						<div className="flex items-center">
							<div>
								<div className="flex items-center">
									{' '}
									<div className="w-4 h-4 bg-[#0088FE] mr-2"></div> true positive
								</div>
								<div className="flex items-center">
									{' '}
									<div className="w-4 h-4 bg-[#00C49F] mr-2"></div> false positive
								</div>
								<div className="flex items-center">
									{' '}
									<div className="w-4 h-4 bg-[#FFBB28] mr-2"></div> true negative
								</div>
								<div className="flex items-center">
									{' '}
									<div className="w-4 h-4 bg-[#FF8042] mr-2"></div> false negative
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h3 className="text-center text-4xl">Quantity Chart</h3>
					<div className="chart mt-2">
						<QuantityChart />
					</div>
				</div>
			</div>
			<div className="relative mt-4 parent">
				<div className="grid grid-cols-4 gap-4 p-4 child">
					<div className="col-span-3 overflow-y-auto p-2">
						<div className="ml-4">
							<h2 className="text-xl font-bold">List of malicious URL</h2>
						</div>
						<div className="mt-4">
							<Table />
						</div>
					</div>
					<div className="overflow-y-auto">
						<div className="ml-4">
							<h2 className="text-xl font-bold">Network security news</h2>
						</div>
						<div className="mt-4">
							<ListArticle />
						</div>
					</div>
				</div>
			</div>

			<Modal title={<>
				<div className="text-center">Alert</div>
				<Divider />
			</>} open={isModalOpen} onCancel={handleCancel} footer={null}>
				<p className='text-center text-3xl'>{status}</p>

				<Divider />

				<div className='mt-2'>
					<Button type="default" size="small" className='mr-2' onClick={handleCancel}>cancel</Button>
					<Button type="default" size="small" className='text-[#625DF5] bg-[#EFF0FF]' onClick={handleOk}>OK</Button>
				</div>
			</Modal>
		</>
	);
}

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;
