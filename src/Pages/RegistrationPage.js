import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerInitiate } from "../redux/actions/loginandsignup/registerAction";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    userTitle: "",
    address: "",
    role: "",
    status: "",
    password: "",
    confirmPassword: "",
    profilePicture: null, // ✅ Added profilePicture to the initial state
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required";
    if (!formData.userTitle) newErrors.userTitle = "User title is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     const data = new FormData();

  //     for (let key in formData) {
  //       data.append(key, formData[key]);
  //     }

  //     // ✅ Debug: log FormData content before sending
  //     for (let pair of data.entries()) {
  //       console.log(pair[0] + ": ", pair[1]);
  //     }

  //       console.log("dataaaa",data)
  //     dispatch(registerInitiate(data, navigate));
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = new FormData();
      console.log("formdata", formData)
      // Append other form fields to FormData
      for (let key in formData) {
        // Skip the profilePicture as it's handled separately
        if (key === 'profilePicture') continue;
        data.append(key, formData[key]);
      }

      // Add profilePicture to FormData if it exists
      if (formData.profilePicture) {
        console.log("Appending profile picture:", formData.profilePicture); // Debug: Check profile picture
        data.append("profilePicture", formData.profilePicture);
      }

      // Debug: Log the FormData content by iterating over it
      for (let pair of data.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      // Dispatch the data
      dispatch(registerInitiate(data, navigate));
    }
  };







  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registration Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="User Title"
                name="userTitle"
                value={formData.userTitle}
                onChange={handleChange}
                error={!!errors.userTitle}
                helperText={errors.userTitle}
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
                <MenuItem value="Miss">Miss</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={2}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={!!errors.role}
                helperText={errors.role}
              >
                <MenuItem value="Super Admin">Super Admin</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                error={!!errors.status}
                helperText={errors.status}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <input
              accept="image/*"
              type="file"
              name="profilePicture"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log("Selected file:", file);  // Debug: Log selected file
                setFormData({ ...formData, profilePicture: file });
              }}
            />

            {formData.profilePicture && (
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt="Profile Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
              />
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;
