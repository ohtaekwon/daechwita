import React from "react";

import TotalDataCharts from "./TotalDataCharts";
import MyDataCharts from "./MyDataCharts";

import { theme } from "styles";
import { useQueryClient } from "react-query";

const Home = () => {
  const queryClient = useQueryClient();

  const handleClear = () => {
    queryClient.clear();
  };

  React.useEffect(() => {
    document.body.style.backgroundColor = theme.colors.lightBlue_50;
    return () => {
      document.body.style.backgroundColor = theme.colors.transparent;
    };
  }, []);

  return (
    <>
      <TotalDataCharts />
      <MyDataCharts />
    </>
  );
};
export default Home;
