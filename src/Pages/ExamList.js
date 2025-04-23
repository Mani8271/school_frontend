// import React, { useState, useEffect, useRef } from "react";
// import { FaPlus, FaEdit, FaTrash, FaTimes, FaUpload, FaFileDownload } from "react-icons/fa";
// import * as XLSX from 'xlsx';
// import { useBranch } from "../Pages/Branches"; 
// import { useMemo } from "react";// Adjust the path if needed
// const branchData = {
//   "Main Branch": ["Class 1", "Class 2", "Class 3"],
//   "City Branch": ["Class 4", "Class 5"],
//   "Westside Branch": ["Class 6", "Class 7"],
// };

// const ExamList = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { selectedBranch } = useBranch(); 
//   const [modalData, setModalData] = useState({
//     class: "", section: "", day: "", examType: "", date: "", timeFrom: "", timeTo: "", subject: "",
//   });
//   const [timetableData, setTimetableData] = useState([
//     // Main Branch
//   { class: "Class 1", section: "A", examType: "Midterm", date: "2025-03-01", timeFrom: "10:00 AM", timeTo: "12:00 PM", subject: "Math" },
//   { class: "Class 2", section: "B", examType: "Final", date: "2025-04-01", timeFrom: "9:00 AM", timeTo: "11:00 AM", subject: "Science" },
//   { class: "Class 3", section: "A", examType: "Midterm", date: "2025-03-15", timeFrom: "11:00 AM", timeTo: "1:00 PM", subject: "History" },

//   // City Branch
//   { class: "Class 4", section: "A", examType: "Midterm", date: "2025-03-10", timeFrom: "8:00 AM", timeTo: "10:00 AM", subject: "Physics" },
//   { class: "Class 5", section: "B", examType: "Final", date: "2025-04-10", timeFrom: "12:00 PM", timeTo: "2:00 PM", subject: "Chemistry" },

//   // Westside Branch
//   { class: "Class 6", section: "A", examType: "Midterm", date: "2025-03-20", timeFrom: "1:00 PM", timeTo: "3:00 PM", subject: "Biology" },
//   { class: "Class 7", section: "B", examType: "Final", date: "2025-04-15", timeFrom: "10:30 AM", timeTo: "12:30 PM", subject: "Economics" },
//   ]);
//   const [classFilter, setClassFilter] = useState("");
//   const [sectionFilter, setSectionFilter] = useState("");
//   const [examTypeFilter, setExamTypeFilter] = useState("");
//   const [uniqueSections, setUniqueSections] = useState([]);
//   const [uniqueExamTypes, setUniqueExamTypes] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchPerformed, setSearchPerformed] = useState(false);
//   const [entriesCount, setEntriesCount] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const filteredClasses = useMemo(() => branchData[selectedBranch] || [], [selectedBranch]);
//   useEffect(() => {
//     // Step 1: Get data related to the selected branch
//     const branchSpecificData = timetableData.filter((data) =>
//       filteredClasses.includes(data.class)
//     );

//     // Step 2: Set table data without filtering at first
//     setFilteredData(branchSpecificData);
//     setCurrentPage(1);

//     // Step 3: Reset filters **only when the branch changes**
//     setClassFilter("");
//     setSectionFilter("");
//     setExamTypeFilter("");
//     setUniqueSections([]);
//     setUniqueExamTypes([]);
//   }, [selectedBranch, filteredClasses, classFilter, sectionFilter, examTypeFilter, timetableData, searchPerformed]);

//   const handleClassChange = (e) => {
//     const selectedClass = e.target.value;
//     setClassFilter(selectedClass);
//     setSectionFilter(""); // Reset section when class changes
//     setExamTypeFilter("");

//     const relatedSections = [...new Set(
//       timetableData.filter((data) => 
//         filteredClasses.includes(data.class) && data.class === selectedClass
//       ).map((data) => data.section)
//     )];

//     setUniqueSections(relatedSections);
//     setUniqueExamTypes([]);
//   };


//   const handleSectionChange = (e) => {
//     const selectedSection = e.target.value;
//     setSectionFilter(selectedSection);
//     setExamTypeFilter("");

//     const relatedExamTypes = [...new Set(
//       timetableData.filter((data) =>
//         data.class === classFilter && data.section === selectedSection
//       ).map((data) => data.examType)
//     )];

