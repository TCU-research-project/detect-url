import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import AppLayout from '@/components/Layout';

const App = () => {
  const router = useRouter();

  useEffect(() => {

      router.push("/app/system-analytics");

  }, [router]);

  return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
};

App.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default App;
