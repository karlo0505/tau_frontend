import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};
function getData(graph) {
  const JanuaryPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 0 &&
      item.appStatus === "pending"
  );
  const FebruaryPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 1 &&
      item.appStatus === "pending"
  );
  const MarchPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 2 &&
      item.appStatus === "pending"
  );
  const AprilPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 3 &&
      item.appStatus === "pending"
  );
  const MayPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 4 &&
      item.appStatus === "pending"
  );
  const JunePending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 5 &&
      item.appStatus === "pending"
  );
  const JulyPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 6 &&
      item.appStatus === "pending"
  );
  const AugustPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 7 &&
      item.appStatus === "pending"
  );
  const SeptemberPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 8 &&
      item.appStatus === "pending"
  );
  const OctoberPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 9 &&
      item.appStatus === "pending"
  );
  const NovemberPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 10 &&
      item.appStatus === "pending"
  );
  const DecemberPending = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 11 &&
      item.appStatus === "pending"
  );

  const JanuaryApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 0 &&
      item.appStatus === "approved"
  );
  const FebruaryApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 1 &&
      item.appStatus === "approved"
  );
  const MarchApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 2 &&
      item.appStatus === "approved"
  );
  const AprilApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 3 &&
      item.appStatus === "approved"
  );
  const MayApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 4 &&
      item.appStatus === "approved"
  );
  const JuneApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 5 &&
      item.appStatus === "approved"
  );
  const JulyApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 6 &&
      item.appStatus === "approved"
  );
  const AugustApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 7 &&
      item.appStatus === "approved"
  );
  const SeptemberApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 8 &&
      item.appStatus === "approved"
  );
  const OctoberApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 9 &&
      item.appStatus === "approved"
  );
  const NovemberApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 10 &&
      item.appStatus === "approved"
  );
  const DecemberApproved = graph.filter(
    (item) =>
      moment(Date(item.dateApplied)).month() === 11 &&
      item.appStatus === "approved"
  );

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Pending",
        data: [
          JanuaryPending.length,
          FebruaryPending.length,
          MarchPending.length,
          AprilPending.length,
          MayPending.length,
          JunePending.length,
          JulyPending.length,
          AugustPending.length,
          SeptemberPending.length,
          OctoberPending.length,
          NovemberPending.length,
          DecemberPending.length,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "#8884d8",
      },
      {
        fill: true,
        label: "Approved",
        data: [
          JanuaryApproved.length,
          FebruaryApproved.length,
          MarchApproved.length,
          AprilApproved.length,
          MayApproved.length,
          JuneApproved.length,
          JulyApproved.length,
          AugustApproved.length,
          SeptemberApproved.length,
          OctoberApproved.length,
          NovemberApproved.length,
          DecemberApproved.length,
        ],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "#82ca9d",
      },
    ],
  };
  return data;
}

export default function AreaChartComponent({ graphData }) {
  return <Line options={options} data={getData(graphData)} />;
}