//     setUniqueExamTypes(relatedExamTypes);
//   };

//   const handleSearch = () => {
//     const branchSpecificData = timetableData.filter((data) =>
//       filteredClasses.includes(data.class) // Filter only for the selected branch
//     );

//     const filtered = branchSpecificData.filter((data) =>
//       (classFilter ? data.class === classFilter : true) &&
//       (sectionFilter ? data.section === sectionFilter : true) &&
//       (examTypeFilter ? data.examType === examTypeFilter : true)
//     );

//     setFilteredData(filtered);
//     setCurrentPage(1);
//   };

//   const handleEntriesChange = (e) => {
//     setEntriesCount(Number(e.target.value));
//     setCurrentPage(1); // Reset page to 1 when entries count changes
//   };

//   const paginatedData = filteredData.slice((currentPage - 1) * entriesCount, currentPage * entriesCount);
//   const totalPages = Math.ceil(filteredData.length / entriesCount);

//   const handleModalSubmit = () => {
//     if (modalData.examType && modalData.date) {
//       const index = timetableData.findIndex(
//         (data) => data.examType === modalData.examType && data.date === modalData.date
//       );

//       if (index !== -1) {
//         // Edit existing data
//         const updatedData = [...timetableData];
//         updatedData[index] = modalData;  // Update the existing row
//         setTimetableData(updatedData);
//       } else {
//         // Add new data
//         setTimetableData([...timetableData, modalData]);
//       }

//       setShowModal(false);  // Close modal
//       setModalData({
//         class: "", section: "", day: "", examType: "", date: "", timeFrom: "", timeTo: "", subject: "",
//       });
//     }
//   };

//   const handleDeleteClick = (data) => {
//     setTimetableData(timetableData.filter((item) => item.examType !== data.examType || item.date !== data.date));
//   };

//   const uniqueClasses = [...new Set(
//     timetableData
//       .filter((data) => branchData[selectedBranch]?.includes(data.class))
//       .map((data) => data.class)
//   )];
  
//   const fileInputRef = useRef(null);

//   const handleBulkUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);
//       setTimetableData([...timetableData, ...jsonData]);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleDownloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(timetableData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Exam Schedule");
//     XLSX.writeFile(workbook, "Exam_Schedule.xlsx");
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Exam List</h1>
//       </div>
//       {/* Show Entries Dropdown */}
//       <div className="flex items-center gap-2 mb-4">
//         <label className="text-sm font-medium text-gray-700">Show Entries:</label>
//         <select
//           value={entriesCount}
//           onChange={handleEntriesChange}
//           className="px-2 py-1 text-black bg-white border rounded w-[80px]"
//         >
//           {[5, 10, 15, 20].map((count) => (
//             <option key={count} value={count}>
//               {count}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Search Filters */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <select
//             value={classFilter}
//             onChange={handleClassChange}
//             className="px-3 py-2 text-black bg-white border rounded w-[200px]"
//           >
//             <option value="">Select Class</option>
//             {uniqueClasses.map((classItem, index) => (
//               <option key={index} value={classItem}>
//                 {classItem}
//               </option>
//             ))}
//           </select>

//           <select
//             value={sectionFilter}
//             onChange={handleSectionChange}
//             className="px-3 py-2 text-black bg-white border rounded w-[200px]"
//             disabled={!classFilter}
//           >
//             <option value="">Select Section</option>
//             {uniqueSections.map((sectionItem, index) => (
//               <option key={index} value={sectionItem}>
//                 {sectionItem}
//               </option>
//             ))}
//           </select>

//           <select
//             value={examTypeFilter}
//             onChange={(e) => setExamTypeFilter(e.target.value)}
//             className="px-3 py-2 text-black bg-white border rounded w-[200px]"
//             disabled={!sectionFilter}
//           >
//             <option value="">Select Exam Type</option>
//             {uniqueExamTypes.map((examTypeItem, index) => (
//               <option key={index} value={examTypeItem}>
//                 {examTypeItem}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handleSearch}
//             className="px-4 py-2 text-black bg-white rounded hover:bg-gray-200 w-[100px]"
//           >
//             Search
//           </button>
//         </div>

