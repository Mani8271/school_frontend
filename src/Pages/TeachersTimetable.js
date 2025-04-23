import React, { useState } from "react";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { useBranch } from "../Pages/Branches"; // Import branch context
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Define branch-wise classes
const branchData = {
  "Main Branch": ["1A", "2A", "3A", "5B"],
  "City Branch": ["2B", "3B"],
  "Westside Branch": ["4A", "4B"],
};

// Initial Schedule Data
const initialSchedule = [
  { day: "Monday", time: "10:00", class: "1A", subject: "English", teacher: "Mr. Smith" },
  { day: "Monday", time: "02:00", class: "2B", subject: "English", teacher: "Mr. Smith" },
  { day: "Tuesday", time: "10:00", class: "2A", subject: "English", teacher: "Mr. Smith" },
  { day: "Tuesday", time: "02:00", class: "3B", subject: "English", teacher: "Mr. Smith" },
  { day: "Monday", time: "09:00", class: "3A", subject: "Math", teacher: "Mrs. Johnson" },
  { day: "Wednesday", time: "11:00", class: "5B", subject: "Science", teacher: "Ms. Wilson" },
  { day: "thursday", time: "11:00", class: "4B", subject: "Science", teacher: "Ms. Wilson" },
  { day: "friday", time: "11:00", class: "4A", subject: "Science", teacher: "Ms. Wilson" },
];

const teachers = ["Mr. Smith", "Mrs. Johnson", "Ms. Wilson"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function TeacherTimetable() {
  const { selectedBranch } = useBranch(); // Get selected branch
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ day: "", time: "", class: "", subject: "", teacher: "" });
  const navigate = useNavigate();

  // Handle input change for adding new schedule entry
  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // Handle saving a new schedule entry
  const handleSave = () => {
    setSchedule([...schedule, newEntry]);
    setOpenModal(false);
    setNewEntry({ day: "", time: "", class: "", subject: "", teacher: "" });
  };

  return (
    <Container sx={{ mt: 3 }}>
      <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="flex items-center text-gray-700 hover:text-gray-900 font-semibold mb-4"
      >
        <IoArrowBack className="mr-2 text-2xl" /> {/* Back Icon */}
        Back
      </button>

      {/* Heading */}
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Teacher Timetable - {selectedBranch}
      </Typography>
    </div>

      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        {/* Teacher Selection Dropdown */}
        <TextField
          select
          label="Select Teacher"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          sx={{ width: 200, marginTop: 2 }}
        >
          <MenuItem value="">All Teachers</MenuItem>
          {teachers.map((teacher) => (
            <MenuItem key={teacher} value={teacher}>
              {teacher}
            </MenuItem>
          ))}
        </TextField>

        {/* Add Class Icon */}
        <Tooltip title="Add Class">
          <IconButton color="primary" onClick={() => setOpenModal(true)}>
            <Add />
          </IconButton>
        </Tooltip>
      </Grid>

      {/* Modal for Adding Class */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Class
          </Typography>
          
          {/* Day Selection */}
          <TextField
            fullWidth
            select
            label="Day"
            name="day"
            value={newEntry.day}
            onChange={handleChange}
            margin="normal"
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>

          {/* Time Input */}
          <TextField fullWidth label="Time" name="time" value={newEntry.time} onChange={handleChange} margin="normal" />

          {/* Class Selection - Filtered by Selected Branch */}
          <TextField
            fullWidth
            select
            label="Class"
            name="class"
            value={newEntry.class}
            onChange={handleChange}
            margin="normal"
          >
            {branchData[selectedBranch]?.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </TextField>

          {/* Subject Input */}
          <TextField fullWidth label="Subject" name="subject" value={newEntry.subject} onChange={handleChange} margin="normal" />

          {/* Teacher Selection */}
          <TextField
            fullWidth
            select
            label="Teacher"
            name="teacher"
            value={newEntry.teacher}
            onChange={handleChange}
            margin="normal"
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher} value={teacher}>
                {teacher}
              </MenuItem>
            ))}
          </TextField>

          {/* Save Button */}
          <Button variant="contained" color="primary" fullWidth onClick={handleSave} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>

      {/* Timetable Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Day</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Class</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {daysOfWeek.map((day) =>
              schedule
                .filter(
                  (entry) =>
                    entry.day === day &&
                    (!selectedTeacher || entry.teacher === selectedTeacher) &&
                    branchData[selectedBranch]?.includes(entry.class) // Filter by branch
                )
                .map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.day}</TableCell>
                    <TableCell>{entry.time}</TableCell>
                    <TableCell>{entry.class}</TableCell>
                    <TableCell>{entry.subject}</TableCell>
                    <TableCell>{entry.teacher}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default TeacherTimetable;
