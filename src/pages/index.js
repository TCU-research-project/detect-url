import SearchInput from '@/components/SearchInput';
import AlertModal from '@/components/Modals/AlertModal';
import ListArticle from '@/components/ListArticle';
import Table from '@/components/Table';
import AppLayout from '@/components/Layout';
import dynamic from "next/dynamic";
const QuantityChart = dynamic(import('@/components/Charts/QuantityChart'), { ssr: false });

const PercentChart = dynamic(import('@/components/Charts/PercentChart'), { ssr: false });
export default function Home() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div></div>
        <div className="col-span-2">
          <SearchInput />
        </div>
        <div></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-16">
        <div>
          <h3 className='text-center text-4xl'>Percent Chart</h3>
          <div className='flex mt-2'>
            <PercentChart />
            <div className='flex items-center'>
              <div>
                <div className='flex items-center'> <div className='w-4 h-4 bg-[#0088FE] mr-2'></div> true positive</div>
                <div className='flex items-center'> <div className='w-4 h-4 bg-[#00C49F] mr-2'></div> false positive</div>
                <div className='flex items-center'> <div className='w-4 h-4 bg-[#FFBB28] mr-2'></div> true negative</div>
                <div className='flex items-center'> <div className='w-4 h-4 bg-[#FF8042] mr-2'></div> false negative</div>
              </div>
            </div>
          </div>
        </div>


        <div>
          <h3 className='text-center text-4xl'>Quantity Chart</h3>
          <div className='chart mt-2'>
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

      {/* <AlertModal /> */}
    </>
  );
}

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;