//         {/* Icons Section */}
//         <div className="flex items-center gap-4">
//           <input
//             type="file"
//             accept=".csv"
//             ref={fileInputRef}
//             onChange={handleBulkUpload}
//             style={{ display: "none" }}
//           />
//           <button title="Upload CSV File" onClick={() => fileInputRef.current.click()}>
//             <FaUpload className="text-green-600 text-xl cursor-pointer hover:text-green-700" />
//           </button>
//           <button title="Add a New Exam" onClick={() => setShowModal(true)}>
//             <FaPlus className="text-black text-xl cursor-pointer hover:text-gray-700" />
//           </button>
//           <button title="Download Exam List as CSV" onClick={handleDownloadExcel}>
//             <FaFileDownload className="text-blue-600 text-xl cursor-pointer hover:text-blue-700" />
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <table className="w-full bg-white border rounded-lg">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-3 text-left">Exam Type</th>
//             <th className="p-3 text-left">Subject</th>
//             <th className="p-3 text-left">Class</th>
//             <th className="p-3 text-left">Section</th>
//             <th className="p-3 text-left">Time From</th>
//             <th className="p-3 text-left">Time To</th>
//             <th className="p-3 text-left">Date</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((data, index) => (
//             <tr key={index} className="border-b">
//               <td className="p-3">{data.examType}</td>
//               <td className="p-3">{data.subject}</td>
//               <td className="p-3">{data.class}</td>
//               <td className="p-3">{data.section}</td>
//               <td className="p-3">{data.timeFrom}</td>
//               <td className="p-3">{data.timeTo}</td>
//               <td className="p-3">{data.date}</td>
//               <td className="flex gap-2 p-3">
//                 <button
//                   className="text-yellow-600"
//                   onClick={() => {
//                     setModalData(data);
//                     setShowModal(true);
//                   }}
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   className="text-red-600"
//                   onClick={() => handleDeleteClick(data)}
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={handlePrevPage}
//           className="px-3 py-1 mx-1 border rounded bg-blue-400 hover:bg-blue-500 text-white"
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <button
//           onClick={handleNextPage}
//           className="px-3 py-1 mx-1 border rounded bg-blue-400 hover:bg-blue-500 text-white"
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full p-6 overflow-hidden bg-white rounded shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2">
//             <div className="flex justify-between mb-4">
//               <h3 className="text-xl font-bold">Add Exam</h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-xl text-gray-600 hover:text-gray-800"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleModalSubmit();
//                 setModalData({
//                   class: "", section: "", day: "", examType: "", date: "", timeFrom: "", timeTo: "", subject: "",
//                 });
//               }}
//               className="grid grid-cols-1 gap-4 sm:grid-cols-2"
//             >
//               {["class", "section", "day", "examType", "date", "timeFrom", "timeTo", "subject"].map(
//                 (field, index) => (
//                   <div key={index} className="flex flex-col">
//                     <label className="mb-1 text-sm font-medium">
//                       {field.replace(/([A-Z])/g, " $1").toUpperCase()}
//                     </label>
//                     <input
//                       type={field === "date" ? "date" : "text"} // Date field will use date type
//                       placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
//                       value={modalData[field]}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         setModalData({ ...modalData, [field]: value });
//                       }}
//                       className="px-4 py-2 text-black border rounded"
//                     />
//                   </div>
//                 )
//               )}
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExamList;

import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaUpload, FaFileDownload } from "react-icons/fa";
import * as XLSX from 'xlsx';
import { useBranch } from "../Pages/Branches"; 
import { useMemo } from "react";// Adjust the path if needed
const branchData = {
  "Main Branch": ["Class 1", "Class 2", "Class 3"],
  "City Branch": ["Class 4", "Class 5"],
  "Westside Branch": ["Class 6", "Class 7"],
};

