import NavbarFakeNews from '@/components/Navbar/NavbarFakeNews';
import { Input, Button, Modal, Divider } from 'antd';
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const { TextArea } = Input;

export default function DetectFakeNews() {
  const [text, setText] = useState('');
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
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon.png" />
        <title>Detect Fake News</title>
      </Head>
      <NavbarFakeNews />
      <div className="mx-16 mt-12">
        <TextArea rows={8} onChange={(e) => setText(e.target.value)} />
        <div className="text-center">
          <Button onClick={showModal} className="mt-2 bg-black" type="primary" size="large">
            Kiểm tra
          </Button>
        </div>
      </div>
      <Modal
        title={
          <>
            <div className="text-center">Thông tin</div>
            <Divider />
          </>
        }
        centered={true}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex items-center justify-center">
          <div>
            <Image
              src="/imgs/fake.jpg"
              className="h-6 mr-3 sm:h-[3.25rem]"
              alt="Flowbite Logo"
              width={50}
              height={100}
            />
          </div>
          <p className="text-center text-3xl">Đây là fake news</p>
        </div>
        {/* <div className="flex items-center justify-center">
          <div>
            <Image
              src="/imgs/true-news.png"
              className="h-6 mr-3 sm:h-[3.25rem]"
              alt="Flowbite Logo"
              width={50}
              height={100}
            />
          </div>
          <p className="text-center text-3xl">Đây là true news</p>
        </div> */}

        <Divider />

        <div className="mt-2 text-center">
          <Button type="default" size="large" className="text-[#625DF5] bg-[#EFF0FF]" onClick={handleOk}>
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
}
