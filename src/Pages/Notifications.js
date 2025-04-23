// import React, { useState, useEffect } from "react";
// import { Modal, Button, TextField, IconButton} from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import SearchIcon from "@mui/icons-material/Search"; // Import SearchIcon
// import { debounce } from "lodash"; // Import lodash for debouncing
// import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

// const Notifications = () => {
//   const [open, setOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false); // For confirmation modal
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
//   const [notices, setNotices] = useState([
//     {
//       id: 1,
//       title: "School Closure",
//       description: "School will remain closed on 25th December for holidays.",
//       date: new Date("2025-12-25"),
//       time: new Date("2025-12-25T10:00:00"),
//     },
//     {
//       id: 2,
//       title: "Exam Schedule",
//       description: "Exams will begin from 10th January.",
//       date: new Date("2025-01-10"),
//       time: new Date("2025-01-10T09:00:00"),
//     },
//     {
//       id: 3,
//       title: "Parent-Teacher Meeting",
//       description: "A Parent-Teacher meeting will be held on 5th February at 2:00 PM.",
//       date: new Date("2025-02-05"),
//       time: new Date("2025-02-05T14:00:00"),
//     },
//     {
//       id: 4,
//       title: "New Semester Starts",
//       description: "The new semester will begin on 1st March.",
//       date: new Date("2025-03-01"),
//       time: new Date("2025-03-01T08:00:00"),
//     },
//     {
//       id: 5,
//       title: "Holiday Notice",
//       description: "The school will be closed for summer holidays from 15th June to 30th June.",
//       date: new Date("2025-06-15"),
//       time: new Date("2025-06-15T00:00:00"),
//     },
//     {
//       id: 6,
//       title: "New Semester Starts",
//       description: "The new semester will begin on 1st March.",
//       date: new Date("2025-03-01"),
//       time: new Date("2025-03-01T08:00:00"),
//     },
//     {
//       id: 7,
//       title: "Holiday Notice",
//       description: "The school will be closed for summer holidays from 15th June to 30th June.",
//       date: new Date("2025-06-15"),
//       time: new Date("2025-06-15T00:00:00"),
//     },
//   ]);
//   const [currentNotice, setCurrentNotice] = useState({
//     title: "",
//     description: "",
//     date: new Date(),
//     time: new Date(),
//     file: null,
//   });
//   const [noticeToDelete, setNoticeToDelete] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const noticesPerPage = 3; // Number of notices per page

//   // Debounced search
//   const debouncedSearch = debounce(
//     (query) => setDebouncedSearchQuery(query),
//     500
//   );

//   useEffect(() => {
//     debouncedSearch(searchQuery);
//     return () => debouncedSearch.cancel(); // Cleanup on unmount
//   }, [searchQuery]);

