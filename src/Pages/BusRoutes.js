import React, { useEffect, useState } from "react";
import { TextField, Button, Tooltip, Modal, Box, IconButton } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useBranch } from "../Pages/Branches";
import { useDispatch, useSelector } from "react-redux";
import { AddBusrouteInitiate } from "../redux/actions/schoolbus/busroute/addbusrouteAction";
import { getAllBusrouteInitiate } from "../redux/actions/schoolbus/busroute/getallbusrouteAction";
import { UpdateBusrouteInitiate } from "../redux/actions/schoolbus/busroute/updatebusrouteAction";
import { DeleteBusrouteInitiate } from "../redux/actions/schoolbus/busroute/deletebusrouteAction";


const BusRoutes = () => {
  const dispatch = useDispatch();
  const { data: allbusesroutes = [] } = useSelector((state) => state.getallbusroute.busroute || {});
  useEffect(() => {
    dispatch(getAllBusrouteInitiate());
  }, []);
  console.log("i am all allbusesroutes", allbusesroutes);
  const [openModal, setOpenModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track the index of the row being edited
  const [formData, setFormData] = useState({
    _id: "",
    route: "",
    busAssigned: "",
    driver: "",
    conductor: "",
    conductorContact: "",
    busCapacity: "",
    students: "",
    driverContact: ""
  });
  const { selectedBranch } = useBranch();

  const [tableData, setTableData] = useState([
    { branch: "Main Branch", route: "Route 1", busAssigned: "Bus 101", driver: "John Doe", conductor: "Alice", conductorContact: "1234567890", busCapacity: "50", students: "45" },
    { branch: "Main Branch", route: "Route 2", busAssigned: "Bus 102", driver: "Jane Smith", conductor: "Bob", conductorContact: "9876543210", busCapacity: "60", students: "55" },
    { branch: "City Branch", route: "Route 3", busAssigned: "Bus 103", driver: "Michael Johnson", conductor: "Charlie", conductorContact: "1231231234", busCapacity: "40", students: "35" },
    { branch: "City Branch", route: "Route 4", busAssigned: "Bus 104", driver: "Sara Lee", conductor: "David", conductorContact: "4564564567", busCapacity: "50", students: "48" },
    { branch: "Westside Branch", route: "Route 5", busAssigned: "Bus 105", driver: "Tom Clark", conductor: "Eve", conductorContact: "3213213210", busCapacity: "55", students: "50" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [entriesCount, setEntriesCount] = useState(5); // Rows per page

  const branchSpecificData = tableData.filter((item) => item.branch === selectedBranch);

  // const filteredData = branchSpecificData.filter((item) =>
  //   Object.values(item)
  //     .join(" ")
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase())
  // );

  const filteredData = allbusesroutes?.filter((bus) => {
    const lowercasedQuery = searchQuery?.toLowerCase();
    return (
      bus.route.toLowerCase().includes(lowercasedQuery) ||
      bus.busAssigned.toLowerCase().includes(lowercasedQuery) ||
      bus._id.toLowerCase().includes(lowercasedQuery) ||
      bus.driver.toLowerCase().includes(lowercasedQuery) ||
      bus.conductor.toLowerCase().includes(lowercasedQuery) ||
      bus.conductorContact.toLowerCase().includes(lowercasedQuery) ||
      bus.busCapacity.toLowerCase().includes(lowercasedQuery) ||
      bus.students.toLowerCase().includes(lowercasedQuery)
    );
  });


  const totalPages = Math.ceil(allbusesroutes.length / entriesCount);
  const currentData = filteredData.slice((currentPage - 1) * entriesCount, currentPage * entriesCount);


  const handleEntriesChange = (e) => {
    setEntriesCount(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when entries per page change
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      route: "",
      busAssigned: "",
      driver: "",
      conductor: "",
      conductorContact: "",
      busCapacity: "",
      students: "",
    });
    setEditIndex(null); // Reset edit index
  };

  // Form change handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update data in the table
  const handleSave = () => {
    if (editIndex !== null) {
      // // Update existing row
      // const updatedData = [...tableData];
      // updatedData[editIndex] = formData;
      // setTableData(updatedData);
      dispatch(UpdateBusrouteInitiate(formData, (success) => {
        if (success) {
          console.log('Delete successful, fetching updated teacher list.');
          dispatch(getAllBusrouteInitiate());
          handleCloseModal();
        } else {
          console.error('Failed to update student.');
        }
      }))
    } else {
      // Add new row
      // setTableData([...tableData, formData]);
      const formdata = {
        busAssigned: formData?.busAssigned,
        busCapacity: formData?.busCapacity,
        conductor: formData?.conductor,
        conductorContact: formData?.conductorContact,
        driver: formData?.driver,
        driverContact: formData?.driverContact,
        route: formData?.route,
        students: formData?.students,
      }
      dispatch(AddBusrouteInitiate(formdata, (success) => {
        if (success) {
          console.log('add successful, fetching add student list.');
          dispatch(getAllBusrouteInitiate());
          handleCloseModal();
        } else {
          console.error('Failed to add teachet.');
        }
      }))
    }
  };

  // Open modal for editing with prefilled data
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(allbusesroutes?.find((item) => item?._id === index));
    handleOpenModal();
  };

  // Delete a row from the table
  // const handleDelete = (index) => {
  //   const updatedData = tableData.filter((_, i) => i !== index);
  //   setTableData(updatedData);
  // };

  const handleDelete = (index) => {
    // Check if tableData exists and has entries
    if (!tableData || tableData.length === 0) {
      alert("No data available to delete.");
      return;
    }

    // Ensure the index is valid
    if (index < 0 || index >= tableData.length) {
      alert("Invalid row selected.");
      return;
    }

    // Ask for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this row?");
    if (!confirmDelete) return;

    const id = allbusesroutes?.find((item) => item?._id === index)
    if (confirmDelete) {
      if (id) {
        dispatch(
          DeleteBusrouteInitiate({ _id: id }, (success) => {
            if (success) {
              console.log('Delete successful, fetching updated student list.');
              dispatch(getAllBusrouteInitiate());
            } else {
              console.error('Failed to delete student.');
            }
          })
        );
      }
    }
  };


  // Handle Previous and Next Page Navigation
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
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Bus Route</h1>
        <Tooltip title="Add New Route">
          <Button
            color="black"
            startIcon={<Add style={{ fontSize: "34px", marginRight: "8px" }} />}
            onClick={handleOpenModal}
            className="w-full sm:w-auto flex justify-center"
          >
          </Button>
        </Tooltip>
      </div>


      {/* Search Bar */}
      <div className="flex items-center justify-between mb-4">
        <TextField
          variant="outlined"
          placeholder="Search by route, bus, or driver..."
          size="small"
          className="w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md">
        <div className="max-w-full overflow-auto">
          <table className="w-full min-w-[900px] border border-collapse border-gray-200 table-auto">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                {["Route", "Bus Assigned", "Driver", "Conductor", "Conductor Contact", "Bus Capacity", "Students", "Actions"].map((heading, index) => (
                  <th key={index} className="px-4 py-2 border border-gray-300 text-sm sm:text-base whitespace-nowrap">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!searchQuery ? allbusesroutes.length > 0 ? (
                allbusesroutes.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">{row.route}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.busAssigned}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.driver}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.conductor}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.conductorContact}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.busCapacity}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.students}</td>
                    <td className="px-4 py-2 text-center border border-gray-300 whitespace-nowrap">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEdit(row?._id)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(row?._id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center border border-gray-300" colSpan="8">
                    No data found.
                  </td>
                </tr>
              ) : null}

              {searchQuery ? filteredData.length > 0 ? (
                 filteredData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-300">{row.route}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.busAssigned}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.driver}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.conductor}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.conductorContact}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.busCapacity}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.students}</td>
                    <td className="px-4 py-2 text-center border border-gray-300 whitespace-nowrap">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEdit(row?._id)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(row?._id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="px-4 py-3 text-center text-gray-500">
                    No Bus Routes found
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 border transition ${currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
            : "text-gray-900 border-gray-400 hover:bg-gray-100"
            }`}
        >
          Previous
        </Button>

        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border transition ${currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed bg-gray-100"
            : "text-gray-900 border-gray-400 hover:bg-gray-100"
            }`}
        >
          Next
        </Button>
      </div>

      {/* Modal for Adding/Editing Route */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="absolute w-3/5 p-6 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2">
          <h2 className="mb-4 text-xl font-bold">
            {editIndex !== null ? "Edit Route" : "Add New Route"}
          </h2>
          <form className="grid grid-cols-2 gap-4">
            <TextField
              label="Route"
              name="route"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.route}
              onChange={handleInputChange}
            />
            <TextField
              label="Bus Assigned"
              name="busAssigned"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.busAssigned}
              onChange={handleInputChange}
            />
            <TextField
              label="Driver"
              name="driver"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.driver}
              onChange={handleInputChange}
            />
            <TextField
              label="Conductor"
              name="conductor"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.conductor}
              onChange={handleInputChange}
            />
            <TextField
              label="Conductor Contact"
              name="conductorContact"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.conductorContact}
              onChange={handleInputChange}
            />
            <TextField
              label="Driver Contact"
              name="driverContact"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.driverContact}
              onChange={handleInputChange}
            />
            <TextField
              label="Bus Capacity"
              name="busCapacity"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.busCapacity}
              onChange={handleInputChange}
            />
            <TextField
              label="Students"
              name="students"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.students}
              onChange={handleInputChange}
            />
          </form>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="contained" color="primary" onClick={handleSave}>
              {editIndex !== null ? "Update" : "Save"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BusRoutes;
