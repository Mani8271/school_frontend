// import React, { useState, useEffect } from 'react';
// import {
//   IconButton, Modal, TextField, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Tooltip
// } from '@mui/material';
// import { Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon, NavigateBefore, NavigateNext,Add } from '@mui/icons-material';

// const HolidaysPage = () => {
//   const [holidays, setHolidays] = useState([]);
//   const [newHoliday, setNewHoliday] = useState({ title: '', date: '', description: '' });
//   const [searchQuery, setSearchQuery] = useState('');
//   const [editHolidayId, setEditHolidayId] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [holidayToDelete, setHolidayToDelete] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const holidaysPerPage = 6;

//   // Load holidays from localStorage
//   useEffect(() => {
//     const savedHolidays = JSON.parse(localStorage.getItem('holidays')) || [];
//     setHolidays(savedHolidays);
//   }, []);

//   // Handle form submission for add/edit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (newHoliday.date < new Date().toISOString().split('T')[0]) {
//       alert("Holiday date cannot be in the past!");
//       setLoading(false);
//       return;
//     }

//     let updatedHolidays;
//     if (editHolidayId !== null) {
//       // Editing existing holiday
//       updatedHolidays = holidays.map((holiday) =>
//         holiday.id === editHolidayId ? { ...holiday, ...newHoliday } : holiday
//       );
//     } else {
//       // Adding a new holiday
//       const newHolidayObject = {
//         id: Date.now(),
//         ...newHoliday
//       };
//       updatedHolidays = [newHolidayObject, ...holidays];
//     }

//     setHolidays(updatedHolidays);
//     localStorage.setItem('holidays', JSON.stringify(updatedHolidays));

//     setLoading(false);
//     setModalOpen(false);
//     setNewHoliday({ title: '', date: '', description: '', image: ''});
//     setEditHolidayId(null);
//   };

//   // Handle delete holiday (with confirmation)
//   const handleDelete = () => {
//     if (!holidayToDelete) return;

//     setLoading(true);
//     const updatedHolidays = holidays.filter((holiday) => holiday.id !== holidayToDelete.id);

//     // Update localStorage
//     localStorage.setItem('holidays', JSON.stringify(updatedHolidays));

//     // Update state
//     setHolidays(updatedHolidays);
//     setDeleteDialogOpen(false);
//     setHolidayToDelete(null);
//     setLoading(false);
//   };

//   // Handle edit holiday
//   const handleEdit = (holiday) => {
//     setEditHolidayId(holiday.id);
//     setNewHoliday({ title: holiday.title, date: holiday.date, description: holiday.description, image: holiday.image});
//     setModalOpen(true);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewHoliday({ ...newHoliday, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Filter holidays based on search
//   const filteredHolidays = holidays.filter((holiday) =>
//     holiday.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     holiday.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Reset pagination when search query changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   // Pagination calculations
//   const indexOfLastHoliday = currentPage * holidaysPerPage;
//   const indexOfFirstHoliday = indexOfLastHoliday - holidaysPerPage;
//   const currentHolidays = filteredHolidays.slice(indexOfFirstHoliday, indexOfLastHoliday);

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredHolidays.length / holidaysPerPage);

//   // Handle page change
//   const nextPage = () => setCurrentPage((prev) => prev + 1);
//   const prevPage = () => setCurrentPage((prev) => prev - 1);

//   return (
//     <div className="flex flex-col items-center p-6 overflow-y-auto bg-gray-50 " style={{ height: "90vh" }}>
//   <h1 className="mb-6 text-4xl font-semibold">Holiday Declarations</h1>

//   {/* Search Bar and Add Button with Equal Height */}
//   <div className="flex items-center w-full max-w-xl mb-6 space-x-4">
//     {/* Search Bar */}
//     <TextField
//       label="Search holidays"
//       variant="outlined"
//       fullWidth
//       value={searchQuery}
//       onChange={(e) => setSearchQuery(e.target.value)}
//       sx={{
//         '& .MuiOutlinedInput-root': {
//           height: 56, // Adjust height to match the button
//         },
//         flex: 1, // Allow it to take available space
//       }}
//     />

