import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import { FaEdit, FaTrash, FaDownload, FaPrint, FaTimes } from "react-icons/fa";
import { useBranch } from "../Pages/Branches"; // Import the branch hook
import { useDispatch, useSelector } from "react-redux";
import { getAllFeesInitiate } from "../redux/actions/fees/getAllfeesdataAction";
import { AddFeesInitiate } from "../redux/actions/fees/addFeesAction";
import { UpdateFeesInitiate } from "../redux/actions/fees/updateFeesAction";
import { DeleteFeesInitiate } from "../redux/actions/fees/deleteFeesAction";

const InvoicePage = () => {
  const dispatch = useDispatch();
  const { data: allfeesdata = [] } = useSelector((state) => state.getallfees.fees || {});
  useEffect(() => {
    dispatch(getAllFeesInitiate());
  }, []);
  console.log("i am all allfeesdata", allfeesdata);
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [status, setStatus] = useState("");
  const [tuitionFee, setTuitionFee] = useState("");
  const [transportFee, setTransportFee] = useState("");
  const [stationaryFee, setStationaryFee] = useState("");
  const [admissionFee, setAdmissionFee] = useState("");
  const [otherFees, setOtherFees] = useState("");
  const [_id, setid] = useState('')
  const [storedReceipts, setStoredReceipts] = useState([
    {
      admissionNumber: "12345",
      studentName: "John Doe",
      className: "10",
      section: "A",
      tuitionFee: "20000",
      transportFee: "1500",
      stationaryFee: "320",
      admissionFee: "1200",
      otherFees: "0",
      totalFee: "23020",
      branch: "Main Branch",  // ✅ Added branch field
      createdAt: "2025-01-29 12:00",
    },
    {
      admissionNumber: "67890",
      studentName: "Jane Smith",
      className: "9",
      section: "B",
      tuitionFee: "20000",
      transportFee: "1500",
      stationaryFee: "300",
      admissionFee: "1200",
      otherFees: "0",
      totalFee: "23000",
      branch: "City Branch",  // ✅ Added branch field
      createdAt: "2025-01-28 12:00",
    },
    {
      admissionNumber: "54321",
      studentName: "Michael Brown",
      className: "8",
      section: "C",
      tuitionFee: "18000",
      transportFee: "1200",
      stationaryFee: "250",
      admissionFee: "1000",
      otherFees: "200",
      totalFee: "20650",
      branch: "Westside Branch",  // ✅ Added branch field
      createdAt: "2025-01-27 11:30",
    },
  ]);

  const [isFormValid, setIsFormValid] = useState(true);
  // const [receipt, setReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null); // To track the index of the edited receipt
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalFee =
    (parseFloat(tuitionFee) || 0) +
    (parseFloat(transportFee) || 0) +
    (parseFloat(stationaryFee) || 0) +
    (parseFloat(admissionFee) || 0) +
    (parseFloat(otherFees) || 0);

  const validateForm = () => {
    return (
      admissionNumber &&
      studentName &&
      className &&
      section &&
      tuitionFee &&
      transportFee &&
      stationaryFee &&
      admissionFee &&
      otherFees
    );
  };

  const handleGenerateInvoice = () => {
    if (!validateForm()) {
      setIsFormValid(false);
      return;
    }

    const newReceipt = {
      admissionNumber,
      studentName,
      className,
      section,
      tuitionFee,
      transportFee,
      stationaryFee,
      admissionFee,
      otherFees,
      totalFee,
      branch: selectedBranch,  // ✅ Assign the selected branch
      createdAt: new Date().toLocaleString(),
    };
    // setReceipt(newReceipt);
    // setStoredReceipts([...storedReceipts, newReceipt]);
    // resetForm();
    // setShowModal(false);

    if (currentIndex !== null) {
      // If editing an existing receipt, update it
      const formdata = {
        _id: _id,
        admissionNumber: admissionNumber,
        admissionFee: admissionFee,
        studentName: studentName,
        class: className,
        section: section,
        tutionFee: Number(tuitionFee),
        transportFee: Number(transportFee),
        stationaryFee: Number(stationaryFee),
        otherFees: Number(otherFees),
        status: status,
      }
      // setStoredReceipts((prevReceipts) => {
      //   const updatedReceipts = [...prevReceipts];
      //   updatedReceipts[currentIndex] = newReceipt; // Update the receipt at the correct index
      //   return updatedReceipts;
      // });
      dispatch(UpdateFeesInitiate(formdata, (success) => {
        if (success) {
          console.log('Delete successful, fetching updated teacher list.');
          dispatch(getAllFeesInitiate());
          resetForm();
          setShowModal(false);
        } else {
          console.error('Failed to update student.');
        }
      }))

    } else {
      // If creating a new invoice, add it to the list
      // setStoredReceipts((prevReceipts) => [...prevReceipts, newReceipt]);
      const formdata = {
        admissionNumber: admissionNumber,
        admissionFee: admissionFee,
        studentName: studentName,
        class: className,
        section: section,
        tutionFee: Number(tuitionFee),
        transportFee: Number(transportFee),
        stationaryFee: Number(stationaryFee),
        otherFees: Number(otherFees),
        status: status,
      }
      dispatch(AddFeesInitiate(formdata, (success) => {
        if (success) {
          console.log('add successful, fetching add student list.');
          dispatch(getAllFeesInitiate());
          resetForm();
          setShowModal(false);

        } else {
          console.error('Failed to add teachet.');
        }
      }))
    }

    // Close the modal after saving
  };

  const resetForm = () => {
    setAdmissionNumber("");
    setStudentName("");
    setClassName("");
    setSection("");
    setTuitionFee("");
    setTransportFee("");
    setStationaryFee("");
    setAdmissionFee("");
    setOtherFees("");
    setIsFormValid(true);
    setCurrentIndex(null); // Reset the currentIndex after saving
  };

  const handleEditReceipt = (index) => {
    const receipt = allfeesdata?.find((item) => item?._id === index);
    console.log(receipt)
    setAdmissionNumber(receipt?.admissionNumber);
    setStudentName(receipt.studentName);
    setClassName(receipt.class);
    setSection(receipt.section);
    setTuitionFee(receipt.tutionFee);
    setTransportFee(receipt.transportFee);
    setStationaryFee(receipt.stationaryFee);
    setAdmissionFee(receipt.admissionFee);
    setOtherFees(receipt.otherFees);
    setStatus(receipt.status)
    setid(receipt?._id)
    // const updatedReceipts = storedReceipts.filter((_, i) => i !== index);
    // setStoredReceipts(updatedReceipts);
    setCurrentIndex(index);
    setShowModal(true); // Open the modal after setting the form
  };


  const handleDeleteReceipt = (index) => {
    // const updatedReceipts = storedReceipts.filter((_, i) => i !== index);
    // setStoredReceipts(updatedReceipts);
    const receipt = allfeesdata?.find((item) => item?._id === index);
    dispatch(
      DeleteFeesInitiate({ _id: receipt._id }, (success) => {
        if (success) {
          console.log('Delete successful, fetching updated student list.');
          dispatch(getAllFeesInitiate());
          // closeDeleteModal()
        } else {
          console.error('Failed to delete student.');
        }
      })
    );
  };
  const { selectedBranch } = useBranch(); // Get the selected branch
  const branchFilteredReceipts = storedReceipts.filter((receipt) => receipt.branch === selectedBranch);


  const handleDownloadReceipt = (receipt) => {
    const doc = new jsPDF();

    // Add title and basic information
    doc.setFontSize(20);
    doc.text("Invoice Receipt", 10, 10);

    doc.setFontSize(12);
    doc.text(`Date & Time: ${receipt.createdAt}`, 10, 20);
    doc.text(`Admission Number: ${receipt.admissionNumber}`, 10, 30);
    doc.text(`Student Name: ${receipt.studentName}`, 10, 40);
    doc.text(`Class: ${receipt.className}`, 10, 50);
    doc.text(`Section: ${receipt.section}`, 10, 60);

    // Fee details
    const feeDetails = [
      ["Tuition Fee", `Rs ${receipt.tuitionFee}`],
      ["Transport Fee", `Rs ${receipt.transportFee}`],
      ["Stationary Fee", `Rs ${receipt.stationaryFee}`],
      ["Admission Fee", `Rs ${receipt.admissionFee}`],
      ["Other Fees", `Rs ${receipt.otherFees}`],
      ["Total Fee", `Rs ${receipt.totalFee}`],
    ];

    doc.text("Fee Description", 10, 80);
    doc.text("Amount", 100, 80);

    let yOffset = 90;
    feeDetails.forEach(([description, amount]) => {
      doc.text(description, 10, yOffset);
      doc.text(amount, 100, yOffset);
      yOffset += 10;
    });

    // Trigger the download
    doc.save("receipt.pdf");
  };

  const handlePrintReceipt = (receipt) => {
    const printWindow = window.open("", "PRINT", "height=600,width=800");
    printWindow.document.write('<html><head><title>Receipt</title></head><body>');
    printWindow.document.write('<h1>Invoice Receipt</h1>');
    printWindow.document.write(`<p><strong>Date & Time:</strong> ${receipt.createdAt}</p>`);
    printWindow.document.write(`<p><strong>Admission Number:</strong> ${receipt.admissionNumber}</p>`);
    printWindow.document.write(`<p><strong>Student Name:</strong> ${receipt.studentName}</p>`);
    printWindow.document.write(`<p><strong>Class:</strong> ${receipt.className}</p>`);
    printWindow.document.write(`<p><strong>Section:</strong> ${receipt.section}</p>`);
    printWindow.document.write('<h2>Fee Details:</h2>');
    printWindow.document.write(`<ul>
      <li>Tuition Fee: ₹${receipt.tuitionFee}</li>
      <li>Transport Fee: ₹${receipt.transportFee}</li>
      <li>Stationary Fee: ₹${receipt.stationaryFee}</li>
      <li>Admission Fee: ₹${receipt.admissionFee}</li>
      <li>Other Fees: ₹${receipt.otherFees}</li>
      <li><strong>Total Fee:</strong> ₹${receipt.totalFee}</li>
    </ul>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const formRef = useRef(null);

  // Close modal when pressing ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setShowModal]);

  // Enable arrow key navigation
  useEffect(() => {
    const handleKeyNavigation = (e) => {
      const inputs = formRef.current?.querySelectorAll("input, select");
      if (!inputs) return;

      const index = [...inputs].indexOf(document.activeElement);
      if (index === -1) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
          break;
        case "ArrowUp":
        case "ArrowLeft":
          if (index > 0) {
            inputs[index - 1].focus();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyNavigation);
    return () => document.removeEventListener("keydown", handleKeyNavigation);
  }, []);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  const filteredReceipts = allfeesdata.filter((receipt) =>
    receipt.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.admissionNumber.toString().includes(searchTerm)
  );

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  // Calculate total pages
  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReceipts = filteredReceipts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 mx-auto min-h-screen bg-white w-full max-w-7xl overflow-auto">
      <h1 className="mb-4 text-3xl font-semibold text-center text-gray-800">Student Invoice</h1>

      <div className="flex flex-wrap gap-4 justify-center md:justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by student name or admission number"
          className="w-full max-w-md sm:w-1/2 md:w-1/3 p-2 border border-gray-300 rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="text-blue-600 text-3xl sm:text-4xl p-2"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          +
        </button>
      </div>

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto bg-white shadow-md">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[768px] md:min-w-[900px] lg:min-w-[1024px] xl:min-w-[1200px] border border-gray-300">
            <thead className="sticky top-0 z-10 bg-gray-200 border-b">
              <tr className="text-sm md:text-base">
                <th className="px-3 py-2 border whitespace-nowrap">Admission No.</th>
                <th className="px-3 py-2 border whitespace-nowrap">Student Name</th>
                <th className="px-3 py-2 border whitespace-nowrap">Class</th>
                <th className="px-3 py-2 border whitespace-nowrap">Tuition Fee</th>
                <th className="px-3 py-2 border whitespace-nowrap">Transport Fee</th>
                <th className="px-3 py-2 border whitespace-nowrap">Stationary Fee</th>
                <th className="px-3 py-2 border whitespace-nowrap">Admission Fee</th>
                <th className="px-3 py-2 border whitespace-nowrap">Other Fee</th>
                <th className="px-3 py-2 border whitespace-nowrap">Total Fee</th>
                <th className="px-3 py-2 border whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!searchTerm ? allfeesdata.length > 0 ? (
                allfeesdata.map((receipt, index) => (
                  <tr key={index} className="text-sm md:text-base">
                    <td className="px-4 py-2 border">{receipt.admissionNumber}</td>
                    <td className="px-4 py-2 border">{receipt.studentName}</td>
                    <td className="px-4 py-2 border">{receipt.class}</td>
                    <td className="px-4 py-2 border">{receipt.tutionFee}</td>
                    <td className="px-4 py-2 border">{receipt.transportFee}</td>
                    <td className="px-4 py-2 border">{receipt.stationaryFee}</td>
                    <td className="px-4 py-2 border">{receipt.admissionFee}</td>
                    <td className="px-4 py-2 border">{receipt.otherFees}</td>
                    <td className="px-4 py-2 border">{receipt.admissionFee + receipt.otherFees + receipt.stationaryFee + receipt.transportFee + receipt.tutionFee}</td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex gap-3 justify-center items-center space-x-0">
                        <FaEdit onClick={() => handleEditReceipt(receipt?._id)} className="text-blue-500 cursor-pointer" />
                        <FaTrash
                          onClick={() => window.confirm("Are you sure you want to delete this receipt?") && handleDeleteReceipt(receipt?._id)}
                          className="text-red-500 cursor-pointer"
                        />
                        <FaDownload onClick={() => handleDownloadReceipt(receipt)} className="text-black cursor-pointer" />
                        <FaPrint onClick={() => handlePrintReceipt(receipt)} className="text-black cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-500">
                    <p>No invoices found.</p>
                    <p className="text-sm text-gray-400">Add some receipts to get started.</p>
                  </td>
                </tr>
              ) : null}
              {searchTerm ? filteredReceipts.length > 0 ? (
                filteredReceipts.map((receipt, index) => (
                  <tr key={index} className="text-sm md:text-base">
                    <td className="px-4 py-2 border">{receipt.admissionNumber}</td>
                    <td className="px-4 py-2 border">{receipt.studentName}</td>
                    <td className="px-4 py-2 border">{receipt.class}</td>
                    <td className="px-4 py-2 border">{receipt.tutionFee}</td>
                    <td className="px-4 py-2 border">{receipt.transportFee}</td>
                    <td className="px-4 py-2 border">{receipt.stationaryFee}</td>
                    <td className="px-4 py-2 border">{receipt.admissionFee}</td>
                    <td className="px-4 py-2 border">{receipt.otherFees}</td>
                    <td className="px-4 py-2 border">{receipt.admissionFee + receipt.otherFees + receipt.stationaryFee + receipt.transportFee + receipt.tutionFee}</td>
                    <td className="px-4 py-2 border text-center">
                      <div className="flex gap-3 justify-center items-center space-x-0">
                        <FaEdit onClick={() => handleEditReceipt(receipt?._id)} className="text-blue-500 cursor-pointer" />
                        <FaTrash
                          onClick={() => window.confirm("Are you sure you want to delete this receipt?") && handleDeleteReceipt(receipt?._id)}
                          className="text-red-500 cursor-pointer"
                        />
                        <FaDownload onClick={() => handleDownloadReceipt(receipt)} className="text-black cursor-pointer" />
                        <FaPrint onClick={() => handlePrintReceipt(receipt)} className="text-black cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-500">
                    <p>No invoices found.</p>
                    <p className="text-sm text-gray-400">Add some receipts to get started.</p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>


      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-between items-center mt-4 gap-2 text-sm sm:text-base">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
        >
          Previous
        </button>

        <span className="font-semibold text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
        >
          Next
        </button>
      </div>


      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white p-6 rounded-lg w-full max-w-3xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-xl text-gray-600"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <h2 className="mb-4 text-2xl font-semibold text-center">
              Generate Invoice
            </h2>
            <form className="space-y-4" ref={formRef}>
              <div className="flex gap-4">
                <div className="w-full sm:w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Admission Number</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Admission Number"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Student Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Student Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Class</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Class"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Section</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select Section</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Tuition Fee</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Tuition Fee"
                    value={tuitionFee}
                    onChange={(e) => setTuitionFee(e.target.value)}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Transport Fee</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Transport Fee"
                    value={transportFee}
                    onChange={(e) => setTransportFee(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Stationary Fee</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Stationary Fee"
                    value={stationaryFee}
                    onChange={(e) => setStationaryFee(e.target.value)}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Admission Fee</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Admission Fee"
                    value={admissionFee}
                    onChange={(e) => setAdmissionFee(e.target.value)}
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">Other Fees</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Other Fees"
                    value={otherFees}
                    onChange={(e) => setOtherFees(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="w-full p-2 bg-blue-500 text-white rounded-md"
                  onClick={handleGenerateInvoice}
                >
                  Generate Invoice
                </button>
              </div>
            </form>
            {!isFormValid && (
              <p className="mt-2 text-center text-red-500">
                Please fill out all fields.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;