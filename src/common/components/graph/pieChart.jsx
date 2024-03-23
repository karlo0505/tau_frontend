import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PieChartComponent({
  graphData,
  year,
  type,
  graphTitle,
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: graphTitle,
      },
    },
  };

  function getGraphData(gdata, variant) {
    switch (variant) {
      case "vehicle":
        const fourWheels = graphData.filter(
          (x) => x.typeOfVehicle === "4wheels"
        );
        const tricycle = graphData.filter(
          (x) => x.typeOfVehicle === "tricycle"
        );
        const motorcycle = graphData.filter(
          (x) => x.typeOfVehicle === "motorcycle"
        );

        const typeV = {
          labels: ["Tricycle", "Motorcycle", "4 or more wheeled vehicle"],
          datasets: [
            {
              label: `Year ${year} : Total Quantity`,
              data: [
                tricycle.length ? tricycle.length : 0,
                motorcycle.length ? motorcycle.length : 0,
                fourWheels.length ? fourWheels.length : 0,
              ],
              backgroundColor: ["#82ca9d", "#eab676", "#8884d8"],
              borderColor: ["#8884d8", "#82ca9d", "#eab676"],
              borderWidth: 1,
            },
          ],
        };
        return typeV;
      case "application":
        const others = graphData.filter((x) => x.applicationType === "others");
        const student = graphData.filter(
          (x) => x.applicationType === "student"
        );
        const employee = graphData.filter(
          (x) => x.applicationType === "employee"
        );
        const publicvehicle = graphData.filter(
          (x) => x.applicationType === "publicvehicle"
        );

        const apptype = {
          labels: ["Public Utility Vehicle", "Employee", "Student", "Others"],
          datasets: [
            {
              label: `Year ${year} : Total Quantity`,
              data: [
                publicvehicle.length ? publicvehicle.length : 0,
                employee.length ? employee.length : 0,
                student.length ? student.length : 0,
                others.length ? others.length : 0,
              ],
              backgroundColor: ["#8884d8", "#82ca9d", "#eab676", "#063970"],
              borderColor: ["#8884d8", "#82ca9d", "#eab676", "#063970"],
              borderWidth: 1,
            },
          ],
        };
        return apptype;

      default:
        const pending = gdata.filter((x) => x.appStatus === "pending");
        const approved = gdata.filter((x) => x.appStatus === "approved");

        const data = {
          labels: ["Pending", "Approved"],
          datasets: [
            {
              label: `Year ${year} : Total Quantity `,
              data: [
                pending.length ? pending.length : 0,
                approved.length ? approved.length : 0,
              ],
              backgroundColor: ["#8884d8", "#82ca9d"],
              borderColor: ["#8884d8", "#82ca9d"],
              borderWidth: 1,
            },
          ],
        };
        return data;
    }
  }

  return <Bar options={options} data={getGraphData(graphData, type)} />;
}
