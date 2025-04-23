import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useBranch } from "../Pages/Branches"; // 🔥 Import Branch Context
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend);

const Dashboard = (userName) => {
  const { selectedBranch } = useBranch(); // 🔥 Get the selected branch
  const [openChatbot, setOpenChatbot] = useState(false);
  const navigate = useNavigate();

  // 🔥 Mock branch-specific data
  const branchData = {
    "Main Branch": {
      fees: [1200, 1500, 1800, 2000, 1700, 1900],
      students: 1200,
      classes: 25,
      teachingStaff: 45,
      nonTeachingStaff: 55,
      busRoutes: 15,
      examsPending: 5,
    },
    "City Branch": {
      fees: [1000, 1300, 1700, 1800, 1600, 1750],
      students: 950,
      classes: 20,
      teachingStaff: 40,
      nonTeachingStaff: 50,
      busRoutes: 10,
      examsPending: 3,
    },
    "Westside Branch": {
      fees: [1100, 1400, 1600, 1900, 1650, 1850],
      students: 800,
      classes: 18,
      teachingStaff: 38,
      nonTeachingStaff: 48,
      busRoutes: 12,
      examsPending: 4,
    },
  };

  const currentBranchData = branchData[selectedBranch] || branchData["Main Branch"];

  // 🔥 Dynamic Chart Data
  const chartData = {
    bar: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: `Fees Collected - ${selectedBranch}`,
          data: currentBranchData.fees,
          backgroundColor: "#4F46E5",
        },
      ],
    },
    pie: {
      labels: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
      datasets: [
        {
          label: "Students Distribution",
          data: [120, 150, 100, 200, 90], // Static for now
          backgroundColor: ["#3B82F6", "#6366F1", "#EC4899", "#F59E0B", "#10B981"],
        },
      ],
    },
    line: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Attendance Trend",
          data: [95, 90, 85, 93, 89], // Static for now
          borderColor: "#10B981",
          fill: false,
        },
      ],
    },
  };

  // 🔥 Dynamic Metrics Based on Branch
  const metrics = [
    { label: "Total Students", value: currentBranchData.students, icon: "👨‍🎓", path: "/students/Students-List" },
    { label: "Total Classes", value: currentBranchData.classes, icon: "📚", path: "/classes/info" },
    { label: "Teaching Staff", value: currentBranchData.teachingStaff, icon: "👩‍🏫", path: "/Staff/teaching-staff" },
    { label: "Non Teaching Staff", value: currentBranchData.nonTeachingStaff, icon: "👩‍🏫", path: "/Staff/non-teaching-staff" },
    { label: "School Bus Routes", value: currentBranchData.busRoutes, icon: "🚌", path: "/School Bus/bus-route" },
    { label: "Exam Results Pending", value: currentBranchData.examsPending, icon: "📝", path: "/Exams/examresults" },
  ];

  const quickLinks = [
    { label: "Add Student", path: "/students-list" },
    { label: "Add Staff", path: "/staff/teaching-staff" },
    { label: "Manage Fees", path: "/fees" },
    { label: "View Timetables", path: "/classes/timetable" },
  ];

  const renderCard = (item, index) => (
    <Card key={index} className="bg-gray-100 shadow-md cursor-pointer" onClick={() => navigate(item.path)}>
      <CardContent className="flex items-center space-x-4 hover:scale-105 hover:shadow-lg">
        <div className="text-3xl">{item.icon}</div>
        <div>
          <Typography variant="body1">{item.label}</Typography>
          <Typography variant="h6" className="font-bold">{item.value}</Typography>
        </div>
      </CardContent>
    </Card>
  );

  const renderChart = (type, data, title, path) => (
    <Card className="bg-gray-100 shadow-md h-[250px] cursor-pointer" onClick={() => navigate(path)}>
      <CardContent>
        <Typography variant="body1" className="mb-2">{title}</Typography>
        <div className="h-[150px]">
          {React.createElement(type, { data, options: { maintainAspectRatio: false } })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="overflow-y-auto bg-gray-50" style={{ height: "90vh" }}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map(renderCard)}

        <div className="grid col-span-1 gap-4 md:col-span-2 lg:col-span-3">
          {renderChart(Bar, chartData.bar, `Fee Collection Trends - ${selectedBranch}`, "/fees-trends")}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {renderChart(Pie, chartData.pie, "Student Distribution", "/student-distribution")}
            {renderChart(Line, chartData.line, "Attendance Trends", "/attendance-trends")}
          </div>
        </div>

        <Card className="col-span-1 bg-gray-100 shadow-md md:col-span-2 lg:col-span-3">
          <CardContent>
            <Typography variant="body1" className="mb-2">Quick Links</Typography>
            <div className="flex flex-wrap justify-between gap-4">
              {quickLinks.map((link, index) => (
                <button key={index} className="flex-1 px-4 py-2 text-white bg-black rounded-lg shadow w-60" onClick={() => navigate(link.path)}>
                  {link.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
