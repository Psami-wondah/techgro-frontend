import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";
interface Props {
  data: number[];
  color: string;
  xData: string[];
}
const BasicChart = ({ data, color, xData }: Props) => {
  const option = {
    grid: {
      show: true,
      top: "5%",
      width: "90%",
      height: "90%",
      bottom: 0,
    },
    xAxis: {
      axisLabel: {
        show: true,
      },
      //   showGrid: false,

      axisTick: {
        show: false,
      },
      type: "category",
      data: xData.map((date) =>
        moment(new Date(date)).format("mm-D-YY h:mm a")
      ),
      axisLine: {
        // symbol: "arrow"
        show: true,
      },
    },
    yAxis: {
      axisLine: {
        show: true,
      },
      type: "value",
    },
    series: [
      {
        data: data,
        type: "line",
        smooth: true,
        showSymbol: true,
        markLine: {
          silent: true,
        },
        lineStyle: {
          color: color,
          width: 2,
        },
        areaStyle: {
          opacity: 0.1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color,
            },
            {
              offset: 1,
              color: "white",
            },
          ]),
        },
      },
    ],
  };
  return (
    <ReactEcharts option={option} style={{ height: "100%", width: "100%" }} />
  );
};

export default BasicChart;
