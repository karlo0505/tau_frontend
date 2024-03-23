import React from "react";
import PieChartComponent from "./pieChart";
import AreaChartComponent from "./areaChart";
import { BarChart } from "./barChart";

export default function Charts({ ...props }) {
  const charts = {
    pieChart: PieChartComponent,
    areaChart: AreaChartComponent,
    barChart: BarChart,
  };

  const AppCharts = charts[props.variant] ?? charts.pieChart;

  return <AppCharts {...props} />;
}
