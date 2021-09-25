/**
 * @author Zahir Hadi Athallah <contactzsoft@gmail.com>
 * @license MIT
 * @app SekolahYuk
 */


import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarCharts = ({ barData }) => {
  return (
    <>
      <Bar
        height={70}
        width={200}
        options={{
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  userCallback: function (label, index, labels) {
                    if (Math.floor(label) === label) {
                      return label;
                    }
                  },
                },
                scaleLabel: {
                  display: true,
                  labelString: 'No of Students',
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Score',
                },
              },
            ],
          },
        }}
        data={barData}
      />
    </>
  );
};

export default BarCharts;
