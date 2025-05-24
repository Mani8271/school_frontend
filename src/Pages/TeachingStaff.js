import React, { useState, useEffect } from "react";
import { Upload, Add, Download, Edit, Delete } from "@mui/icons-material";
import { useBranch } from "../Pages/Branches";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachersInitiate } from "../redux/actions/staff/teachingstaff/getteachingstaffAction";
import { AddTeachingstaffInitiate } from "../redux/actions/staff/teachingstaff/addteachingstaffAction";
import { UpdateTeacherInitiate } from "../redux/actions/staff/teachingstaff/teachingstaffupdateAction";
import { DeleteTeacherInitiate } from "../redux/actions/staff/teachingstaff/deleteteachingstaffAction";

const TeachingStaff = () => {
  // const [teachers, setTeachers] = useState([
  //   {
  //     id: "T12345",
  //     name: "Mr. Smith",
  //     department: "Math",
  //     gender: "Male",
  //     qualification: "M.Sc. Mathematics",
  //     experience: "6 years",
  //     joiningDate: "2018-11-10",
  //     maritalStatus: "Married",
  //     emergencyContact: "9852512358",
  //     email: "smith@example.com",
  //     mobile: "9123456789",
  //     username: "mrsmith2018", password: "Smith@1234",
  //     address: "789, Street",
  //     city: "Vizag",
  //     branch: "Main Branch", // ✅ Added branch field
  //   },
  //   {
  //     id: "T54318",
  //     name: "Ms. Johnson",
  //     department: "English",
  //     gender: "Female",
  //     qualification: "M.A. English",
  //     experience: "2 years",
  //     joiningDate: "2022-08-02",
  //     maritalStatus: "Married",
  //     emergencyContact: "9852512358",
  //     email: "johnson@example.com",
  //     mobile: "9988776655", username: "msjohnson2022", password: "Johnson@5678",
  //     address: "101, Avenue",
  //     city: "Vizag",
  //     branch: "City Branch",
  //   },
  //   {
  //     id: "T54317",
  //     name: "Ms. Williams",
  //     department: "Science",
  //     gender: "Female",
  //     qualification: "M.Sc. Physics",
  //     experience: "4 years",
  //     joiningDate: "2021-06-15",
  //     maritalStatus: "Single",
  //     emergencyContact: "9852512360",
  //     email: "williams@example.com",
  //     mobile: "9876543210", username: "mswilliams2022", password: "Williams@5678",
  //     address: "56, Park Lane",
  //     city: "Vizag",
  //     branch: "Westside Branch",
  //   },
  //   {
  //     id: "T54316",
  //     name: "Mr. Brown",
  //     department: "History",
  //     gender: "Male",
  //     qualification: "M.A. History",
  //     experience: "3 years",
  //     joiningDate: "2020-05-12",
  //     maritalStatus: "Single",
  //     emergencyContact: "9874563210",
  //     email: "brown@example.com",
  //     mobile: "9123456780", username: "mrbrown2022", password: "Brown@5678",
  //     address: "789, Historical Street",
  //     city: "Vizag",
  //     branch: "Main Branch",
  //   },
  //   {
  //     id: "T54329",
  //     name: "Ms. Taylor",
  //     department: "Geography",
  //     gender: "Female",
  //     qualification: "M.A. Geography",
  //     experience: "5 years",
  //     joiningDate: "2019-07-22",
  //     maritalStatus: "Married",
  //     emergencyContact: "9988771122",
  //     email: "taylor@example.com",
  //     mobile: "9998887776", username: "mstaylor2022", password: "Taylor@5678",
  //     address: "22, Map Street",
  //     city: "Vizag",
  //     branch: "City Branch",
  //   },
  //   {
  //     id: "T54328",
  //     name: "Mr. Anderson",
  //     department: "Computer Science",
  //     gender: "Male",
  //     qualification: "M.Tech CS",
  //     experience: "7 years",
  //     joiningDate: "2017-09-10",
  //     maritalStatus: "Married",
  //     emergencyContact: "9944556677",
  //     email: "anderson@example.com",
  //     mobile: "9911223344", username: "mranderson2022", password: "Anderson@5678",
  //     address: "44, Tech Park",
  //     city: "Vizag",
  //     branch: "Westside Branch",
  //   },
  //   {
  //     id: "T54326",
  //     name: "Ms. Lee",
  //     department: "Biology",
  //     gender: "Female",
  //     qualification: "M.Sc. Biology",
  //     experience: "6 years",
  //     joiningDate: "2018-11-02",
  //     maritalStatus: "Single",
  //     emergencyContact: "9856554433",
  //     email: "lee@example.com",
  //     mobile: "9988776654", username: "mslee2022", password: "Lee@5678",
  //     address: "55, Nature Avenue",
  //     city: "Vizag",
  //     branch: "Main Branch",
  //   },
  //   {
  //     id: "T54325",
  //     name: "Mr. Clark",
  //     department: "Chemistry",
  //     gender: "Male",
  //     qualification: "M.Sc. Chemistry",
  //     experience: "8 years",
  //     joiningDate: "2016-03-15",
  //     maritalStatus: "Married",
  //     emergencyContact: "9944112233",
  //     email: "clark@example.com",
  //     mobile: "9123456785", username: "mrclark2022", password: "Clark@5678",
  //     address: "77, Lab Street",
  //     city: "Vizag",
  //     branch: "City Branch",
  //   },
  //   {
  //     id: "T54320",
  //     name: "Ms. Scott",
  //     department: "Physics",
  //     gender: "Female",
  //     qualification: "M.Sc. Physics",
  //     experience: "3 years",
  //     joiningDate: "2021-01-05",
  //     maritalStatus: "Single",
  //     emergencyContact: "9988773344",
  //     email: "scott@example.com",
  //     mobile: "9123456785", username: "msscott2022", password: "Scott@5678",
  //     address: "89, Quantum Road",
  //     city: "Vizag",
  //     branch: "Westside Branch",
  //   },
  //   {
  //     id: "T54321",
  //     name: "Mr. Thomas",
  //     department: "Physical Education",
  //     gender: "Male",
  //     qualification: "B.P.Ed.",
  //     experience: "9 years",
  //     joiningDate: "2015-12-22",
  //     maritalStatus: "Married",
  //     emergencyContact: "9977553311",
  //     email: "thomas@example.com",
  //     mobile: "9123456785", username: "mrthomas2022", password: "Thomas@5678",
  //     address: "23, Sports Lane",
  //     city: "Vizag",
  //     branch: "Main Branch",
  //   },
  //   {
  //     id: "T54323",
  //     name: "Ms. Davis",
  //     department: "Art",
  //     gender: "Female",
  //     qualification: "M.F.A.",
  //     experience: "5 years",
  //     joiningDate: "2019-04-10",
  //     maritalStatus: "Married",
  //     emergencyContact: "9933445566",
  //     email: "davis@example.com",
  //     mobile: "9977886655", username: "msdavis2022", password: "Davis@5678",
  //     address: "12, Colors Street",
  //     city: "Vizag",
  //     branch: "City Branch",
  //   },
  //   {
  //     id: "T54322",
  //     name: "Mr. Walker",
  //     department: "Music",
  //     gender: "Male",
  //     qualification: "M.A. Music",
  //     experience: "4 years",
  //     joiningDate: "2020-10-30",
  //     maritalStatus: "Single",
  //     emergencyContact: "9900223344",
  //     email: "walker@example.com",
  //     mobile: "9955223377", username: "mrwalker2022", password: "Walker@5678",
  //     address: "98, Melody Lane",
  //     city: "Vizag",
  //     branch: "Westside Branch",
  //   },
  //   {
  //     id: "T54301",
  //     name: "Mr. Walker",
  //     department: "Music",
  //     gender: "Male",
  //     qualification: "M.A. Music",
  //     experience: "4 years",
  //     joiningDate: "2020-10-30",
  //     maritalStatus: "Single",
  //     emergencyContact: "9900223344",
  //     email: "walker@example.com",
  //     mobile: "9955223377", username: "mrwalker2022", password: "Walker@5678",
  //     address: "98, Melody Lane",
  //     city: "Vizag",
  //     branch: "Main Branch",
  //   },
  //   {
  //     id: "T54302",
  //     name: "Mr. Walker",
  //     department: "Music",
  //     gender: "Male",
  //     qualification: "M.A. Music",
  //     experience: "4 years",
  //     joiningDate: "2020-10-30",
  //     maritalStatus: "Single",
  //     emergencyContact: "9900223344",
  //     email: "walker@example.com",
  //     mobile: "9955223377", username: "mrwalker2022", password: "Walker@5678",
  //     address: "98, Melody Lane",
  //     city: "Vizag",
  //     branch: "Main Branch",
  //   },
  // ]);
  const dispatch = useDispatch();
  const { data: allteachers = [] } = useSelector((state) => state.getallteachers.teachers || {});
  useEffect(() => {
    dispatch(getAllTeachersInitiate());
  }, [dispatch]);
  console.log("i am all allteachers", allteachers);
  const [formVisible, setFormVisible] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { selectedBranch } = useBranch(); // Get the selected branch
  const navigate = useNavigate();

  useEffect(() => {
    setPage(0); // Reset to first page when branch changes
  }, [selectedBranch]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const branchSpecificTeachers = allteachers?.filter((teacher) => teacher.branch === selectedBranch);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const [newTeacher, setNewTeacher] = useState({
    _id: "",
    teacherName: "",
    gender: "",
    subject: "",
    qualification: "",
    experience: "",
    email: "",
    mobileNumber: "",
    username: "",
    password: "",
    address: "",
    city: "",
    maritalStatus: "",
    emergencyContactNumber: "",
    joiningDate: "",
    ProfilePicture: ""
  });

  const [searchQuery, setSearchQuery] = useState("");

  const generateCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Department",
      "Gender",
      "Qualification",
      "Experience",
      "Joining Date",
      "Email",
      "Mobile",
      "Username",
      "Password",
      "Address",
      "City",
    ];
    const rows = allteachers?.map((teacher) =>
      [
        teacher._id,
        teacher.teacherName,
        teacher.subject,
        teacher.gender,
        teacher.qualification,
        teacher.experience,
        teacher.joiningDate,
        teacher.email,
        teacher.mobile,
        teacher.teacherName,
        teacher.password,
        teacher.address,
        teacher.city,
      ].map((value) => {
        // Check if the value needs to be wrapped in double quotes
        if (typeof value === "string" && /[",\n]/.test(value)) {
          // Escape double quotes within the value by doubling them
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    return csvContent;
  };

  const filteredTeachers = allteachers?.filter((teacher) => {
    const lowercasedQuery = searchQuery?.toLowerCase();
    return (
      teacher.teacherName.toLowerCase().includes(lowercasedQuery) ||
      teacher._id.toLowerCase().includes(lowercasedQuery) ||
      teacher.subject.toLowerCase().includes(lowercasedQuery)
    );
  });

  const displayedTeachers = filteredTeachers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDownload = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "teachers_data.csv");
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTeacher = () => {
    console.log(newTeacher)
    const formdata = new FormData();
    if (editingTeacher && newTeacher._id) {
      formdata.append("_id", newTeacher._id);
    }
    formdata.append("teacherName", newTeacher.teacherName);
    formdata.append("subject", newTeacher.subject);
    formdata.append("gender", newTeacher.gender);
    formdata.append("qualification", newTeacher.qualification);
    formdata.append("experience", newTeacher.experience);
    formdata.append("joiningDate", newTeacher.joiningDate);
    formdata.append("maritalStatus", newTeacher.maritalStatus.toLowerCase());
    formdata.append("emergencyContactNumber", newTeacher.emergencyContactNumber);
    formdata.append("address", newTeacher.address);
    // formdata.append("city", newTeacher.city);
    formdata.append("email", newTeacher.email);
    formdata.append("mobileNumber", newTeacher.mobileNumber);
    formdata.append("password", newTeacher.password);
    formdata.append("ProfilePicture", newTeacher.ProfilePicture);

  if (formdata && !editingTeacher) {
      console.log("hgdhg",formdata)
      dispatch(AddTeachingstaffInitiate(formdata, (success) => {
        if (success) {
          console.log('add successful, fetching add student list.');
          dispatch(getAllTeachersInitiate());
          setFormVisible(false);
          resetForm();
        } else {
          console.error('Failed to add teachet.');
        }
      }))
    }
    if (formdata && editingTeacher) {
      dispatch(UpdateTeacherInitiate(formdata, (success) => {
        if (success) {
          console.log('Delete successful, fetching updated teacher list.');
          dispatch(getAllTeachersInitiate());
          setFormVisible(false);
          resetForm();
        } else {
          console.error('Failed to update student.');
        }
      }))
    }
  };

  const handleFormSubmit = () => {
    console.log(newTeacher)
    if (
      !newTeacher.teacherName ||
      // !newTeacher.id ||
      !newTeacher.subject ||
      !newTeacher.mobileNumber ||
      !newTeacher.gender ||
      !newTeacher.experience ||
      !newTeacher.joiningDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (editingTeacher) {
      handleAddTeacher();
    } else {
      handleAddTeacher(); // Call the function here
    }

  };

  const resetForm = () => {
    setNewTeacher({
      id: "",
      teacherName: "",
      gender: "",
      subject: "",
      qualification: "",
      experience: "",
      email: "",
      mobileNumber: "",
      username: "",
      password: "",
      address: "",
      city: "",
      maritalStatus: "",
      emergencyContactNumber: "",
      joiningDate: "",
    });
    setEditingTeacher(null);
  };

  const handleCancel = () => {
    setFormVisible(false);
    resetForm();
  };

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher);
    setNewTeacher(teacher);
    setFormVisible(true);
  };

  const handleDeleteClick = (id) => {
    // setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
        if (id) {
          dispatch(
            DeleteTeacherInitiate({ _id: id }, (success) => {
              if (success) {
                console.log('Delete successful, fetching updated student list.');
                dispatch(getAllTeachersInitiate());
              } else {
                console.error('Failed to delete student.');
              }
            })
          );
        }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  // const handleAddTeacher = (newTeacher) => {
  //   setTeachers((prevTeachers) => [newTeacher, ...prevTeachers]); // Prepend new teacher
  // };

  return (
    <div className="p-6 bg-gray-100 overflow-x-auto max-w-7xl">
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
        Teaching Staff
      </h1>

      {/* Button Grid Section */}
      {/* <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-4"> */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Time Table", path: "/teacher-timetable" },
          { label: "Leave Requests", path: "/leave-requests" },
          { label: "Daily Attendance", path: "/daily-attendance" },
          { label: "Monthly Attendance", path: "/monthly-attendance" }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="px-3 py-4 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition shadow-md w-full text-center sm:w-auto"
          >
            {item.label}
          </button>
        ))}
      </div>


      {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 w-full flex-wrap"> */}
      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Search by ID, Name or Subject"
          // className="w-full sm:w-auto sm:min-w-[260px] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          // className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          className="w-full sm:w-2/3 lg:w-1/3 p-3 border rounded-lg"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
          <Upload className="text-blue-600 cursor-pointer hover:text-blue-800" title="Upload" />
          <Add className="text-green-600 cursor-pointer hover:text-green-800" title="Add" onClick={() => setFormVisible(true)} />
          <Download className="text-purple-600 cursor-pointer hover:text-purple-800" title="Download" onClick={handleDownload} />
        </div>
      </div>

      {/* <div className="relative bg-white shadow-md rounded-md"> */}
      {/* Scrollable Table Container */}
      {/* <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] bg-white rounded-lg"> */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded-lg">
          {/* Table Header */}
          <thead className="sticky top-0 z-10 bg-gray-200 border-b">
            <tr className="text-left text-xs sm:text-sm md:text-base">
              {["ID", "Name", "Department", "Gender", "Qualification", "Experience", "Joining Date", "Email", "Mobile", "Username", "Password", "Address", "Actions"].map((heading) => (
                <th key={heading} className="px-4 py-3 whitespace-nowrap">{heading}</th>
              ))}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y">
            {!searchQuery ? allteachers.length > 0 ? (
              allteachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 text-sm md:text-base">
                  {["_id", "teacherName", "subject", "gender", "qualification", "experience", "joiningDate", "email", "mobileNumber", "teacherName", "password", "address"].map((key) => (
                    <td key={key} className="px-4 py-3 border truncate max-w-[150px] sm:max-w-[150px]">{teacher[key]}</td>
                  ))}
                  <td className="px-4 py-3 flex space-x-4">
                    <button onClick={() => handleEditClick(teacher)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="inline-block mr-1" />
                    </button>
                    <button onClick={() => window.confirm("Are you sure?") && handleDeleteClick(teacher._id)} className="text-red-600 hover:text-red-800">
                      <Delete className="inline-block mr-1" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="px-4 py-3 text-center text-gray-500">
                  No teaching staff found
                </td>
              </tr>
            ): null}
            {searchQuery ? filteredTeachers.length > 0 ? (
              allteachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50 text-sm md:text-base">
                  {["_id", "teacherName", "subject", "gender", "qualification", "experience", "joiningDate", "email", "mobileNumber", "teacherName", "password", "address"].map((key) => (
                    <td key={key} className="px-4 py-3 border truncate max-w-[150px] sm:max-w-[150px]">{teacher[key]}</td>
                  ))}
                  <td className="px-4 py-3 flex space-x-4">
                    <button onClick={() => handleEditClick(teacher)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="inline-block mr-1" />
                    </button>
                    <button onClick={() => window.confirm("Are you sure?") && handleDeleteClick(teacher._id)} className="text-red-600 hover:text-red-800">
                      <Delete className="inline-block mr-1" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="px-4 py-3 text-center text-gray-500">
                  No teaching staff found
                </td>
              </tr>
            ): null}
          </tbody>
        </table>
      </div>

      {/* Pagination & Rows Per Page */}
      <div className="overflow-x-auto">
        {/* <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-gray-50 border-t space-y-2 sm:space-y-0 sm:space-x-4"> */}
        <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 bg-gray-50 border-t w-full text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Rows per page:</span>
            <select
              className="border border-gray-300 p-1 rounded"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleChangePage(Math.max(page - 1, 0))}
              disabled={page === 0}
              className={`px-4 py-2 border rounded-md ${page === 0 ? "text-gray-400 cursor-not-allowed" : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {page + 1} of {Math.ceil(filteredTeachers.length / rowsPerPage)}
            </span>
            <button
              onClick={() =>
                handleChangePage(
                  Math.min(page + 1, Math.ceil(filteredTeachers.length / rowsPerPage) - 1)
                )
              }
              disabled={page >= Math.ceil(filteredTeachers.length / rowsPerPage) - 1}
              className={`px-4 py-2 border rounded-md ${page >= Math.ceil(filteredTeachers.length / rowsPerPage) - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-900 hover:bg-gray-100"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}

      {formVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="relative w-full max-w-3xl p-6 bg-white rounded-md shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="mb-10 text-xl font-semibold border-b">
              {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
            </h2>
            {/* Close Icon */}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>

            <form>
              {/* image */}
              <input
                type="file"
                name="ProfilePicture"
                onChange={(e) =>
                  setNewTeacher((prev) => ({
                    ...prev,
                    ProfilePicture: e.target.files[0], // Capture the file object
                  }))
                }
              />

              {/* {newStudent.ProfilePicture && !editingStudent && (
                  <img
                    src={URL?.createObjectURL(newStudent.ProfilePicture)}
                    alt="Profile Preview"
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
                  />
                )} */}

              {(newTeacher.ProfilePicture || editingTeacher?.ProfilePicture) && (
                <img
                  src={
                    newTeacher.ProfilePicture instanceof File
                      ? URL.createObjectURL(newTeacher.ProfilePicture)
                      : `${process.env.REACT_APP_IMAGE_BASE_URL || 'https://example.com/path_to_images/'}${editingTeacher.ProfilePicture}`
                  }
                  alt="Profile Preview"
                  style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  // { label: "Teacher ID*", name: "id", type: "text" },
                  { label: "Teacher Name*", name: "teacherName", type: "text" },
                  { label: "Qualification", name: "qualification", type: "text" },
                  { label: "Experience*", name: "experience", type: "text" },
                  { label: "Joining Date*", name: "joiningDate", type: "date" },
                  { label: "Emergency Contact", name: "emergencyContactNumber", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Mobile Number*", name: "mobileNumber", type: "text" },
                  { label: "User Name", name: "username", type: "text" },
                  { label: "Password", name: "password", type: "password" },
                  { label: "Address", name: "address", type: "text" }
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block font-medium text-gray-700">{label}</label>
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={newTeacher[name] || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                ))}

                {[
                  {
                    label: "Department*",
                    name: "subject",
                    options: ["Math", "English"],
                  },
                  {
                    label: "Gender*",
                    name: "gender",
                    options: ["Male", "Female"],
                  },
                  {
                    label: "Marital Status",
                    name: "maritalStatus",
                    options: ["unmarried", "married"],
                  }
                ].map(({ label, name, options }) => (
                  <div key={name}>
                    <label htmlFor={name} className="block font-medium text-gray-700">{label}</label>
                    <select
                      id={name}
                      name={name}
                      value={newTeacher[name] || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select {label}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
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
                  {editingTeacher ? "Save Changes" : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default TeachingStaff;
