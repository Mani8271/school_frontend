import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, IconButton} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Edit, Delete, Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search"; // Import SearchIcon
import { debounce } from "lodash"; // Import lodash for debouncing
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const NoticeBoard = () => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false); // For confirmation modal
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "School Closure",
      description: "School will remain closed on 25th December for holidays.",
      date: new Date("2025-12-25"),
      time: new Date("2025-12-25T10:00:00"),
      className: "Class 10"
    },
    {
      id: 2,
      title: "Exam Schedule",
      description: "Exams will begin from 10th January.",
      date: new Date("2025-01-10"),
      time: new Date("2025-01-10T09:00:00"),
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      description: "A Parent-Teacher meeting will be held on 5th February at 2:00 PM.",
      date: new Date("2025-02-05"),
      time: new Date("2025-02-05T14:00:00"),
    },
    {
      id: 4,
      title: "New Semester Starts",
      description: "The new semester will begin on 1st March.",
      date: new Date("2025-03-01"),
      time: new Date("2025-03-01T08:00:00"),
    },
    {
      id: 5,
      title: "Holiday Notice",
      description: "The school will be closed for summer holidays from 15th June to 30th June.",
      date: new Date("2025-06-15"),
      time: new Date("2025-06-15T00:00:00"),
    },
    {
      id: 6,
      title: "New Semester Starts",
      description: "The new semester will begin on 1st March.",
      date: new Date("2025-03-01"),
      time: new Date("2025-03-01T08:00:00"),
    },
    {
      id: 7,
      title: "Holiday Notice",
      description: "The school will be closed for summer holidays from 15th June to 30th June.",
      date: new Date("2025-06-15"),
      time: new Date("2025-06-15T00:00:00"),
    },
  ]);
  const [currentNotice, setCurrentNotice] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: new Date(),
    file: null,
  });
  const [noticeToDelete, setNoticeToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 3; // Number of notices per page

  // Debounced search
  const debouncedSearch = debounce(
    (query) => setDebouncedSearchQuery(query),
    500
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel(); // Cleanup on unmount
  }, [searchQuery]);

  const handleOpen = (notice = null) => {
    setCurrentNotice(
      notice || {
        title: "",
        description: "",
        date: new Date(),
        time: new Date(),
        file: null
      }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set default date and time if not provided
    const currentDateTime = new Date();
    if (!currentNotice.date) currentNotice.date = currentDateTime;
    if (!currentNotice.time) currentNotice.time = currentDateTime;
  
    if (currentNotice.id) {
      setNotices(
        notices.map((notice) =>
          notice.id === currentNotice.id ? { ...notice, ...currentNotice } : notice
        )
      );
    } else {
      setNotices([
        { id: notices.length + 1, ...currentNotice, date: currentDateTime, time: currentDateTime },
        ...notices
      ]);
    }
  
    setOpen(false);
  };  

  const handleDelete = (id) => {
    setNoticeToDelete(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setNotices(notices.filter((notice) => notice.id !== noticeToDelete));
    setDeleteOpen(false);
  };

  const handleFileDelete = (id) => {
    setNotices((prevNotices) =>
      prevNotices.map((notice) =>
        notice.id === id ? { ...notice, file: null } : notice
      )
    );
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
  };

  const filteredNotices = notices.filter(
    (notice) =>
      notice.className === selectedClass &&
      (notice.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
       notice.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
  );  

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Get current notices based on pagination
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="container max-w-5xl p-4 md:p-6">
        <h1 className="mt-0 mb-10 text-3xl font-bold text-left">Notice Board</h1>

        {/* Search Bar and Add New Notice Button */}
        
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* Select Class Dropdown */}
          <TextField
            select
            label="Select Class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            SelectProps={{ native: true }}
            fullWidth
            size="small" // Ensure same height
            sx={{ flex: 1 }}
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </TextField>

          {/* Search Bar */}
          <TextField
            label="Search Notices"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            size="small" // Match size for alignment
            sx={{
              flex: 2,
              backgroundColor: "#f5f5f5",
            }}
          />

          {/* Add Button */}
          <Button
            onClick={handleOpen}
            color="primary"
            variant="contained"
            sx={{
              minWidth: "48px",
              height: "38px", // Matches small TextField height
              alignSelf: { xs: "stretch", sm: "center" }, // Full width on mobile, centered on larger
              px: 0,
            }}
          >
            <Add sx={{ fontSize: 24 }} />
          </Button>
        </div>



        {/* Displaying Filtered Notices */}
        {filteredNotices.length === 0 ? (
          <div className="mt-10 text-center text-gray-500">
            <p>No notices available. Add a new notice!</p>
          </div>
        ) : (
          <div className="w-full max-w-5xl max-h-[450px] overflow-auto border border-gray-300 p-4 rounded-md shadow-md">
            <div className="grid grid-cols-1 gap-6">
              {currentNotices.map((notice) => (
                <div key={notice.id} className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white">
                  <h2 className="font-semibold text-xl mb-2">{notice.title}</h2>
                  {/* Scrollable Description */}
                  <div>
                    <p className="text-gray-600">{notice.description}</p>
                  </div>

                  {/* File Display with Download & Delete Buttons */}
                  {notice.file && (
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-sm text-gray-700">📄 {notice.file.name}</p>
                      <div className="flex justify-center items-center gap-0">
                        {/* Download Button */}
                        <a href={URL.createObjectURL(notice.file)} download={notice.file.name}>
                          <IconButton color="primary" aria-label="Download File">
                            <DownloadForOfflineIcon />
                          </IconButton>
                        </a>

                        {/* Delete Button */}
                        <IconButton onClick={() => handleFileDelete(notice.id)} color="error" aria-label="Delete File">
                          <Delete />
                        </IconButton>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-400">
                        {/* {notice.date.toLocaleDateString()} at {notice.time.toLocaleTimeString()} */}
                        {new Date(notice.date).toLocaleDateString()} at {new Date(notice.time).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <IconButton onClick={() => handleOpen(notice)} color="primary" aria-label="Edit Notice">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(notice.id)} color="error" aria-label="Delete Notice">
                        <Delete />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Pagination Buttons */}
        <div className="flex flex-wrap justify-between items-center gap-2 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white font-medium transition ${
            currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white font-medium transition ${
            currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Next
        </button>
        </div>

        {/* Modal for Adding/Editing Notices */}
        <Modal open={open} onClose={handleClose}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[85vh]">
              <h2 className="mb-4 text-xl font-semibold text-center">
                {currentNotice.id ? "Edit Notice" : "Add New Notice"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                select
                // label="Class"
                value={currentNotice.className || ""}
                onChange={(e) =>
                  setCurrentNotice({ ...currentNotice, className: e.target.value })
                }
                fullWidth
                required
                SelectProps={{ native: true }}
                sx={{ mt: 2 }}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </TextField>

                <TextField
                  label="Notice Title"
                  variant="outlined"
                  margin="normal"
                  value={currentNotice.title}
                  onChange={(e) => setCurrentNotice({ ...currentNotice, title: e.target.value })}
                  required
                  fullWidth
                />
                <TextField
                  label="Notice Description"
                  variant="outlined"
                  margin="normal"
                  value={currentNotice.description}
                  onChange={(e) => setCurrentNotice({ ...currentNotice, description: e.target.value })}
                  required
                  multiline
                  rows={4}
                  fullWidth
                />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DesktopDatePicker
                      label="Date"
                      inputFormat="MM/dd/yyyy"
                      value={currentNotice.date}
                      onChange={(newDate) => setCurrentNotice({ ...currentNotice, date: newDate })}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                    <TimePicker
                      label="Time"
                      value={currentNotice.time}
                      onChange={(newTime) => setCurrentNotice({ ...currentNotice, time: newTime })}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </div>
                </LocalizationProvider> */}
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Attach File</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.jpg,.png"
                    onChange={(e) => setCurrentNotice({ ...currentNotice, file: e.target.files[0] })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {currentNotice.file && (
                    <p className="text-sm text-gray-500 mt-2">Selected file: {currentNotice.file.name}</p>
                  )}
                </div>
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  <Button type="button" onClick={handleClose} variant="outlined" color="secondary">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    {currentNotice.id ? "Update Notice" : "Add Notice"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal open={deleteOpen} onClose={cancelDelete}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-lg font-semibold">
                Are you sure you want to delete this notice?
              </h2>
              <div className="flex justify-between gap-2">
                <Button variant="outlined" onClick={cancelDelete}>
                  Cancel
                </Button>
                <Button variant="contained" color="error" onClick={confirmDelete}>
                  Confirm Delete
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NoticeBoard;
