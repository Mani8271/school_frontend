import React, { useState, useEffect } from "react";
import {Dialog,DialogActions,DialogContent,DialogTitle,Button,TextField,MenuItem,Select,InputLabel,FormControl,} from "@mui/material";
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { useBranch } from "../Pages/Branches";  // Import branch context


const Payroll = () => {
  const [open, setOpen] = useState(false); // To manage modal state
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [netSalary, setNetSalary] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [earnings, setEarnings] = useState({
    basic: "",
    da: "",
    hra: "",
    conveyance: "",
    allowance: "",
    medicalAllowance: "",
    others: "",
  });
  const [deductions, setDeductions] = useState({
    tds: "",
    esi: "",
    pf: "",
    leaves: "",
    profTax: "",
    others: "",
  });
  // const [entriesCount, setEntriesCount] = useState(10); // For controlling the number of rows to display
  // const [salaryData, setSalaryData] = useState([]); // To store the salary records
  const [payslipData, setPayslipData] = useState(null); // To store payslip data
  const [isPayslipVisible, setIsPayslipVisible] = useState(false); // To track if payslip is visible
  const [editingSalaryIndex, setEditingSalaryIndex] = useState(null);
  const { selectedBranch } = useBranch(); // Get the currently selected branch


  const [salaryData, setSalaryData] = useState([
    {
      employee: "John Doe",
      employeeId: "EMP001",
      branch: "Main Branch", // ✅ Assigned branch
      joiningDate: "2022-01-15",
      role: "Software Engineer",
      netSalary: 50000,
      month: "January",
      earnings: {
        basic: 30000,
        da: 5000,
        hra: 8000,
        conveyance: 2000,
        allowance: 3000,
        medicalAllowance: 2000,
        others: 2000,
      },
      deductions: {
        tds: 2500,
        esi: 500,
        pf: 3000,
        leaves: 1000,
        profTax: 500,
        others: 500,
      },
    },
    {
      employee: "Jane Smith",
      employeeId: "EMP002",
      branch: "City Branch", // ✅ Assigned branch
      joiningDate: "2021-06-10",
      role: "HR Manager",
      netSalary: 60000,
      month: "January",
      earnings: {
        basic: 35000,
        da: 6000,
        hra: 9000,
        conveyance: 2500,
        allowance: 4000,
        medicalAllowance: 2500,
        others: 3000,
      },
      deductions: {
        tds: 3000,
        esi: 600,
        pf: 3500,
        leaves: 1200,
        profTax: 600,
        others: 600,
      },
    },
    {
      employee: "Michael Brown",
      employeeId: "EMP003",
      branch: "Westside Branch", // ✅ Assigned branch
      joiningDate: "2020-09-05",
      role: "Project Manager",
      netSalary: 75000,
      month: "January",
      earnings: {
        basic: 45000,
        da: 7000,
        hra: 12000,
        conveyance: 3000,
        allowance: 5000,
        medicalAllowance: 3000,
        others: 4000,
      },
      deductions: {
        tds: 4000,
        esi: 800,
        pf: 4500,
        leaves: 1500,
        profTax: 800,
        others: 800,
      },
    },
    {
      employee: "Emily Davis",
      employeeId: "EMP004",
      branch: "Main Branch", // ✅ Assigned branch
      joiningDate: "2023-03-12",
      role: "Marketing Manager",
      netSalary: 65000,
      month: "February",
      earnings: {
        basic: 40000,
        da: 7000,
        hra: 10000,
        conveyance: 3000,
        allowance: 5000,
        medicalAllowance: 2000,
        others: 3000,
      },
      deductions: {
        tds: 3500,
        esi: 700,
        pf: 4000,
        leaves: 1300,
        profTax: 700,
        others: 700,
      },
    },
    {
      employee: "David Wilson",
      employeeId: "EMP005",
      branch: "City Branch", // ✅ Assigned branch
      joiningDate: "2019-07-20",
      role: "Finance Manager",
      netSalary: 80000,
      month: "February",
      earnings: {
        basic: 50000,
        da: 8000,
        hra: 15000,
        conveyance: 4000,
        allowance: 6000,
        medicalAllowance: 3000,
        others: 5000,
      },
      deductions: {
        tds: 5000,
        esi: 900,
        pf: 6000,
        leaves: 2000,
        profTax: 900,
        others: 1000,
      },
    },
    {
      employee: "Sophia Martinez",
      employeeId: "EMP006",
      branch: "Westside Branch", // ✅ Assigned branch
      joiningDate: "2022-11-05",
      role: "Sales Executive",
      netSalary: 45000,
      month: "March",
      earnings: {
        basic: 25000,
        da: 4000,
        hra: 7000,
        conveyance: 1500,
        allowance: 2500,
        medicalAllowance: 1500,
        others: 2000,
      },
      deductions: {
        tds: 2000,
        esi: 400,
        pf: 2500,
        leaves: 900,
        profTax: 500,
        others: 400,
      },
    },
  ]);
  
  const [entriesCount, setEntriesCount] = useState(5); // Entries per page
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const totalPages = Math.ceil(salaryData.length / entriesCount); // Total pages based on data

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEntriesChange = (event) => {
    const value = Number(event.target.value);
    if (value >= 1) {
      setEntriesCount(value);
    }
  };

  useEffect(() => {
    const month = new Date().toLocaleString("default", { month: "long" });
    setCurrentMonth(month); // Auto-fill current month in modal
  }, []);

  const branchSpecificData = salaryData.filter((data) => data.branch === selectedBranch); // 🔥 Filter by branch

  const filteredSalaryData = branchSpecificData.filter((salary) =>
    selectedMonth ? salary.month.toLowerCase().trim() === selectedMonth.toLowerCase().trim() : true
  );
  
  const displayedData = filteredSalaryData.slice(
    (currentPage - 1) * entriesCount,
    currentPage * entriesCount
  );

  // Handle Modal Open and Close
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    // Reset form data when modal is closed
    setSelectedEmployee("");
    setNetSalary("");
    setEarnings({
      basic: "",
      da: "",
      hra: "",
      conveyance: "",
      allowance: "",
      medicalAllowance: "",
      others: "",
    });
    setDeductions({
      tds: "",
      esi: "",
      pf: "",
      leaves: "",
      profTax: "",
      others: "",
    });
    setOpen(false);
  };
  // Function to generate Payslip (basic logic)

  const generatePayslip = (employee) => {
    console.log("Employee Data:", employee); // Debugging

    // Check if employee data has the required fields
    if (!employee || !employee.earnings || !employee.deductions) {
      console.error("Invalid employee data: Missing earnings or deductions.");
      return;
    }

    // Ensure the missing fields have default values if undefined
    employee.role = employee.role || "N/A";
    employee.id = employee.id || "N/A";
    employee.joiningDate = employee.joiningDate || "N/A";

    // Set payslip data and make the payslip visible
    setPayslipData(employee);
    setIsPayslipVisible(true);

    // Log state after update delay
    setTimeout(() => {
      console.log("Payslip Data Updated:", payslipData); // Check if these fields are now set
    }, 500);
  };

  // Handle Save Salary details (example, can be extended)
  const handleSaveSalary = () => {
    const newSalaryData = {
      employee: selectedEmployee,
      netSalary,
      earnings,
      deductions,
      month: currentMonth, // ✅ Ensure month is saved properly
    };

    if (editingSalaryIndex !== null) {
      const updatedSalaryData = [...salaryData];
      updatedSalaryData[editingSalaryIndex] = newSalaryData;
      setSalaryData(updatedSalaryData);
    } else {
      setSalaryData([...salaryData, newSalaryData]);
    }

    setSelectedMonth(""); // ✅ Reset selected month to show all data
    handleClose(); // ✅ Close modal after saving
  };

  // Handle Edit Salary Entry
  const handleEditSalary = (index) => {
    const salary = salaryData[index];
    setSelectedEmployee(salary.employee);
    setNetSalary(salary.netSalary);
    setEarnings(salary.earnings);
    setDeductions(salary.deductions);
    setEditingSalaryIndex(index);
    setOpen(true); // Open the modal for editing
  };

  // Handle Delete Salary Entry
  // const handleDeleteSalary = (index) => {
  //   const updatedSalaryData = salaryData.filter((_, i) => i !== index);
  //   setSalaryData(updatedSalaryData);
  // };

  const handleDeleteSalary = (index) => {
    // Check if salaryData exists and has entries
    if (!salaryData || salaryData.length === 0) {
      alert("No salary data available to delete.");
      return;
    }
  
    // Ensure index is valid
    if (index < 0 || index >= salaryData.length) {
      alert("Invalid salary entry.");
      return;
    }
  
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this salary entry?");
    if (!confirmDelete) return;
  
    // Proceed with deletion
    const updatedSalaryData = salaryData.filter((_, i) => i !== index);
    setSalaryData(updatedSalaryData);
  };
  

  // PDF Download logic
  const handleDownloadPDF = (payslipData) => {
    if (!payslipData || !payslipData.earnings || !payslipData.deductions) {
      console.error("Payslip data is missing earnings or deductions.");
      return;
    }

    console.log("Payslip Data Before PDF Generation:", payslipData); // Debugging

    // Check specific fields
    console.log("Role:", payslipData.role);
    console.log("Employee ID:", payslipData.id);
    console.log("Joining Date:", payslipData.joiningDate);

    const { jsPDF } = require("jspdf");
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    const title = "Payslip";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, 10);

    // Subheading
    doc.setFontSize(12);
    const subheading = `Payslip for ${new Date().toLocaleString("default", {
      month: "long",
    })} ${new Date().getFullYear()}`;
    const subheadingWidth = doc.getTextWidth(subheading);
    const subheadingX = (doc.internal.pageSize.width - subheadingWidth) / 2;
    doc.text(subheading, subheadingX, 20);

    // Employee Details
    doc.setFontSize(10); // Smaller font size to fit text
    doc.text("Employee Details:", 15, 50);
    doc.text(`Name: ${payslipData.employee || "N/A"}`, 15, 60);
    doc.text(`Role: ${payslipData.role || "Role Not Available"}`, 15, 70); // Default text if missing
    doc.text(`Employee ID: ${payslipData.id || "ID Not Available"}`, 15, 80); // Default text if missing
    doc.text(
      `Joining Date: ${
        payslipData.joiningDate || "Joining Date Not Available"
      }`,
      15,
      90
    ); // Default text if missing

    // Earnings Section
    doc.text("Earnings:", 15, 110);
    doc.text(`Basic: ${payslipData.earnings.basic || "N/A"}`, 15, 120);
    doc.text(`DA: ${payslipData.earnings.da || "N/A"}`, 15, 130);
    doc.text(`HRA: ${payslipData.earnings.hra || "N/A"}`, 15, 140);
    doc.text(
      `Conveyance: ${payslipData.earnings.conveyance || "N/A"}`,
      15,
      150
    );
    doc.text(`Allowance: ${payslipData.earnings.allowance || "N/A"}`, 15, 160);
    doc.text(
      `Medical Allowance: ${payslipData.earnings.medicalAllowance || "N/A"}`,
      15,
      170
    );
    doc.text(`Others: ${payslipData.earnings.others || "N/A"}`, 15, 180);

    // Deductions Section
    doc.text("Deductions:", 105, 110);
    doc.text(`TDS: ${payslipData.deductions.tds || "N/A"}`, 105, 120);
    doc.text(`ESI: ${payslipData.deductions.esi || "N/A"}`, 105, 130);
    doc.text(`PF: ${payslipData.deductions.pf || "N/A"}`, 105, 140);
    doc.text(`Leaves: ${payslipData.deductions.leaves || "N/A"}`, 105, 150);
    doc.text(
      `Professional Tax: ${payslipData.deductions.profTax || "N/A"}`,
      105,
      160
    );
    doc.text(`Others: ${payslipData.deductions.others || "N/A"}`, 105, 170);

    // Net Salary
    const netSalary = payslipData.netSalary || "N/A";
    doc.text("Total Salary:", 15, 190);
    doc.text(`${netSalary}`, 15, 200);

    // Total Salary in Words
    const salaryInWords = convertToWords(payslipData.netSalary);
    doc.text("Total Salary in Words:", 15, 210);
    doc.text(salaryInWords, 15, 220);

    // Save the PDF
    doc.save(
      `Payslip_${payslipData.employee}_${
        new Date().toISOString().split("T")[0]
      }.pdf`
    );
  };

  // Print logic
  const handlePrint = () => {
    // Create a printable version of the payslip
    const printWindow = window.open("", "_blank");
    const printContent = `
    <html>
      <head>
        <title>Payslip</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
          }
          h2 {
            text-align: center;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-weight: bold;
            margin-bottom: 10px;
          }
          ul {
            list-style: none;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <h2>Payslip of ${new Date().toLocaleString("default", {
          month: "long",
        })} ${new Date().getFullYear()}</h2>
        <div class="section">
          <p><strong>Company Name:</strong> 123 Main Street, City, State, ZIP</p>
          <p><strong>Payslip ID:</strong> ${Math.random()
            .toString(36)
            .substr(2, 9)
            .toUpperCase()}</p>
          <p><strong>Month & Year:</strong> ${new Date().toLocaleDateString(
            "en-US",
            { month: "long", year: "numeric" }
          )}</p>
        </div>
        <div class="section">
          <p class="section-title">Employee Details:</p>
          <p>Name: ${payslipData.employee}</p>
          <p>Role: Developer</p>
          <p>Employee ID: E001</p>
          <p>Joining Date: 01-Jan-2020</p>
        </div>
        <div class="section">
          <p class="section-title">Earnings:</p>
          <ul>
            <li>Basic: ${payslipData.earnings.basic}</li>
            <li>DA: ${payslipData.earnings.da}</li>
            <li>HRA: ${payslipData.earnings.hra}</li>
            <li>Conveyance: ${payslipData.earnings.conveyance}</li>
            <li>Allowance: ${payslipData.earnings.allowance}</li>
            <li>Medical Allowance: ${payslipData.earnings.medicalAllowance}</li>
           
          </ul>
        </div>
        <div class="section">
          <p class="section-title">Deductions:</p>
          <ul>
            <li>TDS: ${payslipData.deductions.tds}</li>
            <li>ESI: ${payslipData.deductions.esi}</li>
            <li>PF: ${payslipData.deductions.pf}</li>
            <li>Leaves: ${payslipData.deductions.leaves}</li>
            <li>Professional Tax: ${payslipData.deductions.profTax}</li>
            
          </ul>
        </div>
        <div class="section">
          <p class="section-title">Total Salary:</p>
          <p>${payslipData.netSalary} (${convertToWords(
      payslipData.netSalary
    )})</p>
        </div>
      </body>
    </html>
  `;

    // Write the content to the print window and trigger print
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const convertToWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num === 0) return "Zero Rupees Only";

    const convertToWordsHelper = (n) => {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " and " + convertToWordsHelper(n % 100) : "")
        );
      if (n < 100000)
        return (
          convertToWordsHelper(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + convertToWordsHelper(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          convertToWordsHelper(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + convertToWordsHelper(n % 100000) : "")
        );
      return "Number too large";
    };

    return convertToWordsHelper(num) + " Rupees Only";
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      {/* Title and Add Salary Button */}
      {!isPayslipVisible && (
        <div>
          {/* Title - First Row */}
          <div className="p-4 text-2xl font-semibold text-left text-black">
            <h2>Employee Salary</h2>
          </div>

          {/* Add Salary Button - Second Row */}
          <div className="flex justify-between p-4">
            {/* Select Month Dropdown - Third Row */}
            <div className="flex mb-4">
              <FormControl fullWidth>
                <InputLabel>Select Month</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  label="Select Month"
                  className="w-[300px]"
                >
                  <MenuItem value="January">January</MenuItem>
                  <MenuItem value="February">February</MenuItem>
                  <MenuItem value="March">March</MenuItem>
                  <MenuItem value="April">April</MenuItem>
                  <MenuItem value="May">May</MenuItem>
                  <MenuItem value="June">June</MenuItem>
                  <MenuItem value="July">July</MenuItem>
                  <MenuItem value="August">August</MenuItem>
                  <MenuItem value="September">September</MenuItem>
                  <MenuItem value="October">October</MenuItem>
                  <MenuItem value="November">November</MenuItem>
                  <MenuItem value="December">December</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button
              color="primary"
              title="add salary"
              onClick={handleClickOpen}
            >
              <AddIcon style={{ fontSize: "34px", marginRight: "8px" }} />
            </Button>
          </div>

          {/* Show Entries Section - Fourth Row */}
          {/* Show Entries Dropdown */}
          <div className="flex items-center space-x-2 ml-4">
            <label className="text-sm font-medium text-gray-700">Show Entries:</label>
            <select
              value={entriesCount}
              onChange={handleEntriesChange}
              className="px-3 py-2 text-gray-900 bg-white border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 w-[60px] text-sm"
            >
              {[5, 10, 15, 20].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>

        </div>
      )}

      {/* Modal for Adding Salary */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add Salary Details</DialogTitle>
        <DialogContent>
          {/* Select Employee and Net Salary */}
          <div className="mt-2 space-y-4">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Employee</InputLabel>
              <Select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                label="Select Employee"
              >
                <MenuItem value="emp1">Employee 1</MenuItem>
                <MenuItem value="emp2">Employee 2</MenuItem>
                <MenuItem value="emp3">Employee 3</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Net Salary"
              type="number"
              value={netSalary}
              onChange={(e) => setNetSalary(e.target.value)}
              fullWidth
            />
            <TextField
              label="Month"
              type="text"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(e.target.value)}
              fullWidth
            />
          </div>

          {/* Earnings Section */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h3>Earnings</h3>
              {[
                "basic",
                "da",
                "hra",
                "conveyance",
                "allowance",
                "medicalAllowance",
                "others",
              ].map((field) => (
                <TextField
                  key={field}
                  label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                  value={earnings[field]}
                  onChange={(e) =>
                    setEarnings({ ...earnings, [field]: e.target.value })
                  }
                  fullWidth
                />
              ))}
            </div>

            {/* Deductions Section */}
            <div className="space-y-2">
              <h3>Deductions</h3>
              {["tds", "esi", "pf", "leaves", "profTax", "others"].map(
                (field) => (
                  <TextField
                    key={field}
                    label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    value={deductions[field]}
                    onChange={(e) =>
                      setDeductions({ ...deductions, [field]: e.target.value })
                    }
                    fullWidth
                  />
                )
              )}
            </div>
          </div>
        </DialogContent>

        {/* Actions */}
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveSalary}
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save Salary
          </Button>
        </DialogActions>
      </Dialog>

      {/* Salary Table */}
      {!isPayslipVisible && (
        <div className="p-4">
          {/* Scrollable Table Container */}
          <div className="max-h-[calc(100vh-200px)] overflow-auto border border-gray-300 rounded-md">
            <table className="min-w-full bg-white">
              <thead className="sticky top-0 z-10 bg-gray-200 border-b">
                <tr>
                  <th className="p-2 text-left border">Employee Name</th>
                  <th className="p-2 text-left border">Employee ID</th>
                  <th className="p-2 text-left border">Joining Date</th>
                  <th className="p-2 text-left border">Role</th>
                  <th className="p-2 text-left border">Salary</th>
                  <th className="p-2 text-left border">Payslip</th>
                  <th className="p-2 text-left border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border">{item.employee}</td>
                    <td className="px-3 py-2 border">{item.employeeId}</td>
                    <td className="px-3 py-2 border">
                      {new Date(item.joiningDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 border">{item.role}</td>
                    <td className="px-3 py-2 border">{item.netSalary}</td>
                    <td className="px-3 py-2 border text-center">
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => generatePayslip(item)}
                      >
                        Payslip
                      </Button>
                    </td>
                    <td className="flex px-2 py-4 border text-center">
                      <Button
                        onClick={() => handleEditSalary(index)}
                        color="primary"
                        className="mx-1"
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => handleDeleteSalary(index)}
                        color="error"
                        className="mx-1"
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            {/* Previous Button */}
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border transition ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
                  : "text-gray-900 border-gray-400 hover:bg-gray-100"
              }`}
            >
              Previous
            </Button>

            {/* Page Info (Centered) */}
            <span className="text-sm text-gray-700 flex-1 font-semibold text-center">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border transition ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
                  : "text-gray-900 border-gray-400 hover:bg-gray-100"
              }`}
            >
              Next
            </Button>
          </div>
        </div>
      )}


      {/* Payslip Section */}
      {isPayslipVisible && payslipData && (
        <div
          className="relative flex flex-col p-6 overflow-y-auto bg-white border rounded-lg shadow-lg"
          style={{ height: "90vh" }}
        >
          {/* Cancel Icon */}
          <button
            className="absolute text-gray-600 top-4 right-4 hover:text-red-600"
            onClick={() => setIsPayslipVisible(false)} // Assuming you have a function to toggle visibility
          >
            ✖
          </button>

          {/* Payslip Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">
              Payslip for{" "}
              {new Date().toLocaleString("default", { month: "long" })}{" "}
              {new Date().getFullYear()}
            </h2>
          </div>

          {/* Logo and Payslip ID */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <img src="logo.png" alt="Logo" className="w-auto h-12 mb-2" />{" "}
              {/* Replace with your logo path */}
              <p className="text-sm">123 Main Street, City, State, ZIP</p>
            </div>
            <div className="text-sm">
              <p className="font-bold">
                Payslip ID:{" "}
                {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="font-bold">
                Month & Year:{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Employee Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">Employee Details:</h3>
            <p>Name: {payslipData.employee}</p>
            <p>Role: {payslipData.role || "Developer"}</p>{" "}
            {/* Dynamically fetched role */}
            <p>Employee ID: {payslipData.employeeId || "E001"}</p>{" "}
            {/* Dynamically fetched employee ID */}
            <p>
              Joining Date:{" "}
              {new Date(payslipData.joiningDate).toLocaleDateString()}
            </p>{" "}
            {/* Date formatting */}
          </div>

          {/* Earnings and Deductions Table */}
          <div className="mb-6">
            <table className="w-full border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-bold text-left border border-gray-300">
                    Earnings
                  </th>
                  <th className="px-4 py-2 font-bold text-left border border-gray-300">
                    Amount
                  </th>
                  <th className="px-4 py-2 font-bold text-left border border-gray-300">
                    Deductions
                  </th>
                  <th className="px-4 py-2 font-bold text-left border border-gray-300">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {(isPayslipVisible && payslipData
                  ? [payslipData]
                  : filteredSalaryData
                ).map((salary, index) => (
                  <React.Fragment key={index}>
                    {Object.keys(salary.earnings).map((key, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-4 py-2 capitalize border border-gray-300">
                          {key}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {salary.earnings[key]}
                        </td>
                        <td className="px-4 py-2 capitalize border border-gray-300">
                          {Object.keys(salary.deductions)[idx] || ""}
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          {salary.deductions[
                            Object.keys(salary.deductions)[idx]
                          ] || ""}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Salary */}
          <div className="mb-6">
            <h3 className="text-lg font-bold">Total Salary:</h3>
            <p className="text-lg font-semibold">{payslipData.netSalary}</p>
            <p className="text-gray-600">
              In Words: {convertToWords(payslipData.netSalary)}
            </p>
          </div>

          {/* Download and Print Buttons */}
          <div className="space-x-4 text-right">
            <Button
              onClick={() => {
                console.log("Downloading PDF with data:", payslipData); // Debugging

                if (
                  !payslipData ||
                  !payslipData.earnings ||
                  !payslipData.deductions
                ) {
                  console.error(
                    "Payslip data is missing. Ensure you generate the payslip first."
                  );
                  return;
                }

                handleDownloadPDF(payslipData); // 🔥 Pass a fresh copy of payslipData
              }}
            >
              Download PDF
            </Button>

            <button
              className="px-4 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