const ExamList = () => {
  const [showModal, setShowModal] = useState(false);
  const { selectedBranch } = useBranch(); 
  const [modalData, setModalData] = useState({
    class: "", section: "", day: "", examType: "", date: "", timeFrom: "", timeTo: "", subject: "",
  });
  const [timetableData, setTimetableData] = useState([
    // Main Branch
  { class: "Class 1", section: "A", examType: "Midterm", date: "2025-03-01", timeFrom: "10:00 AM", timeTo: "12:00 PM", subject: "Math" },
  { class: "Class 2", section: "B", examType: "Final", date: "2025-04-01", timeFrom: "9:00 AM", timeTo: "11:00 AM", subject: "Science" },
  { class: "Class 3", section: "A", examType: "Midterm", date: "2025-03-15", timeFrom: "11:00 AM", timeTo: "1:00 PM", subject: "History" },

  // City Branch
  { class: "Class 4", section: "A", examType: "Midterm", date: "2025-03-10", timeFrom: "8:00 AM", timeTo: "10:00 AM", subject: "Physics" },
  { class: "Class 5", section: "B", examType: "Final", date: "2025-04-10", timeFrom: "12:00 PM", timeTo: "2:00 PM", subject: "Chemistry" },

  // Westside Branch
  { class: "Class 6", section: "A", examType: "Midterm", date: "2025-03-20", timeFrom: "1:00 PM", timeTo: "3:00 PM", subject: "Biology" },
  { class: "Class 7", section: "B", examType: "Final", date: "2025-04-15", timeFrom: "10:30 AM", timeTo: "12:30 PM", subject: "Economics" },
  ]);
  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [examTypeFilter, setExamTypeFilter] = useState("");
  const [uniqueSections, setUniqueSections] = useState([]);
  const [uniqueExamTypes, setUniqueExamTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [entriesCount, setEntriesCount] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredClasses = useMemo(() => branchData[selectedBranch] || [], [selectedBranch]);
  useEffect(() => {
    const branchSpecificData = timetableData.filter((data) =>
      filteredClasses.includes(data.class)
    );
  
    // Only reset filters when the branch changes
    if (!searchPerformed) {
      setClassFilter("");
      setSectionFilter("");
      setExamTypeFilter("");
      setUniqueSections([]);
      setUniqueExamTypes([]);
    }
  
    setFilteredData(branchSpecificData);
    setCurrentPage(1);
  }, [selectedBranch, filteredClasses, timetableData,searchPerformed]);
  
  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setClassFilter(selectedClass);
    setSectionFilter(""); // Reset section when class changes
    setExamTypeFilter("");

    const relatedSections = [...new Set(
      timetableData.filter((data) => 
        filteredClasses.includes(data.class) && data.class === selectedClass
      ).map((data) => data.section)
    )];

    setUniqueSections(relatedSections);
    setUniqueExamTypes([]);
  };


  const handleSectionChange = (e) => {
    const selectedSection = e.target.value;
    setSectionFilter(selectedSection);
  
    if (classFilter) {
      setUniqueExamTypes([...new Set(
        timetableData.filter((data) =>
          data.class === classFilter && data.section === selectedSection
        ).map((data) => data.examType)
      )]);
    }
  };
  
  const handleSearch = () => {
    setSearchPerformed(true); // Mark search as performed
    setFilteredData(timetableData.filter((data) =>
      filteredClasses.includes(data.class) &&
      (classFilter ? data.class === classFilter : true) &&
      (sectionFilter ? data.section === sectionFilter : true) &&
      (examTypeFilter ? data.examType === examTypeFilter : true)
    ));
    setCurrentPage(1);
  };

  const handleEntriesChange = (e) => {
    setEntriesCount(Number(e.target.value));
    setCurrentPage(1); // Reset page to 1 when entries count changes
  };

  const paginatedData = filteredData.slice((currentPage - 1) * entriesCount, currentPage * entriesCount);
  const totalPages = Math.ceil(filteredData.length / entriesCount);

  const handleModalSubmit = () => {
    if (modalData.examType && modalData.date) {
      const index = timetableData.findIndex(
        (data) => data.examType === modalData.examType && data.date === modalData.date
      );

      if (index !== -1) {
        // Edit existing data
        const updatedData = [...timetableData];
        updatedData[index] = modalData;  // Update the existing row
        setTimetableData(updatedData);
      } else {
        // Add new data
        setTimetableData([...timetableData, modalData]);
      }

      setShowModal(false);  // Close modal
      setModalData({
        class: "", section: "", day: "", examType: "", date: "", timeFrom: "", timeTo: "", subject: "",
      });
    }
  };

  // const handleDeleteClick = (data) => {
  //   setTimetableData(timetableData.filter((item) => item.examType !== data.examType || item.date !== data.date));
  // };

  const handleDeleteClick = (data) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
    if (isConfirmed) {
      setTimetableData(timetableData.filter((item) => item.examType !== data.examType || item.date !== data.date));
    }
  };  

  const uniqueClasses = [...new Set(
    timetableData
      .filter((data) => branchData[selectedBranch]?.includes(data.class))
      .map((data) => data.class)
  )];
  
  const fileInputRef = useRef(null);

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setTimetableData([...timetableData, ...jsonData]);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(timetableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exam Schedule");
    XLSX.writeFile(workbook, "Exam_Schedule.xlsx");
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Exam List</h1>
      </div>
      {/* Show Entries Dropdown */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm font-medium text-gray-700">Show Entries:</label>
        <select
          value={entriesCount}
          onChange={handleEntriesChange}
          className="px-2 py-1 text-black bg-white border rounded w-[50px]"
        >
          {[5, 10, 15, 20].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      {/* Search Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:flex-nowrap">
        {/* Search Dropdowns and Button */}
        <div className="flex flex-wrap items-center gap-2 flex-grow">
          <select
            value={classFilter}
            onChange={handleClassChange}
            className="px-3 py-2 text-black bg-white border rounded w-[100px] lg:w-[150px]"
          >
            <option value="">Select Class</option>
            {uniqueClasses.map((classItem, index) => (
              <option key={index} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>

          <select
            value={sectionFilter}
            onChange={handleSectionChange}
            className="px-3 py-2 text-black bg-white border rounded w-[100px] lg:w-[150px]"
            disabled={!classFilter}
          >
            <option value="">Select Section</option>
            {uniqueSections.map((sectionItem, index) => (
              <option key={index} value={sectionItem}>
                {sectionItem}
              </option>
            ))}
          </select>

          <select
            value={examTypeFilter}
            onChange={(e) => setExamTypeFilter(e.target.value)}
            className="px-3 py-2 text-black bg-white border rounded w-[100px] lg:w-[150px]"
            disabled={!sectionFilter}
          >
            <option value="">Select Exam Type</option>
            {uniqueExamTypes.map((examTypeItem, index) => (
              <option key={index} value={examTypeItem}>
                {examTypeItem}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="px-4 py-2 text-black bg-gray-400 rounded hover:bg-gray-300 w-[100px] lg:w-[120px]"
          >
            Search
          </button>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-4">
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
          <button title="Add a New Exam" onClick={() => setShowModal(true)}>
            <FaPlus className="text-black text-xl cursor-pointer hover:text-gray-700" />
          </button>
          <button title="Download Exam List as CSV" onClick={handleDownloadExcel}>
            <FaFileDownload className="text-blue-600 text-xl cursor-pointer hover:text-blue-700" />
          </button>
        </div>
      </div>



      {/* Table */}
      <table className="w-full bg-white border rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Exam Type</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Section</th>
            <th className="p-3 text-left">Time From</th>
            <th className="p-3 text-left">Time To</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((data, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{data.examType}</td>
              <td className="p-3">{data.subject}</td>
              <td className="p-3">{data.class}</td>
              <td className="p-3">{data.section}</td>
              <td className="p-3">{data.timeFrom}</td>
              <td className="p-3">{data.timeTo}</td>
              <td className="p-3">{data.date}</td>
              <td className="flex gap-2 p-3">
                <button
                  className="text-yellow-600"
                  onClick={() => {
                    setModalData(data);
                    setShowModal(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDeleteClick(data)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-5 space-x-4">
        <button
          onClick={handlePrevPage}
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

        <button
          onClick={handleNextPage}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-h-[90vh] overflow-y-auto p-6 overflow-hidden bg-white rounded shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Add Exam</h3>
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
                setModalData({
                  class: "", section: "", day: "", examType: "", date: "", timeFrom: "", timeTo: "", subject: "",
                });
              }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {["class", "section", "day", "examType", "date", "timeFrom", "timeTo", "subject"].map(
                (field, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="mb-1 text-sm font-medium">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <input
                      type={field === "date" ? "date" : "text"} // Date field will use date type
                      placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                      value={modalData[field]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setModalData({ ...modalData, [field]: value });
                      }}
                      className="px-4 py-2 text-black border rounded"
                    />
                  </div>
                )
              )}
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

export default ExamList;