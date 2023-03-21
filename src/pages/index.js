import Navbar from '@/components/Navbar';
import Table from '@/components/Table';
import SearchInput from '@/components/SearchInput';
import ListArticle from '@/components/ListArticle';
import AlertModal from '@/components/Modals/AlertModal';
import PercentChart from '@/components/Charts/PercentChart';
import QuantityChart from '@/components/Charts/QuantityChart';
export default function Home() {
  return (
    <>
      <div className="parent">
        <Navbar />
        <div class="grid grid-cols-4 gap-4">
          <div></div>
          <div class="col-span-2">
            <SearchInput />
          </div>
          <div></div>
        </div>
        {/* chart */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div>
            <div className="text-center">Accurate detection rate</div>
            <div className="flex items-center">
              <div className="text-center">
                <PercentChart />
              </div>
              <div>
                <div>True positive</div>
                <div>False positive</div>
                <div>True negative</div>
                <div>False negative</div>
              </div>
            </div>
          </div>

          <div>
            <QuantityChart />
          </div>
        </div>
        <div className="relative mt-4 parent">
          <div className="grid grid-cols-4 gap-4 p-4 child">
            <div class="col-span-3 overflow-y-auto p-2">
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
      </div>
    </>
  );
}
