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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Bar Chart",
    // },
  },
};

function getData(graph) {
  if (graph) {
    const studentsPending = graph.filter(
      (i) => i.applicationType === "student" && i.appStatus === "pending"
    );
    const studentsApproved = graph.filter(
      (i) => i.applicationType === "student" && i.appStatus === "approved"
    );

    const othersPending = graph.filter(
      (i) => i.applicationType === "others" && i.appStatus === "pending"
    );
    const othersApproved = graph.filter(
      (i) => i.applicationType === "others" && i.appStatus === "approved"
    );

    const employeePending = graph.filter(
      (i) => i.applicationType === "employee" && i.appStatus === "pending"
    );
    const employeeApproved = graph.filter(
      (i) => i.applicationType === "employee" && i.appStatus === "approved"
    );

    const publicvehiclePending = graph.filter(
      (i) => i.applicationType === "publicvehicle" && i.appStatus === "pending"
    );
    const publicvehicleApproved = graph.filter(
      (i) => i.applicationType === "publicvehicle" && i.appStatus === "approved"
    );

    const labels = ["Students", "Employee", "Public Vehicle", "Others"];

    const data = {
      labels,
      datasets: [
        {
          label: "Pending",
          data: [
            studentsPending.length,
            employeePending.pending,
            publicvehiclePending.length,
            othersPending.length,
          ],
          backgroundColor: "#8884d8",
        },
        {
          label: "Approved",
          data: [
            studentsApproved.length,
            employeeApproved.length,
            publicvehicleApproved.length,
            othersApproved.length,
          ],
          backgroundColor: "#82ca9d",
        },
      ],
    };

    return data;
  }
}

export function BarChart({ graphData }) {
  return <Bar options={options} data={getData(graphData)} />;
}
