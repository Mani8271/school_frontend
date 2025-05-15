import React, { useState, useEffect } from "react";
import { Upload, Add, Download, Edit, Delete } from "@mui/icons-material";
import { useBranch } from "../Pages/Branches";
import { useNavigate } from "react-router-dom";
import { AddNonteachingstaffInitiate } from "../redux/actions/staff/nonteachingstaff/addnonteachingstaffAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllnonTeachersInitiate } from "../redux/actions/staff/nonteachingstaff/getnonteachingstaffAction";
import { UpdateNonteacherInitiate } from "../redux/actions/staff/nonteachingstaff/updatenonteachingstaffAction";
import { DeleteNonteacherInitiate } from "../redux/actions/staff/nonteachingstaff/deletenonteachingstaffAction";

const NonTeachingStaff = () => {
  const dispatch = useDispatch();
  const { data: allnonteachers = [] } = useSelector((state) => state.getallnonteachers.nonteachers || {});
  useEffect(() => {
    dispatch(getAllnonTeachersInitiate());
  }, []);
  console.log("i am all allnonteachers", allnonteachers);
  const [staff, setStaff] = useState([
    {
      id: "NT12345",
      name: "Davis",
      designation: "Clerk",
      gender: "Male",
      department: "Administration",
      experience: "5 years",
      joiningDate: "2019-03-19",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "davis@example.com",
      mobile: "9123456789",
      address: "123 Lane",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    },
    {
      id: "NT54321",
      name: "Miller",
      designation: "Librarian",
      gender: "Female",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-01",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "miller@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "City Branch", // ✅ Added branch
    },
    {
      id: "NT12346",
      name: "David",
      designation: "Security",
      gender: "Male",
      department: "Administration",
      experience: "4 years",
      joiningDate: "2020-03-15",
      maritalStatus: "Single",
      emergencyContact: "9852512358",
      email: "david@example.com",
      mobile: "9123456789",
      address: "123 Lane",
      city: "Vizag",
      branch: "Westside Branch", // ✅ Added branch
    },
    {
      id: "NT54320",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    },
    {
      id: "NT54322",
      name: "Anderson",
      designation: "Accountant",
      gender: "Female",
      department: "Finance",
      experience: "6 years",
      joiningDate: "2018-05-20",
      maritalStatus: "Single",
      emergencyContact: "9845123456",
      email: "anderson@example.com",
      mobile: "9876543210",
      address: "789 Avenue",
      city: "Vizag",
      branch: "City Branch", // ✅ Added branch
    },
    {
      id: "NT54323",
      name: "William",
      designation: "Technician",
      gender: "Male",
      department: "IT Support",
      experience: "5 years",
      joiningDate: "2019-09-10",
      maritalStatus: "Married",
      emergencyContact: "9988776655",
      email: "william@example.com",
      mobile: "9234567890",
      address: "321 Road",
      city: "Vizag",
      branch: "Westside Branch", // ✅ Added branch
    },
    {
      id: "NT54301",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    }, {
      id: "NT54302",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    }, {
      id: "NT54303",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    }, {
      id: "NT54304",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    }, {
      id: "NT54305",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    }, {
      id: "NT54306",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    }, {
      id: "NT54307",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    },
    {
      id: "NT54308",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    }, {
      id: "NT54309",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    }, {
      id: "NT54310",
      name: "Steler",
      designation: "Librarian",
      gender: "Male",
      department: "Library",
      experience: "3 years",
      joiningDate: "2021-07-12",
      maritalStatus: "Married",
      emergencyContact: "9852512358",
      email: "steler@example.com",
      mobile: "9988776655",
      address: "456 Street",
      city: "Vizag",
      branch: "Main Branch", // ✅ Added branch
    },
  ]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const { selectedBranch } = useBranch(); // Get the selected branch
  const [newStaff, setNewStaff] = useState({
    _id: "",
    name: "",
    designation: "",
    gender: "",
    department: "",
    experience: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    maritalStatus: "",
    emergencyContactNumber: "",
    joiningDate: "",
    ProfilePicture: ""
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 10;
  const branchSpecificTeachers = staff.filter((staff) => staff.branch === selectedBranch);
  const generateCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Designation",
      "Gender",
      "Department",
      "Experience",
      "Email",
      "Mobile",
      "Address",
      "City",
    ];
    const rows = staff.map((s) => [
      s.id,
      s.name,
      s.designation,
      s.gender,
      s.department,
      s.experience,
      s.email,
      s.mobile,
      s.address,
      s.city,
    ]);
    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    return csvContent;
  };

  const handleDownload = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "non_teaching_staff.csv");
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStaff = () => {
    console.log(newStaff)
    const formdata = new FormData();
    if (editingStaff && newStaff._id) {
      formdata.append("_id", newStaff._id);
    }
    formdata.append("name", newStaff.name);
    formdata.append("department", newStaff.department);
    formdata.append("gender", newStaff.gender);
    formdata.append("designation", newStaff.designation);
    formdata.append("experience", newStaff.experience);
    formdata.append("joiningDate", newStaff.joiningDate);
    formdata.append("maritalStatus", newStaff.maritalStatus);
    formdata.append("emergencyContactNumber", newStaff.emergencyContactNumber);
    formdata.append("address", newStaff.address);
    formdata.append("city", newStaff.city);
    formdata.append("email", newStaff.email);
    formdata.append("mobileNumber", newStaff.mobileNumber);
    formdata.append("password", newStaff.password);
    formdata.append("ProfilePicture", newStaff.ProfilePicture);
    if (formdata && !editingStaff) {
      dispatch(AddNonteachingstaffInitiate(formdata, (success) => {
        if (success) {
          console.log('add successful, fetching add student list.');
          dispatch(getAllnonTeachersInitiate());
          setFormVisible(false);
          resetForm();
        } else {
          console.error('Failed to add teachet.');
        }
      }))
    }
    if (formdata && editingStaff) {
      dispatch(UpdateNonteacherInitiate(formdata, (success) => {
        if (success) {
          console.log('Delete successful, fetching updated teacher list.');
          dispatch(getAllnonTeachersInitiate());
          setFormVisible(false);
          resetForm();
        } else {
          console.error('Failed to update student.');
        }
      }))
    }
  };

  const handleFormSubmit = () => {
    if (
      !newStaff.name ||
      !newStaff.gender ||
      !newStaff.designation ||
      !newStaff.department ||
      !newStaff.experience ||
      !newStaff.joiningDate ||
      !newStaff.mobileNumber
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (editingStaff) {
      handleAddStaff();
    } else {
      handleAddStaff();
    }
    // setFormVisible(false);
    // resetForm();
  };

  const resetForm = () => {
    setNewStaff({
      name: "",
      designation: "",
      gender: "",
      department: "",
      experience: "",
      email: "",
      mobileNumber: "",
      address: "",
      city: "",
      maritalStatus: "",
      emergencyContactNumber: "",
      joiningDate: "",
    });
    setEditingStaff(null);
  };

  const handleCancel = () => {
    setFormVisible(false);
    resetForm();
  };

  const handleEditClick = (staff) => {
    setEditingStaff(staff);
    setNewStaff(staff);
    setFormVisible(true);
  };

  const handleDeleteClick = (id) => {
    // setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
    if (id) {
      dispatch(
        DeleteNonteacherInitiate({ _id: id }, (success) => {
          if (success) {
            console.log('Delete successful, fetching updated student list.');
            dispatch(getAllnonTeachersInitiate());
          } else {
            console.error('Failed to delete student.');
          }
        })
      );
    }
  };

  const filteredStaff = allnonteachers.filter((staff) => {
    const lowercasedQuery = searchQuery.toLowerCase();

    return (
      (staff.name?.toLowerCase() || "").includes(lowercasedQuery) ||
      (staff._id?.toLowerCase() || "").includes(lowercasedQuery) ||
      (staff.designation?.toLowerCase() || "").includes(lowercasedQuery) ||
      (staff.department?.toLowerCase() || "").includes(lowercasedQuery)
    );
  });



  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBranch]);

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStaff = filteredStaff.slice(startIndex, startIndex + itemsPerPage);


  return (
    <div className="p-6 bg-gray-100 max-w-7xl mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Non-Teaching Staff</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 w-full">
        {[
          { label: "Leave Requests", path: "/leave-requestsNT" },
          { label: "Daily Attendance", path: "/daily-attendanceNT" },
          { label: "Monthly Attendance", path: "/monthly-attendanceNT" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="px-6 py-4 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition shadow-md w-full text-center"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by ID, name, designation, or department"
          // className="w-full min-w-[250px] sm:min-w-[300px] md:min-w-[400px] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          className="w-full sm:w-2/3 lg:w-1/3 p-3 border rounded-lg"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Action Icons */}
        <div className="flex justify-start md:justify-end gap-4 text-lg sm:text-xl">
          <Upload className="text-blue-600 cursor-pointer hover:text-blue-800" />
          <Add
            className="text-green-600 cursor-pointer hover:text-green-800"
            onClick={() => setFormVisible(true)}
          />
          <Download
            className="text-purple-600 cursor-pointer hover:text-purple-800"
            onClick={handleDownload}
          />
        </div>
      </div>


      {formVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 overflow-y-auto">
          <div className="relative w-full max-w-3xl p-6 bg-white rounded-md shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-xl font-semibold">
              {editingStaff ? "Edit Staff" : "Add New Staff"}
            </h2>
            <form>
              {/* image */}
              <input
                type="file"
                name="ProfilePicture"
                onChange={(e) =>
                  setNewStaff((prev) => ({
                    ...prev,
                    ProfilePicture: e.target.files[0], // Capture the file object
                  }))
                }
              />

              {(newStaff.ProfilePicture || editingStaff?.ProfilePicture) && (
                <img
                  src={
                    newStaff.ProfilePicture instanceof File
                      ? URL.createObjectURL(newStaff.ProfilePicture)
                      : `${process.env.REACT_APP_IMAGE_BASE_URL || 'https://example.com/path_to_images/'}${editingStaff.ProfilePicture}`
                  }
                  alt="Profile Preview"
                  style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
                />
              )}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block font-medium text-gray-700">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={newStaff.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* <div>
                  <label className="block font-medium text-gray-700">Staff ID*</label>
                  <input
                    type="text"
                    name="id"
                    value={newStaff._id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div> */}

                <div>
                  <label className="block font-medium text-gray-700">Gender*</label>
                  <select
                    name="gender"
                    value={newStaff.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Designation*</label>
                  <input
                    type="text"
                    name="designation"
                    value={newStaff.designation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Department*</label>
                  <input
                    type="text"
                    name="department"
                    value={newStaff.department}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Experience*</label>
                  <input
                    type="text"
                    name="experience"
                    value={newStaff.experience}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Marital Status */}
                <div>
                  <label htmlFor="maritalStatus" className="block font-medium text-gray-700">Marital Status</label>
                  <select
                    id="maritalStatus"
                    name="maritalStatus"
                    value={newStaff.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                  </select>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label htmlFor="emergencyContactNumber" className="block font-medium text-gray-700">Emergency Contact Number</label>
                  <input
                    type="text"
                    id="emergencyContactNumber"
                    name="emergencyContactNumber"
                    value={newStaff.emergencyContactNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Joining Date*</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={newStaff.joiningDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newStaff.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Mobile Number*</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={newStaff.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newStaff.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={newStaff.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 text-white bg-gray-500 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  className="px-6 py-2 text-white bg-blue-600 rounded-md"
                >
                  {editingStaff ? "Save Changes" : "Add Staff"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <div className="overflow-x-auto overflow-y-auto bg-white rounded-lg"
        style={{ maxHeight: "45vh" }}>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="sticky top-0 z-10 bg-gray-200 border-b">
            <tr className="bg-gray-200 border-b">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Gender</th>
              <th className="px-4 py-3 text-left">Designation</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Experience</th>
              <th className="px-4 py-3 text-left text-nowrap">joining Date</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Mobile</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">City</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto max-h-[400px]">
            {!searchQuery ? allnonteachers.length > 0 ? (
              allnonteachers.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 border ">{s._id}</td>
                  <td className="px-4 py-3 border text-nowrap">{s.name}</td>
                  <td className="px-4 py-3border">{s.gender}</td>
                  <td className="px-4 py-3 border">{s.designation}</td>
                  <td className="px-4 py-3 border">{s.department}</td>
                  <td className="px-4 py-3 border">{s.experience}</td>
                  <td className="px-4 py-3 border text-nowrap">{s.joiningDate}</td>
                  <td className="px-4 py-3 border">{s.email}</td>
                  <td className="px-4 py-3 border">{s.mobileNumber}</td>
                  <td className="px-4 py-3 border text-nowrap">{s.address}</td>
                  <td className="px-4 py-3 border">{s.city}</td>
                  <td className="flex gap-4 px-4 py-3 mt-2">
                    <Edit
                      className="text-blue-500 cursor-pointer hover:text-blue-800"
                      onClick={() => handleEditClick(s)}
                    />
                    <Delete
                      className="text-red-500 cursor-pointer hover:text-red-800"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this staff?")) {
                          handleDeleteClick(s._id);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))) : (
              <tr>
                <td colSpan="15" className="text-center py-4 text-gray-500">
                  No staff found
                </td>
              </tr>
            ) : null}

            {searchQuery ? filteredStaff.length > 0 ? (
              filteredStaff.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 border ">{s._id}</td>
                  <td className="px-4 py-3 border text-nowrap">{s.name}</td>
                  <td className="px-4 py-3border">{s.gender}</td>
                  <td className="px-4 py-3 border">{s.designation}</td>
                  <td className="px-4 py-3 border">{s.department}</td>
                  <td className="px-4 py-3 border">{s.experience}</td>
                  <td className="px-4 py-3 border text-nowrap">{s.joiningDate}</td>
                  <td className="px-4 py-3 border">{s.email}</td>
                  <td className="px-4 py-3 border">{s.mobileNumber}</td>
                  <td className="px-4 py-3 border text-nowrap">{s.address}</td>
                  <td className="px-4 py-3 border">{s.city}</td>
                  <td className="flex gap-4 px-4 py-3 mt-2">
                    <Edit
                      className="text-blue-500 cursor-pointer hover:text-blue-800"
                      onClick={() => handleEditClick(s)}
                    />
                    <Delete
                      className="text-red-500 cursor-pointer hover:text-red-800"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this staff?")) {
                          handleDeleteClick(s._id);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))) : (
              <tr>
                <td colSpan="15" className="text-center py-4 text-gray-500">
                  No staff found
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
        >
          Previous
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NonTeachingStaff;
