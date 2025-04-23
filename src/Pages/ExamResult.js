import React, { useState, useRef } from "react";
import { useBranch } from "../Pages/Branches";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import Select from "react-select";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUpload,
  FaFileDownload,
} from "react-icons/fa";
import * as XLSX from "xlsx";

const ExamResult = () => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // To track which row is being edited
  const navigate = useNavigate();

  const [modalData, setModalData] = useState({
    studentId: "",
    studentName: "",
    examType: "",
    class: "",
    section: "",
    lang1: "",
    lang2: "",
    english: "",
    maths: "",
    science: "",
    social: "",
  });
  const [examData, setExamData] = useState([
    {
      branch: "Main Branch",
      studentId: "ST001",
      studentName: "John Doe",
      examType: "Midterm",
      class: "Class 1",
      section: "A",
      lang1: 80,
      lang2: 85,
      english: 78,
      maths: 90,
      science: 88,
      social: 76,
    },
    {
      branch: "City Branch",
      studentId: "ST002",
      studentName: "Jane Smith",
      examType: "Final",
      class: "Class 4",
      section: "B",
      lang1: 75,
      lang2: 80,
      english: 70,
      maths: 85,
      science: 82,
      social: 78,
    },
    {
      branch: "Westside Branch",
      studentId: "ST003",
      studentName: "Will Smith",
      examType: "Final",
      class: "Class 4",
      section: "B",
      lang1: 75,
      lang2: 80,
      english: 70,
      maths: 85,
      science: 82,
      social: 78,
    },
  ]);
  const [entriesToShow, setEntriesToShow] = useState(5); // Default number of rows to show
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedBranch } = useBranch();

  const branchSpecificData = examData.filter(
    (data) => data.branch === selectedBranch
  );

  // Dropdowns for filtering
  const [examTypeFilter, setExamTypeFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [studentIdFilter, setStudentIdFilter] = useState("");

  // Filtered data for dropdowns
  const classesByExamType = examData.filter(
    (data) => data.examType === examTypeFilter
  );
  const sectionsByClass = classesByExamType.filter(
    (data) => data.class === classFilter
  );
  const studentIdsBySection = sectionsByClass.filter(
    (data) => data.section === sectionFilter
  );

  const handleModalSubmit = () => {
    if (editIndex !== null) {
      // Update existing data
      const updatedData = [...examData];
      updatedData[editIndex] = modalData;
      setExamData(updatedData);
    } else {
      // Add new data
      setExamData([...examData, modalData]);
    }
    setShowModal(false);
    setEditIndex(null); // Reset edit index
    setModalData({
      studentId: "",
      studentName: "",
      examType: "",
      class: "",
      section: "",
      lang1: "",
      lang2: "",
      english: "",
      maths: "",
      science: "",
      social: "",
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setModalData(examData[index]);
    setShowModal(true);
  };

  // const handleDelete = (index) => {
  //   setExamData(examData.filter((_, i) => i !== index));
  // };

  const handleDelete = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
    if (isConfirmed) {
      setExamData(examData.filter((_, i) => i !== index));
    }
  };
  
  // Pagination logic
  const startIndex = (currentPage - 1) * entriesToShow;
  const paginatedData = examData.slice(startIndex, startIndex + entriesToShow);
  const totalPages = Math.ceil(branchSpecificData.length / entriesToShow);

  // Filtered Data based on dropdowns
  const filteredData = branchSpecificData
    .filter(
      (data) =>
        (examTypeFilter ? data.examType === examTypeFilter : true) &&
        (classFilter ? data.class === classFilter : true) &&
        (sectionFilter ? data.section === sectionFilter : true) &&
        (studentIdFilter ? data.studentId === studentIdFilter : true)
    )
    .slice((currentPage - 1) * entriesToShow, currentPage * entriesToShow);

  // Prepare the options for the Select components
  const examTypeOptions = [
    ...new Set(examData.map((data) => data.examType)),
  ].map((examType) => ({ value: examType, label: examType }));

  const classOptions = [
    ...new Set(classesByExamType.map((data) => data.class)),
  ].map((classItem) => ({ value: classItem, label: classItem }));

  const sectionOptions = [
    ...new Set(sectionsByClass.map((data) => data.section)),
  ].map((section) => ({ value: section, label: section }));

  const studentIdOptions = [
    ...new Set(studentIdsBySection.map((data) => data.studentId)),
  ].map((studentId) => ({ value: studentId, label: studentId }));

  const fileInputRef = useRef(null);

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "string" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExamData([...examData, ...jsonData]); // Use examData instead of timetableData
    };
    reader.readAsText(file);
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(examData); // Use examData instead of timetableData
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exam Results");
    XLSX.writeFile(workbook, "Exam_Results.xlsx");
  };

  return (
    <div className="p-6">
      <div className="mb-4 text-left">
        {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="flex items-center text-gray-700 hover:text-gray-900 font-semibold mb-4"
      >
        <IoArrowBack className="mr-2 text-2xl" /> {/* Back Icon */}
        Back
      </button>
        <h1 className="text-2xl font-bold">Exam Results</h1>
      </div>

      <div className="mb-4">
        {filteredData.length > 0 ? (
          <>
            <h2 className="text-lg font-bold">
              Student Name: {filteredData[0].studentName}
            </h2>
            <h3 className="text-md">Student ID: {filteredData[0].studentId}</h3>
          </>
        ) : (
          <p>No students match the current search criteria.</p>
        )}
      </div>

      {/* Show Entries Dropdown */}
      <div className="flex items-center gap-2">
          <label className="text-sm">Show Entries:</label>
          <select
            value={entriesToShow}
            onChange={(e) => setEntriesToShow(Number(e.target.value))}
            className="px-2 py-1 border rounded w-[80px] text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

      <div className="flex flex-wrap items-center gap-4 mt-4 mb-4 lg:flex-nowrap">
        {/* Exam Type Dropdown with Search */}
        <div className="flex flex-wrap items-center gap-2 flex-grow">
          <Select
            value={examTypeFilter ? { value: examTypeFilter, label: examTypeFilter } : null}
            onChange={(e) => setExamTypeFilter(e ? e.value : "")}
            options={examTypeOptions}
            placeholder="Exam Type"
            isSearchable
            className="w-[150px] md:w-[180px] lg:w-[200px]"
          />

          <Select
            value={classFilter ? { value: classFilter, label: classFilter } : null}
            onChange={(e) => setClassFilter(e ? e.value : "")}
            options={classOptions}
            placeholder="Class"
            isSearchable
            className="w-[150px] md:w-[180px] lg:w-[200px]"
          />

          <Select
            value={sectionFilter ? { value: sectionFilter, label: sectionFilter } : null}
            onChange={(e) => setSectionFilter(e ? e.value : "")}
            options={sectionOptions}
            placeholder="Section"
            isSearchable
            className="w-[150px] md:w-[180px] lg:w-[200px]"
          />

          <Select
            value={studentIdFilter ? { value: studentIdFilter, label: studentIdFilter } : null}
            onChange={(e) => setStudentIdFilter(e ? e.value : "")}
            options={studentIdOptions}
            placeholder="Student ID"
            isSearchable
            className="w-[150px] md:w-[180px] lg:w-[200px]"
          />
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-4 lg:ml-auto">
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleBulkUpload}
            style={{ display: "none" }}
          />
          <button title="Upload CSV File" onClick={() => fileInputRef.current.click()}>
            <FaUpload className="text-green-600 text-xl cursor-pointer hover:text-green-700" />
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 text-black bg-white rounded hover:bg-gray-200"
            title="Add Result"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
          </button>

          <button title="Download Excel File" onClick={handleDownloadExcel}>
            <FaFileDownload className="text-blue-600 text-xl cursor-pointer hover:text-blue-700" />
          </button>
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg min-w-max">
          <thead className="bg-gray-200">
            <tr className="text-sm md:text-base">
              <th className="p-2 md:p-3 text-left border">Lang-1</th>
              <th className="p-2 md:p-3 text-left border">Lang-2</th>
              <th className="p-2 md:p-3 text-left border">English</th>
              <th className="p-2 md:p-3 text-left border">Maths</th>
              <th className="p-2 md:p-3 text-left border">Science</th>
              <th className="p-2 md:p-3 text-left border">Social</th>
              <th className="p-2 md:p-3 text-left border">Total</th>
              <th className="p-2 md:p-3 text-left border">%</th>
              <th className="p-2 md:p-3 text-left border">Grade</th>
              <th className="p-2 md:p-3 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data, index) => {
              const total =
                Number(data.lang1) +
                Number(data.lang2) +
                Number(data.english) +
                Number(data.maths) +
                Number(data.science) +
                Number(data.social);
              const percentage = (total / 6).toFixed(2);
              const grade =
                percentage >= 90
                  ? "A"
                  : percentage >= 75
                  ? "B"
                  : percentage >= 50
                  ? "C"
                  : "D";

              return (
                <tr key={index} className="border-b text-sm md:text-base">
                  <td className="p-2 md:p-3 border">{data.lang1}</td>
                  <td className="p-2 md:p-3 border">{data.lang2}</td>
                  <td className="p-2 md:p-3 border">{data.english}</td>
                  <td className="p-2 md:p-3 border">{data.maths}</td>
                  <td className="p-2 md:p-3 border">{data.science}</td>
                  <td className="p-2 md:p-3 border">{data.social}</td>
                  <td className="p-2 md:p-3 border">{total}</td>
                  <td className="p-2 md:p-3 border">{percentage}%</td>
                  <td className="p-2 md:p-3 border">{grade}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(index)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      {/* Pagination */}
      <div className="mt-4 items-center flex justify-between">
        <button
          className="px-4 py-2 mr-2 bg-gray-200 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // Prevent negative pages
          disabled={currentPage === 1}
        >
          Previous
        </button>
          
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          } // Prevent exceeding totalPages
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
          <div className="w-1/2 p-6 bg-white rounded-lg max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-2xl">
              {editIndex !== null ? "Edit Result" : "Add Result"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Student ID"
                value={modalData.studentId}
                onChange={(e) => {
                  if (/^[a-zA-Z0-9]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, studentId: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Student Name"
                value={modalData.studentName}
                onChange={(e) => {
                  if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, studentName: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Exam Type"
                value={modalData.examType}
                onChange={(e) => {
                  if (/^[a-zA-Z ]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, examType: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Class"
                value={modalData.class}
                onChange={(e) => {
                  if (/^[a-zA-Z0-9]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, class: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Section"
                value={modalData.section}
                onChange={(e) => {
                  if (/^[a-zA-Z]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, section: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Lang-1"
                value={modalData.lang1}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, lang1: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Lang-2"
                value={modalData.lang2}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, lang2: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="English"
                value={modalData.english}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, english: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Maths"
                value={modalData.maths}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, maths: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Science"
                value={modalData.science}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, science: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Social"
                value={modalData.social}
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setModalData({ ...modalData, social: e.target.value });
                  }
                }}
                className="p-2 border rounded"
              />
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                {editIndex !== null ? "Save Changes" : "Add Result"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 ml-2 text-white bg-red-500 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamResult;
