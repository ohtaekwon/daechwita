/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

import Text from "_common/components/text";
import Grid from "_common/components/grid";

import { emoji } from "utils/constants";
import { media } from "utils/media";
import { theme } from "styles";

import TotalDataCharts from "./TotalDataCharts";
import MyDataCharts from "./MyDataCharts";

const Home = () => {
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