//     {/* Add/Edit Button */}
//       <Button
//         // variant="contained"
//         color="primary"
//         onClick={() => { 
//           setModalOpen(true); 
//           setEditHolidayId(null); 
//           setNewHoliday({ title: '', date: '', description: '' }); 
//         }}
//         className="mb-6 py-1"
//         startIcon={<Add style={{ fontSize: 30 }} />} // ⬅️ Add icon here
//       >    
//       </Button>
//   </div>

//   {/* Holiday List */}
//   <div className="grid w-full max-w-screen-lg grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" >
//     { currentHolidays.length > 0 ? (
//     currentHolidays.map((holiday) => (
//       <div key={holiday.id} className="p-6 mt-5 bg-white rounded-lg shadow-lg">
//               {holiday.image && (
//                 <img src={holiday.image} alt={holiday.title} className="w-full h-40 rounded-lg object-cover mb-3" />
//               )}
//         <h3 className="text-xl font-semibold">{holiday.title}</h3>
//         <p className="text-gray-500">{holiday.date}</p>
//         <p
//           className="mt-2 text-gray-700"
//           style={{
//             wordWrap: "break-word", // Ensures long words break into new lines
//             overflowWrap: "break-word", // Prevents overflow for long words
//             whiteSpace: "normal", // Allows text to break into multiple lines
//             maxHeight: "150px", // Optional: max height for description
//             overflowY: "auto", // Enables scrolling if text exceeds max height
//           }}
//         >
//           {holiday.description}
//         </p>

//         {/* Edit & Delete Icons */}
//         <div className="flex items-center justify-end mt-4">
//           <IconButton onClick={() => handleEdit(holiday)} color="primary">
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             onClick={() => {
//               setHolidayToDelete(holiday);
//               setDeleteDialogOpen(true);
//             }}
//             color="error"
//           >
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       </div>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="15" className="flex items-center py-4 text-gray-500">
//         No Holidays found
//       </td>
//     </tr>
//   )}
//   </div>

//   {/* Pagination Controls */}
//   <div className="flex items-center justify-center mt-6 space-x-4">
//     <Button
//       onClick={prevPage}
//       disabled={currentPage === 1}
//       startIcon={<NavigateBefore />}
//       variant="contained"
//     >
//       Prev
//     </Button>
//     <span className="text-lg font-semibold">{`Page ${currentPage}`}</span>
//     <Button
//       onClick={nextPage}
//       disabled={indexOfLastHoliday >= filteredHolidays.length}
//       endIcon={<NavigateNext />}
//       variant="contained"
//     >
//       Next
//     </Button>
//   </div>

//   {/* Loading Spinner */}
//   {loading && <CircularProgress className="mt-6" />}

//   {/* Delete Confirmation Dialog */}
//   <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//     <DialogTitle>Confirm Delete</DialogTitle>
//     <DialogContent>
//       <DialogContentText>
//         Are you sure you want to delete this holiday?
//       </DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
//         Cancel
//       </Button>
//       <Button onClick={handleDelete} color="error" variant="contained">
//         Delete
//       </Button>
//     </DialogActions>
//   </Dialog>

//   {/* Modal for Add/Edit Holiday */}
//   <Modal open={isModalOpen} onClose={() => setModalOpen(false)} className="flex items-center justify-center">
//     <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg">
//       <h2 className="mb-4 text-xl font-semibold">{editHolidayId ? "Edit Holiday" : "Add Holiday"}</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <TextField
//           label="Title"
//           fullWidth
//           value={newHoliday.title}
//           onChange={(e) => setNewHoliday({ ...newHoliday, title: e.target.value })}
//           required
//         />
//         <TextField
//           label="Description"
//           fullWidth
//           multiline
//           rows={4} // Set rows to allow multi-line input
//           value={newHoliday.description}
//           onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
//           required
//           sx={{
//             '& .MuiInputBase-root': {
//               wordWrap: 'break-word',  // Ensure the text breaks into new lines if it's too long
//               overflowWrap: 'break-word',
//             },
//           }}
//         />
//         <TextField
//           type="date"
//           fullWidth
//           value={newHoliday.date}
//           onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
//           required
//         />
//         <input type="file" accept="image/*" onChange={handleImageUpload} />
//         <Button type="submit" variant="contained" color="primary" className="mt-4">
//           Save
//         </Button>
//       </form>
//     </div>
//   </Modal>
// </div>

//   );
// };

// export default HolidaysPage;