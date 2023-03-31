import AppLayout from '@/components/Layout';
import dynamic from "next/dynamic";
const QuantityChart = dynamic(
  import("@/components/Charts/QuantityChart"),
  { ssr: false }
);

const PercentChart = dynamic(
  import("@/components/Charts/PercentChart"),
  { ssr: false }
);


const SystemAnalytics = () => {
  return (
    <>
      <PercentChart />
      <QuantityChart />
    </>
  );
};

SystemAnalytics.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default SystemAnalytics;