//   const handleOpen = (notice = null) => {
//     setCurrentNotice(
//       notice || {
//         title: "",
//         description: "",
//         date: new Date(),
//         time: new Date(),
//         file: null
//       }
//     );
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (currentNotice.id) {
//       setNotices(notices.map((notice) => notice.id === currentNotice.id ? { ...notice, ...currentNotice } : notice));
//     } else {
//       setNotices([{ id: notices.length + 1, ...currentNotice }, ...notices]);
//     }
//     setOpen(false);
//   };

//   const handleDelete = (id) => {
//     setNoticeToDelete(id);
//     setDeleteOpen(true);
//   };

//   const confirmDelete = () => {
//     setNotices(notices.filter((notice) => notice.id !== noticeToDelete));
//     setDeleteOpen(false);
//   };

//   const handleFileDelete = (id) => {
//     setNotices((prevNotices) =>
//       prevNotices.map((notice) =>
//         notice.id === id ? { ...notice, file: null } : notice
//       )
//     );
//   };

//   const cancelDelete = () => {
//     setDeleteOpen(false);
//   };

//   const filteredNotices = notices.filter(
//     (notice) =>
//       notice.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
//       notice.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
//   );

//   // Reset pagination when search query changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   // Get current notices based on pagination
//   const indexOfLastNotice = currentPage * noticesPerPage;
//   const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
//   const currentNotices = filteredNotices.slice(
//     indexOfFirstNotice,
//     indexOfLastNotice
//   );

//   const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center " style={{ height: "90vh" }}>
//       <div className="container max-w-5xl p-6">
//         <h1 className="mt-0 mb-3 text-3xl font-bold text-left">Notice Board</h1>

//         {/* Search Bar and Add New Notice Button */}
//         <div className="flex items-center justify-between gap-0 mb-2 lg:flex-row">
//           {/* Search Bar */}
//           <TextField
//             label="Search Notices"
//             variant="outlined"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             margin="normal"
//             sx={{
//               width: { xs: "100%", sm: "calc(100% - 0px)", margin: 'auto' }, // Responsive width
//               "& .MuiOutlinedInput-root": { backgroundColor: "#f5f5f5" },
//             }}
//           />

//           <Button
//             onClick={() => handleOpen()}
//             color="primary"
//             sx={{
//               py: 2,
//               display: 'flex',
//               alignItems: 'center', // This ensures the icon is properly aligned
//               justifyContent: 'between', // Centers the icon in the button
//             }}
//           >
//             <Add sx={{ fontSize: 30 }} /> {/* The "+" icon */}
//           </Button>
//         </div>

//         {/* Displaying Filtered Notices */}
//         {filteredNotices.length === 0 ? (
//           <div className="mt-10 text-center text-gray-500">
//             <p>No notices available. Add a new notice!</p>
//           </div>
//         ) : (
//         <div className="w-[980px] max-h-[450px] overflow-x-auto border border-gray-300 p-4 rounded-md shadow-md bg-white">
//             <div className="grid grid-cols-1 gap-6">
//               {currentNotices.map((notice) => (
//                 <div key={notice.id} className="w-[920px] mx-auto p-2 border border-gray-300 rounded-md shadow-sm bg-white">
//                   <h2 className="font-semibold text-xl mb-2">{notice.title}</h2>

//                   {/* Scrollable Description */}
//                   <div>
//                     <p className="text-gray-600">{notice.description}</p>
//                   </div>

//                   {/* File Display with Download & Delete Buttons */}
//                   {notice.file && (
//                     <div className="p-2 rounded-md flex items-center gap-3">
//                       <p className="text-sm text-gray-700">📄 {notice.file.name}</p>
//                       <div className="flex justify-center items-center gap-0">
//                         {/* Download Button */}
//                         <a href={URL.createObjectURL(notice.file)} download={notice.file.name}>
//                           <IconButton color="primary" aria-label="Download File">
//                             <DownloadForOfflineIcon />
//                           </IconButton>
//                         </a>

//                         {/* Delete Button */}
//                         <IconButton onClick={() => handleFileDelete(notice.id)} color="error" aria-label="Delete File">
//                           <Delete />
//                         </IconButton>
//                       </div>
//                     </div>
//                   )}

//                   {/* Actions */}
//                   <div className="flex justify-between items-end space-x-2">
//                     <div>
//                       <p className="text-xs text-gray-400">
//                         {notice.date.toLocaleDateString()} at {notice.time.toLocaleTimeString()}
//                       </p>
//                     </div>
//                     <div>
//                       <IconButton onClick={() => handleOpen(notice)} color="primary" aria-label="Edit Notice">
//                         <Edit />
//                       </IconButton>
//                       <IconButton onClick={() => handleDelete(notice.id)} color="error" aria-label="Delete Notice">
//                         <Delete />
//                       </IconButton>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}


//         {/* Pagination Buttons */}
//         <div className="flex items-center justify-between gap-0 mt-4">
//         <button
//           onClick={handlePrev}
//           disabled={currentPage === 1}
//           className={`px-4 py-2 text-white font-medium transition ${
//             currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           Prev
//         </button>
//         <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className={`px-4 py-2 text-white font-medium transition ${
//             currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           Next
//         </button>
//         </div>

//         {/* Modal for Adding/Editing Notices */}
//         <Modal open={open} onClose={handleClose}>
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
//               <h2 className="mb-4 text-xl font-semibold">
//                 {currentNotice.id ? "Edit Notice" : "Add New Notice"}
//               </h2>
//               <form onSubmit={handleSubmit}>
//                 <TextField
//                   label="Notice Title"
//                   fullWidth
//                   variant="outlined"
//                   margin="normal"
//                   value={currentNotice.title}
//                   onChange={(e) =>
//                     setCurrentNotice({ ...currentNotice, title: e.target.value })
//                   }
//                   required
//                 />
//                 <TextField
//                   label="Notice Description"
//                   fullWidth
//                   variant="outlined"
//                   margin="normal"
//                   value={currentNotice.description}
//                   onChange={(e) =>
//                     setCurrentNotice({ ...currentNotice, description: e.target.value })
//                   }
//                   required
//                   multiline
//                   rows={4}
//                 />
//                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                   <div className="flex gap-4 mt-4">
//                     <DesktopDatePicker
//                       label="Date"
//                       inputFormat="MM/dd/yyyy"
//                       value={currentNotice.date}
//                       onChange={(newDate) =>
//                         setCurrentNotice({ ...currentNotice, date: newDate })
//                       }
//                       renderInput={(params) => (
//                         <TextField {...params} fullWidth margin="normal" />
//                       )}
//                     />
//                     <TimePicker
//                       label="Time"
//                       value={currentNotice.time}
//                       onChange={(newTime) =>
//                         setCurrentNotice({ ...currentNotice, time: newTime })
//                       }
//                       renderInput={(params) => (
//                         <TextField {...params} fullWidth margin="normal" />
//                       )}
//                     />
//                   </div>
//                 </LocalizationProvider>
//                 {/* File Upload Input */}
//                 <div className="mt-4">
//                   <label className="block text-sm font-medium text-gray-700">Attach File</label>
//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.jpg,.png"
//                     onChange={(e) => setCurrentNotice({ ...currentNotice, file: e.target.files[0] })}
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                   {currentNotice.file && (
//                     <p className="text-sm text-gray-500 mt-2">Selected file: {currentNotice.file.name}</p>
//                   )}
//                 </div>
//                 <div className="flex justify-between gap-2 mt-4">
//                   <Button type="button" onClick={handleClose} variant="outlined" color="secondary">
//                     Cancel
//                   </Button>
//                   <Button type="submit" variant="contained" color="primary">
//                     {currentNotice.id ? 'Update Notice' : 'Add Notice'}
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </Modal>

//         {/* Delete Confirmation Modal */}
//         <Modal open={deleteOpen} onClose={cancelDelete}>
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//               <h2 className="mb-4 text-lg font-semibold">
//                 Are you sure you want to delete this notice?
//               </h2>
//               <div className="flex justify-between gap-2">
//                 <Button variant="outlined" onClick={cancelDelete}>
//                   Cancel
//                 </Button>
//                 <Button variant="contained" color="error" onClick={confirmDelete}>
//                   Confirm Delete
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Notifications;

import React from "react";

const notifications = [
  { id: 1, title: "New Order Received", description: "You have received a new order from John Doe. Please verify the details and process it within the next 2 hours.", date: "Feb 28, 2025", time: "10:45 AM" },
  { id: 2, title: "Server Maintenance Scheduled", description: "The server will undergo maintenance from 12:00 AM to 2:00 AM. During this time, some services may be unavailable.", date: "Feb 27, 2025", time: "09:30 PM" },
  { id: 3, title: "New User Registration", description: "A new user, Jane Smith, has signed up. Verify the account and assign appropriate permissions.", date: "Feb 27, 2025", time: "03:15 PM" },
  { id: 4, title: "Payment Received", description: "Payment of $250 has been received from Michael Brown for Order #124578.", date: "Feb 26, 2025", time: "06:20 PM" },
];

// Function to check if a notification is from today, yesterday, or older
const categorizeNotifications = (notifications) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (dateStr) => new Date(dateStr).toDateString();

  const todayFormatted = today.toDateString();
  const yesterdayFormatted = yesterday.toDateString();

  return {
    today: notifications.filter((n) => formatDate(n.date) === todayFormatted),
    yesterday: notifications.filter((n) => formatDate(n.date) === yesterdayFormatted),
    older: notifications.filter((n) => formatDate(n.date) !== todayFormatted && formatDate(n.date) !== yesterdayFormatted),
  };
};

const Notifications = () => {
  const { today, yesterday, older } = categorizeNotifications(notifications);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-start">Notifications</h2>

      <div className="max-h-[73vh] overflow-y-auto space-y-5 p-2">
        {[{ label: "Today", data: today }, { label: "Yesterday", data: yesterday }, { label: "Older", data: older }].map(
          ({ label, data }) =>
            data.length > 0 && (
              <div key={label}>
                <h3 className="text-xl font-bold text-gray-700 border-b-2 border-gray-300 pb-1">{label}</h3>
                {data.map((notification) => (
                  <div key={notification.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-900 hover:shadow-xl transition-all mt-4">
                    <h3 className="text-xl font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-gray-700 mt-2 text-lg">{notification.description}</p>
                    <div className="flex justify-between text-gray-500 text-sm mt-4">
                      <span className="font-medium">{notification.date}</span>
                      <span className="font-medium">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Notifications;