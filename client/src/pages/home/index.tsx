import React from "react";

import TotalDataCharts from "./TotalDataCharts";
import MyDataCharts from "./MyDataCharts";

import { theme } from "styles";
import { useQueryClient } from "react-query";
import Button from "_common/components/Button";
import basicInstance from "lib/apis/utils/instance";
import preAuthInstance from "lib/apis/utils/instance";

const Home = () => {
  const queryClient = useQueryClient();

  const handleClear = () => {
    queryClient.clear();
  };

  React.useEffect(() => {
    console.log("Home useEffect");
    document.body.style.backgroundColor = theme.colors.lightBlue_50;
    return () => {
      document.body.style.backgroundColor = theme.colors.transparent;
    };
  }, []);

  const handleMock = async () => {
    const { data } = await preAuthInstance.get(
      "/api/v1/user/schedules?category=column"
    );
    console.log(data);

    return data;
  };

  React.useEffect(() => {
    handleMock();
  }, []);
  return (
    <>
      {/* <Button variant="primary" onClick={handleClear}>
        버튼
      </Button> */}
      <TotalDataCharts />

      <MyDataCharts />
    </>
  );
};
export default Home;
