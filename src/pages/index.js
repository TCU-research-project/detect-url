import SearchInput from '@/components/SearchInput';
import { Modal, Button, Divider, message, Card, Space } from 'antd';
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


const generateStatus = (status) => {
	if (status === 'safe') {
		return 'Website an toàn';
	}
	if (status === 'malicious') {
		return 'Website độc hại';
	}
};


export default function Home() {
	const [status, setStatus] = useState();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [listWebsite, setListWebsite] = useState([]);
	const [listArticle, setListArticle] = useState([]);
	const [listSize, setListSize] = useState(0);
	const [whoisData, setWhoisData] = useState("");

	const router = useRouter();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		setIsModalOpen(false);
		await handleListWebsite();
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

	const handleSetWhoisData = (text) => {
		setWhoisData(text);
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
					<SearchInput onSetStatus={handleSetStatus} onShowModal={showModal} onSetWhoisData={handleSetWhoisData} />
				</div>
				<div></div>
			</div>
			<div className="mt-16 mx-4">
				<div className='mb-2'>
					<Card title={<>
						<div className='text-center'>Dữ liệu về đường dẫn từ whois</div>
					</>} bordered={true} style={{}}>
						{whoisData && <>
							<h2 className='text-center text-xl mb-2'>{`>>> Cập nhật lần cuối`}: {whoisData['>>> Last update of whois database']}</h2>
							<div className='grid grid-cols-2 gap-4 mb-2'>
								<Card title="Trạng thái" size="small">
									{whoisData['Domain Status'].map((item, index) => (
										<p key={index}>
											{item}
										</p>
									))}
								</Card>
								<Card title="Máy chủ miền" size="small">
									{whoisData['Name Server'].map((item, index) => (
										<p key={index}>
											{item}
										</p>
									))}
								</Card>
							</div>
							<div className='grid grid-cols-3 gap-4'>
								<Card title="Tên miền" size="small">
									<p>{whoisData['Domain Name']}</p>
								</Card>
								<Card title="Số ID miền đăng ký" size="small">
									<p>{whoisData['Registry Domain ID']}</p>
								</Card>
								<Card title=" Máy chủ WHOIS của nhà đăng ký" size="small">
									<p>{whoisData['Registrar WHOIS Server']}</p>
								</Card>
								<Card title="Registrar URL" size="small">
									<p>{whoisData['Registrar URL']}</p>
								</Card>
								<Card title="Ngày tạo" size="small">
									<p>{whoisData['Created Date']}</p>
								</Card>
								<Card title="Ngày cập nhật" size="small">
									<p>{whoisData['Updated Date']}</p>
								</Card>
								<Card title="Ngày hết hạn" size="small">
									<p>{whoisData['Expiry Date']}</p>
								</Card>
								<Card title="Nhà đăng ký" size="small">
									<p>{whoisData['Registrar']}</p>
								</Card>
								<Card title="DNSSEC (Hệ thống bảo mật phân cấp tên miền)" size="small">
									<p>{whoisData['DNSSEC']}</p>
								</Card>
							</div>
						</>}
					</Card>
				</div>
				<div>
					<Card title={<>
						<div className='text-center'>Số lượng website phát hiện gần đây</div>
					</>} bordered={true} style={{}}>
						<div className="chart mt-2">
							<QuantityChart />
						</div>
					</Card>

				</div>
			</div>
			<Card className='mx-4 my-2'>
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

			</Card>


			<Modal
				title={
					<>
						<div className="text-center">Thông tin</div>
						<Divider />
					</>}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}>
				<p className='text-center text-3xl'>{generateStatus(status)}</p>

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
