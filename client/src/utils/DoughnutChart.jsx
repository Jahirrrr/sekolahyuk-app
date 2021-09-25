/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ DoughnutData }) => {
  return (
    <Doughnut
      width={200}
      height={70}
      options={{
        responsive: true,
      }}
      data={DoughnutData}
    />
  );
};

export default DoughnutChart;
