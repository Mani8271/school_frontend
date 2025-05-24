import React, { useEffect, useState } from "react";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useBranch } from "../Pages/Branches"; // Import branch context
import { useDispatch, useSelector } from "react-redux";
import { getAllBusstaffInitiate } from "../redux/actions/schoolbus/busstaff/getallbusstaffAction";
import { AddBusstaffInitiate } from "../redux/actions/schoolbus/busstaff/addbusstaffAction";
import { UpdateBusstaffInitiate } from "../redux/actions/schoolbus/busstaff/updatebusstaffAction";
import { DeleteBusstaffInitiate } from "../redux/actions/schoolbus/busstaff/deletebusstaffAction";

const DriverDashboard = () => {
  const dispatch = useDispatch();
  const { data: allbusesstaff = [] } = useSelector((state) => state.getallbusstaff.busstaff || {});
  useEffect(() => {
    dispatch(getAllBusstaffInitiate());
  }, []);
  console.log("i am all allbusesstaff", allbusesstaff);
  const initialDriversData = [
    {
      id: "D001",
      role: "Driver",
      name: "John Doe",
      dob: "1978-05-20",
      license: "AB123456",
      contact: "9876543210",
      vehicle: "Bus - 12",
      route: "Route 5",
      experience: "10 years",
      branch: "Main Branch", // ✅ Assigned branch
      profilePhoto: "https://via.placeholder.com/150",
      licensePhoto: "https://via.placeholder.com/150",
    },
    {
      id: "D002",
      role: "Conductor",
      name: "Jane Smith",
      dob: "1984-08-10",
      license: "CD789012",
      contact: "8765432109",
      vehicle: "Bus - 7",
      route: "Route 2",
      experience: "8 years",
      branch: "City Branch", // ✅ Assigned branch
      profilePhoto: "https://via.placeholder.com/150",
      licensePhoto: "https://via.placeholder.com/150",
    },
    {
      id: "D003",
      role: "Driver",
      name: "Michael Brown",
      dob: "1980-07-15",
      license: "EF456789",
      contact: "7654321098",
      vehicle: "Bus - 15",
      route: "Route 7",
      experience: "12 years",
      branch: "Westside Branch", // ✅ Assigned branch
      profilePhoto: "https://via.placeholder.com/150",
      licensePhoto: "https://via.placeholder.com/150",
    },
    {
      id: "D004",
      role: "Conductor",
      name: "Emily White",
      dob: "1985-09-25",
      license: "GH987654",
      contact: "6543210987",
      vehicle: "Bus - 9",
      route: "Route 3",
      experience: "7 years",
      branch: "Main Branch", // ✅ Assigned branch
      profilePhoto: "https://via.placeholder.com/150",
      licensePhoto: "https://via.placeholder.com/150",
    },
    {
      id: "D005",
      role: "Driver",
      name: "Robert Green",
      dob: "1975-06-30",
      license: "IJ543210",
      contact: "5432109876",
      vehicle: "Bus - 18",
      route: "Route 6",
      experience: "15 years",
      branch: "City Branch", // ✅ Assigned branch
      profilePhoto: "https://via.placeholder.com/150",
      licensePhoto: "https://via.placeholder.com/150",
    },
    {
      id: "D006",
      role: "Conductor",
      name: "Sophia Wilson",
      dob: "1990-03-12",
      license: "KL210987",
      contact: "4321098765",
      vehicle: "Bus - 5",
      route: "Route 4",
      experience: "5 years",
      branch: "Westside Branch", // ✅ Assigned branch
      profilePhoto: "https://via.placeholder.com/150",
      licensePhoto: "https://via.placeholder.com/150",
    },
    {
      id: "D007",
      role: "Driver",
      name: "Daniel Harris",
      dob: "1979-11-22",
      license: "MN654321",
      contact: "3210987654",
      vehicle: "Bus - 20",
      route: "Route 8",
      experience: "14 years",
      branch: "Main Branch", // ✅ Assigned branch
      profilePhoto: "https://via.placeholder.com/150",
      licensePhoto: "https://via.placeholder.com/150",
    },
    {
      id: "D008",
      role: "Conductor",
      name: "Olivia Martinez",
      dob: "1988-12-05",
      license: "OP123456",
      contact: "2109876543",
      vehicle: "Bus - 10",
      route: "Route 1",
      experience: "9 years",
      branch: "City Branch", // ✅ Assigned branch
      profilePhoto: "https://via.placeholder.com/150",
      licensePhoto: "https://via.placeholder.com/150",
    },
  ];
  const { selectedBranch } = useBranch(); // ✅ Get the selected branch

  const [drivers, setDrivers] = useState(initialDriversData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  // console.log(' iam mage',selectedDriver?.profilePhoto)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);

  // Search Functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const branchSpecificDrivers = allbusesstaff.filter(
    (driver) => driver.branch === selectedBranch
  );

  // Add Driver
  const handleAddDriver = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newDriver = {
      // id: formData.get("id"),
      role: formData.get("role"),
      name: formData.get("name"),
      dateofBirth: formData.get("dob"),
      license: formData.get("license"),
      contact: formData.get("contact"),
      vehicle: formData.get("vehicle"),
      route: formData.get("route"),
      experience: formData.get("experience"),
      email: formData.get('email'),
      password: formData.get("password"),
      profilePhoto:
        formData.get("profilePhoto") && formData.get("profilePhoto").name
          ? URL.createObjectURL(formData.get("profilePhoto"))
          : "https://via.placeholder.com/150",
      licensePhoto:
        formData.get("licensePhoto") && formData.get("licensePhoto").name
          ? URL.createObjectURL(formData.get("licensePhoto"))
          : "https://via.placeholder.com/150",
    };
    // setDrivers([...drivers, newDriver]);

    dispatch(AddBusstaffInitiate(newDriver, (success) => {
      if (success) {
        console.log('add successful, fetching add student list.');
        dispatch(getAllBusstaffInitiate());
        closeAddModal();
      } else {
        console.error('Failed to add teachet.');
      }
    }))

  };

  // Edit Driver
  const handleEditDriver = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedDriver = {
      _id: selectedDriver._id,
      role: formData.get("role"),
      name: formData.get("name"),
      dateofBirth: formData.get("dob"),
      license: formData.get("license"),
      contact: formData.get("contact"),
      vehicle: formData.get("vehicle"),
      route: formData.get("route"),
      // experience: formData.get("experience"),
      email: formData.get('email'),
      // password: formData.get("password"),
      profilePhoto:
        formData.get("profilePhoto") && formData.get("profilePhoto").name
          ? URL.createObjectURL(formData.get("profilePhoto"))
          : selectedDriver.profilePhoto,
      licensePhoto:
        formData.get("licensePhoto") && formData.get("licensePhoto").name
          ? URL.createObjectURL(formData.get("licensePhoto"))
          : selectedDriver.licensePhoto,
    };
    dispatch(UpdateBusstaffInitiate(updatedDriver, (success) => {
      if (success) {
        console.log('Delete successful, fetching updated teacher list.');
        dispatch(getAllBusstaffInitiate());
        closeEditModal();
      } else {
        console.error('Failed to update student.');
      }
    }))

  };

  // Delete Driver
  const confirmDeleteDriver = () => {
    // setDrivers(drivers.filter((driver) => driver.id !== driverToDelete.id));
    // closeDeleteModal();
    dispatch(
      DeleteBusstaffInitiate({ _id: driverToDelete._id }, (success) => {
        if (success) {
          console.log('Delete successful, fetching updated student list.');
          dispatch(getAllBusstaffInitiate());
          closeDeleteModal()
        } else {
          console.error('Failed to delete student.');
        }
      })
    );
  };

  // Open Modals
  const openAddModal = () => setIsAddModalOpen(true);
  const openEditModal = (driver) => {
    setSelectedDriver(driver);
    setIsEditModalOpen(true);
  };
  const openDeleteModal = (driver) => {
    setDriverToDelete(driver);
    setIsDeleteModalOpen(true);
  };

  // Function to open the profile modal and set the selected driver
  const openViewProfileModal = (driver) => {
    setSelectedDriver(driver);
    setIsProfileModalOpen(true);
  };

  // Function to close the profile modal
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // Close Modals
  const closeAddModal = () => setIsAddModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDriver(null);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDriverToDelete(null);
  };

  const filteredBusesstaff = allbusesstaff?.filter((bus) => {
    const lowercasedQuery = searchQuery?.toLowerCase();
    return (
      bus.role.toLowerCase().includes(lowercasedQuery) ||
      bus.name.toLowerCase().includes(lowercasedQuery) ||
      bus._id.toLowerCase().includes(lowercasedQuery) ||
      // bus.dateofBirth.toLowerCase().includes(lowercasedQuery) ||
      bus.license.toLowerCase().includes(lowercasedQuery) ||
      bus.contact.toLowerCase().includes(lowercasedQuery) ||
      bus.vehicle.toLowerCase().includes(lowercasedQuery) ||
      bus.route.toLowerCase().includes(lowercasedQuery)
    );
  });
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-center text-gray-800">
        Bus Staff
      </h1>

      {/* Search and Add Driver */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by ID, role, vehicle or route..."
          className="w-full sm:w-[400px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
        <button
          className="text-blue-600 py-2 px-4 flex items-center"
          onClick={openAddModal}
        >
          <Add sx={{ fontSize: 24 }} /> {/* Add icon with margin */}
        </button>
      </div>

      {/* Drivers List */}
      <div className="overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto border rounded-lg shadow-md">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr className="text-xs sm:text-sm">
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Date of Birth</th>
                <th className="px-6 py-3 text-left">License</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Vehicle</th>
                <th className="px-6 py-3 text-left">Route</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!searchQuery ? allbusesstaff?.length > 0 ? allbusesstaff?.map((driver) => (
                <tr key={driver._id} className="border-b hover:bg-gray-100 text-xs sm:text-sm">
                  <td className="px-6 py-3 border">{driver.role}</td>
                  <td className="px-6 py-3 border">{driver._id}</td>
                  <td className="px-6 py-3 border">{driver.name}</td>
                  <td className="px-6 py-3 border">{driver.dateofBirth}</td>
                  <td className="px-6 py-3 border">{driver.license}</td>
                  <td className="px-6 py-3 border">{driver.contact}</td>
                  <td className="px-6 py-3 border text-nowrap">{driver.vehicle}</td>
                  <td className="px-6 py-3 border text-nowrap">{driver.route}</td>
                  <td className="px-6 py-3 text-center flex">
                    <button
                      className="px-2 py-1 mr-3 text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-700 text-nowrap"
                      onClick={() => openViewProfileModal(driver)}
                    >
                      <i className="mr-2 fas fa-eye"></i> View Profile
                    </button>
                    <button
                      className="mr-3 text-blue-500 hover:text-blue-700"
                      onClick={() => openEditModal(driver)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openDeleteModal(driver)}
                    >
                      <Delete size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-3 text-center text-gray-600"
                  >
                    No bus staff found.
                  </td>
                </tr>
              ) : null}

              {searchQuery ? filteredBusesstaff?.length > 0 ? filteredBusesstaff?.map((driver) => (
                <tr key={driver._id} className="border-b hover:bg-gray-100 text-xs sm:text-sm">
                  <td className="px-6 py-3 border">{driver.role}</td>
                  <td className="px-6 py-3 border">{driver._id}</td>
                  <td className="px-6 py-3 border">{driver.name}</td>
                  <td className="px-6 py-3 border">{driver.dateofBirth}</td>
                  <td className="px-6 py-3 border">{driver.license}</td>
                  <td className="px-6 py-3 border">{driver.contact}</td>
                  <td className="px-6 py-3 border text-nowrap">{driver.vehicle}</td>
                  <td className="px-6 py-3 border text-nowrap">{driver.route}</td>
                  <td className="px-6 py-3 text-center flex">
                    <button
                      className="px-2 py-1 mr-3 text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-700 text-nowrap"
                      onClick={() => openViewProfileModal(driver)}
                    >
                      <i className="mr-2 fas fa-eye"></i> View Profile
                    </button>
                    <button
                      className="mr-3 text-blue-500 hover:text-blue-700"
                      onClick={() => openEditModal(driver)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => openDeleteModal(driver)}
                    >
                      <Delete size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-3 text-center text-gray-600"
                  >
                    No bus staff found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Profile Modal */}
      {isProfileModalOpen && selectedDriver && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 px-4">
          <div className="w-full max-w-md sm:max-w-lg bg-white p-6 rounded-lg">
            <h2 className="mb-4 text-xl sm:text-2xl font-bold">Profile</h2>

            {/* Profile Photo */}
            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              {/* Check if the driver has a profile photo, otherwise display a placeholder */}
              <img
                src={
                  selectedDriver.profilePhoto || "/path/to/default/profile.png"
                } // Provide a default image path
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
              />
              <img
                src={
                  selectedDriver.licensePhoto || "/path/to/default/license.png"
                } // Provide a default image path
                alt="License"
                className="w-32 h-16 sm:w-48 sm:h-24 object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="mb-4">
                <label className="block text-gray-700">ID:</label>
                <p className="text-gray-900">{selectedDriver._id}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role:</label>
                <p className="text-gray-900">{selectedDriver.role}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <p className="text-gray-900">{selectedDriver.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth:</label>
                <p className="text-gray-900">{selectedDriver.dateofBirth}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">License:</label>
                <p className="text-gray-900">{selectedDriver.license}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contact:</label>
                <p className="text-gray-900">{selectedDriver.contact}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Vehicle:</label>
                <p className="text-gray-900">{selectedDriver.vehicle}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Route:</label>
                <p className="text-gray-900">{selectedDriver.route}</p>
              </div>
              {/* <div className="mb-4">
            <label className="block text-gray-700">Experience:</label>
            <p className="text-gray-900">{selectedDriver.experience}</p>
            </div> */}
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
                onClick={closeProfileModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-full max-w-3xl p-6 bg-white rounded-lg absolute max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-2xl font-bold">Add New Staff</h2>
            <form
              onSubmit={handleAddDriver}
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="text"
                  name="password"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  required
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Role</option>
                  <option value="Driver">Driver</option>
                  <option value="Conductor">Conductor</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">License</label>
                <input
                  type="text"
                  name="license"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contact</label>
                <input
                  type="text"
                  name="contact"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Vehicle</label>
                <input
                  type="text"
                  name="vehicle"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Route</label>
                <input
                  type="text"
                  name="route"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {/* <div className="mb-4">
          <label className="block text-gray-700">Experience</label>
          <input
            type="text"
            name="experience"
            required
            className="w-full p-3 border rounded-lg"
          />
        </div> */}
              <div className="mb-4">
                <label className="block text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">License Photo</label>
                <input
                  type="file"
                  name="licensePhoto"
                  accept="image/*"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-between col-span-2">
                <button
                  type="button"
                  className="px-4 py-2 text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Driver Modal */}
      {isEditModalOpen && selectedDriver && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-full max-w-4xl p-8 bg-white rounded-lg">
            <h2 className="mb-4 text-2xl font-bold">Edit Driver</h2>
            <form
              onSubmit={handleEditDriver}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  defaultValue={selectedDriver.role} // Assuming selectedDriver contains the selected driver's role
                  required
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Role</option>
                  <option value="Driver">Driver</option>
                  <option value="Conductor">Conductor</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={selectedDriver.email}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="text"
                  name="password"
                  defaultValue={selectedDriver.password}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div> */}
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedDriver.name}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  defaultValue={
                    selectedDriver.dateofBirth
                      ? new Date(selectedDriver.dateofBirth).toISOString().split("T")[0]
                      : ""
                  }
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">License</label>
                <input
                  type="text"
                  name="license"
                  defaultValue={selectedDriver.license}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contact</label>
                <input
                  type="text"
                  name="contact"
                  defaultValue={selectedDriver.contact}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Vehicle</label>
                <input
                  type="text"
                  name="vehicle"
                  defaultValue={selectedDriver.vehicle}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Route</label>
                <input
                  type="text"
                  name="route"
                  defaultValue={selectedDriver.route}
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {/* <div className="mb-4">
            <label className="block text-gray-700">Experience</label>
            <input
                  type="text"
                  name="experience"
                  defaultValue={selectedDriver.experience}
                  required
                  className="w-full p-3 border rounded-lg"
            />
            </div> */}
              <div className="mb-4">
                <label className="block text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  name="profilePhoto"
                  // defaultValue={selectedDriver.profilePhoto}
                  accept="image/*"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">License Photo</label>
                <input
                  type="file"
                  name="licensePhoto"
                  // defaultValue={selectedDriver.licensePhoto}
                  accept="image/*"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-between col-span-3">
                <button
                  type="button"
                  className="px-4 py-2 text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Driver Modal */}
      {isDeleteModalOpen && driverToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="p-8 bg-white rounded-lg w-96">
            <h2 className="mb-4 text-xl font-bold">
              Are you sure you want to delete{" "}
              <span className="text-red-600">{driverToDelete.name}</span>?
            </h2>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white transition duration-300 bg-red-600 rounded-lg hover:bg-red-700"
                onClick={confirmDeleteDriver}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
