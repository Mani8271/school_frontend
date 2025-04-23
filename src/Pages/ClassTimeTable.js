import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"; // Material UI imports
import { useBranch } from "../Pages/Branches"; // Assuming branch selection is managed globally

const ClassTimeTable = () => {
  const [showModal, setShowModal] = useState(false);
  const { selectedBranch } = useBranch(); // Get the selected branch
  const [modalData, setModalData] = useState({
    class: "", section: "", period1: "",
    period2: "",
    break1: "",
    period3: "",
    period4: "",
    break2: "",
    period5: "",
    period6: "",
    break3: "",
    period7: "",
  });
  const [timetableData, setTimetableData] = useState([
    {
      class: "Class 1",
      section: "A",
      period1: "Math",
      period2: "Science",
      break1: "10:00 - 10:30",
      period3: "English",
      period4: "History",
      break2: "12:00 - 12:30",
      period5: "Geography",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 1",
      section: "B",
      period1: "Math",
      period2: "English",
      break1: "10:00 - 10:30",
      period3: "Science",
      period4: "History",
      break2: "12:00 - 12:30",
      period5: "Geography",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 2",
      section: "A",
      period1: "Math",
      period2: "History",
      break1: "10:00 - 10:30",
      period3: "English",
      period4: "Science",
      break2: "12:00 - 12:30",
      period5: "Geography",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 3",
      section: "A",
      period1: "Math",
      period2: "English",
      break1: "10:00 - 10:30",
      period3: "History",
      period4: "Geography",
      break2: "12:00 - 12:30",
      period5: "Science",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 2",
      section: "A",
      period1: "Math",
      period2: "History",
      break1: "10:00 - 10:30",
      period3: "English",
      period4: "Science",
      break2: "12:00 - 12:30",
      period5: "Geography",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 3",
      section: "A",
      period1: "Math",
      period2: "English",
      break1: "10:00 - 10:30",
      period3: "History",
      period4: "Geography",
      break2: "12:00 - 12:30",
      period5: "Science",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 2",
      section: "A",
      period1: "Math",
      period2: "History",
      break1: "10:00 - 10:30",
      period3: "English",
      period4: "Science",
      break2: "12:00 - 12:30",
      period5: "Geography",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 3",
      section: "A",
      period1: "Math",
      period2: "English",
      break1: "10:00 - 10:30",
      period3: "History",
      period4: "Geography",
      break2: "12:00 - 12:30",
      period5: "Science",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 4",
      section: "A",
      period1: "Math",
      period2: "English",
      break1: "10:00 - 10:30",
      period3: "History",
      period4: "Geography",
      break2: "12:00 - 12:30",
      period5: "Science",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 5",
      section: "A",
      period1: "Math",
      period2: "English",
      break1: "10:00 - 10:30",
      period3: "History",
      period4: "Geography",
      break2: "12:00 - 12:30",
      period5: "Science",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 6",
      section: "A",
      period1: "Math",
      period2: "English",
      break1: "10:00 - 10:30",
      period3: "History",
      period4: "Geography",
      break2: "12:00 - 12:30",
      period5: "Science",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
    {
      class: "Class 7",
      section: "A",
      period1: "Math",
      period2: "English",
      break1: "10:00 - 10:30",
      period3: "History",
      period4: "Geography",
      break2: "12:00 - 12:30",
      period5: "Science",
      period6: "Art",
      break3: "2:00 - 2:30",
      period7: "PE",
    },
  ]);
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [uniqueSections, setUniqueSections] = useState([]);

  // Pagination state
  const [entriesCount, setEntriesCount] = useState(5); // Number of entries per page
  const [currentPage, setCurrentPage] = useState(1); // Current page

  const totalPages = Math.ceil(timetableData.length / entriesCount); // Total pages based on data length
  const branchData = {
    "Main Branch": ["Class 1", "Class 2", "Class 3"],
    "City Branch": ["Class 4", "Class 5"],
    "Westside Branch": ["Class 6", "Class 7"]  // ✅ Correct
  };
  
  const filteredData = timetableData.filter(
    (data) =>
      branchData[selectedBranch]?.includes(data.class) && // Filter by branch
      (classFilter ? data.class === classFilter : true) &&
      (sectionFilter ? data.section === sectionFilter : true)
  );
  const uniqueClasses = branchData[selectedBranch] || [];

  // Function to handle class selection and update the section dropdown
  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setClassFilter(selectedClass);
    setSectionFilter(""); // Reset section filter
    const relatedSections = timetableData
      .filter(
        (data) =>
          data.class === selectedClass &&
          branchData[selectedBranch]?.includes(selectedClass)
      )
      .map((data) => data.section);
    setUniqueSections([...new Set(relatedSections)]);
  };

  // Function to handle form submission (adding or editing timetable)
  const handleModalSubmit = () => {
    const existingIndex = timetableData.findIndex(
      (data) =>
        data.class === modalData.class && data.section === modalData.section
    );
    if (existingIndex >= 0) {
      setTimetableData(
        timetableData.map((data, index) =>
          index === existingIndex ? modalData : data
        )
      );
    } else {
      setTimetableData([...timetableData, modalData]);
    }
    setShowModal(false);
    setModalData({
      class: "",
      section: "",
      period1: "",
      period2: "",
      break1: "",
      period3: "",
      period4: "",
      break2: "",
      period5: "",
      period6: "",
      break3: "",
      period7: "",
    });
  };

  // Paginate the filtered data based on the entries per page
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesCount,
    currentPage * entriesCount
  );
  // Handle change in number of entries per page
  const handleEntriesChange = (e) => {
    setEntriesCount(Number(e.target.value));
    setCurrentPage(1); // Reset page to 1 when entries count changes
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 min-h-screen overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">All Class Time Table</h1>
      </div>
 
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Select Class Dropdown */}
          <FormControl variant="outlined" size="small" className="w-full sm:max-w-[300px]">
            <InputLabel id="class-label">Select Class</InputLabel>
            <Select
              labelId="class-label"
              value={classFilter}
              onChange={handleClassChange}
              label="Select Class"
              className="px-3 py-0 text-black bg-white border rounded"
            >
              {uniqueClasses.map((classItem, index) => (
                <MenuItem key={index} value={classItem}>
                  {classItem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select Section Dropdown */}
          <FormControl variant="outlined" size="small" className="w-full sm:max-w-[300px]">
            <InputLabel id="section-label">Select Section</InputLabel>
            <Select
              labelId="section-label"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              label="Select Section"
              className="px-3 py-0 text-black bg-white border rounded"
            >
              {uniqueSections.map((sectionItem, index) => (
                <MenuItem key={index} value={sectionItem}>
                  {sectionItem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
  
        {/* Button */}
        <div className="flex justify-end sm:justify-start w-full sm:w-auto">
          <button
            className="flex items-center gap-2 px-4 py-2 text-black rounded hover:bg-gray-200"
            title="Add Time Table"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Show Entries Dropdown */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm font-medium text-gray-700">
          Show Entries:
        </label>
        <select
          value={entriesCount}
          onChange={handleEntriesChange}
          className="px-2 py-1 text-black bg-white border rounded w-[70px]"
        >
          {[5, 10, 15, 20].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
        <div className="w-full overflow-x-auto">
          {/* <div className="w-full max-w-full overflow-x-auto border rounded-lg"> */}
          <div className="min-w-max">
          <table className="w-full bg-white text-sm sm:text-md ">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Section</th>
                <th className="p-3 text-left">Period1</th>
                <th className="p-3 text-left">Period2</th>
                <th className="p-3 text-left">Break1</th>
                <th className="p-3 text-left">Period3</th>
                <th className="p-3 text-left">Period4</th>
                <th className="p-3 text-left">Break2</th>
                <th className="p-3 text-left">Period5</th>
                <th className="p-3 text-left">Period6</th>
                <th className="p-3 text-left">Break3</th>
                <th className="p-3 text-left">Period7</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((data, index) => (
                <tr key={index} className="border-b text-sm sm:text-md hover:bg-gray-100 transition">
                  <td className="p-3 border">{data.class}</td>
                  <td className="p-3 border">{data.section}</td>
                  <td className="p-3 border">{data.period1}</td>
                  <td className="p-3 border">{data.period2}</td>
                  <td className="p-3 border">{data.break1}</td>
                  <td className="p-3 border">{data.period3}</td>
                  <td className="p-3 border">{data.period4}</td>
                  <td className="p-3 border">{data.break2}</td>
                  <td className="p-3 border">{data.period5}</td>
                  <td className="p-3 border">{data.period6}</td>
                  <td className="p-3 border">{data.break3}</td>
                  <td className="p-3 border">{data.period7}</td>
                  <td className="flex gap-4 p-3 justify-center">
                    <button
                      className="text-yellow-600 hover:text-yellow-800 transition cursor-pointer"
                      onClick={() => {
                        setModalData(data);
                        setShowModal(true); // Open the modal
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition cursor-pointer"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this item?")) {
                          setTimetableData(timetableData.filter((item) => item !== data));
                        }
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* </div> */}
          </div>
      </div>


      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
        {/* Prev Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border transition ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
              : "text-gray-900 border-gray-400 hover:bg-gray-100"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border transition ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
              : "text-gray-900 border-gray-400 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-[90%] max-h-[90vh] overflow-y-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 bg-white rounded shadow-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Add Time Table</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl text-gray-600 hover:text-gray-800"
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleModalSubmit();
              }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {[
                { label: "Class", key: "class" },
                { label: "Section", key: "section" },
                { label: "Period 1", key: "period1" },
                { label: "Period 2", key: "period2" },
                { label: "Break 1", key: "break1" },
                { label: "Period 3", key: "period3" },
                { label: "Period 4", key: "period4" },
                { label: "Break 2", key: "break2" },
                { label: "Period 5", key: "period5" },
                { label: "Period 6", key: "period6" },
                { label: "Break 3", key: "break3" },
                { label: "Period 7", key: "period7" },
              ].map((field) => (
                <div className="flex flex-col" key={field.key}>
                  <label className="mb-1 text-sm font-medium">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.label}
                    value={modalData[field.key]}
                    onChange={(e) =>
                      setModalData({ ...modalData, [field.key]: e.target.value })
                    }
                    className="px-4 py-2 text-black border rounded w-full min-w-0 flex-grow"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassTimeTable;
