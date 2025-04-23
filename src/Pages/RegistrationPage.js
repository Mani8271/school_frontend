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

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    userTitle: "",
    address: "",
    role: "",
    status: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.userTitle) newErrors.userTitle = "User title is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", formData);
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
            {/* First Name */}
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

            {/* Last Name */}
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

            {/* Email */}
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

            {/* Mobile */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Grid>

            {/* User Title */}
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

            {/* Address */}
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

            {/* Role */}
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

            {/* Status */}
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

            {/* Password */}
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

            {/* Confirm Password */}
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

            {/* Submit Button */}
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
