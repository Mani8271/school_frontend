
// // import React, { useState, useEffect } from 'react';
// // import { Typography, Box, Avatar } from '@mui/material';

// // const Profile = () => {
// //   const [profileImage, setProfileImage] = useState(
// //     "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg"
// //   ); // Default profile image URL

// //   // Fetch profile data or set profile image URL here
// //   // useEffect(() => {
// //   //   setProfileImage(userProfileData.imageUrl);
// //   // }, []);

// //   return (
// //     <div className="p-6 bg-gray-100 " style={{ height: '90vh' }}>
// //       {/* Profile Title */}
// //       <div className="mb-6">
// //         <Typography variant="h5" className="font-semibold text-left">
// //           Profile
// //         </Typography>
// //       </div>

// //       {/* Profile Section (Centered Content) */}
// //       <div className="flex items-center justify-center">
// //         {/* Left Side: Profile Pic, Name, and Profession */}
// //         <div className="flex flex-col items-center w-1/3">
// //           <Avatar
// //             alt="Profile Picture"
// //             src={profileImage}  // Use the state here for dynamic image change
// //             sx={{ width: 120, height: 120 }}
// //             className="mb-4"
// //           />
// //           <Typography variant="h6" className="mb-2 font-bold User">
// //             Vamsi Krishna
// //           </Typography>
// //           <Typography variant="body1" className="text-gray-600">
// //             Software Engineer
// //           </Typography>
// //         </div>

// //         {/* Right Side: Address, Mobile Number, Gender, Email */}
// //         <div className="w-2/4 ml-8">
// //           <Box className="p-6 bg-white rounded-lg shadow-lg">
// //             <div className="mb-4">
// //               <Typography variant="body1" className="font-bold text-gray-700">
// //                 Address:
// //               </Typography>
// //               <Typography variant="body2" className="text-gray-600">
// //                 1234 Street Name, City, Country
// //               </Typography>
// //             </div>
// //             <div className="mb-4">
// //               <Typography variant="body1" className="font-bold text-gray-700">
// //                 Mobile Number:
// //               </Typography>
// //               <Typography variant="body2" className="text-gray-600">
// //                 +123 456 7890
// //               </Typography>
// //             </div>
// //             <div className="mb-4">
// //               <Typography variant="body1" className="font-bold text-gray-700">
// //                 Gender:
// //               </Typography>
// //               <Typography variant="body2" className="text-gray-600">
// //                 Male
// //               </Typography>
// //             </div>
// //             <div className="mb-4">
// //               <Typography variant="body1" className="font-bold text-gray-700">
// //                 Email:
// //               </Typography>
// //               <Typography variant="body2" className="text-gray-600">
// //                 vamsi@gmail.com
// //               </Typography>
// //             </div>
// //           </Box>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;

// import React, { useEffect, useState } from 'react';
// import { Typography, Box, Avatar, IconButton, Modal, TextField, Button, MenuItem } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetuserprofileInitiate } from '../redux/actions/userprofile/getprofiledataAction';

// const Profile = () => {
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(GetuserprofileInitiate());
//   }, [])
//   const userdata = useSelector((state) => state?.userdetails?.data?.data);
//   // console.log("userdata", userdata)
//   const [profile, setProfile] = useState({
//     profileImage: userdata?.profilePicture ? userdata?.profilePicture : "",
//     name: userdata?.firstName ? `${userdata?.firstName} ${userdata?.lastName}` : "",
//     role: userdata?.role ? userdata?.role : "",
//     address: userdata?.address ? userdata?.address : "",
//     mobile: userdata?.mobileNumber ? userdata?.mobileNumber : "",
//     gender: userdata?.userTitle ? userdata?.userTitle === "Mrs" ? "Male" : "Female" : "",
//     email: userdata?.email ? userdata?.email : ""
//   });
//   const [editProfile, setEditProfile] = useState({ ...userdata });
//   console.log('i am editProfile', editProfile)
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleChange = (e) => setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setEditProfile({ ...editProfile, profileImage: URL.createObjectURL(file) });
//   };
//   const handleSave = () => { setProfile(editProfile); handleClose(); };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
//       <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
//         <div className="flex justify-between items-center mb-4">
//           <Typography variant="h5" fontWeight="bold">Profile</Typography>
//           <IconButton onClick={handleOpen} aria-label="edit"><EditIcon /></IconButton>
//         </div>
//         <div className="flex flex-col items-center text-center">
//           <Avatar alt="Profile Picture" src={userdata?.profilePicture} sx={{ width: 120, height: 120 }} className="mb-4" />
//           <Typography variant="h6" fontWeight="bold">{userdata?.firstName} {userdata?.lastName}</Typography>
//           <Typography variant="body1" color="textSecondary">{userdata?.role}</Typography>
//         </div>
//         <Box className="mt-4">
//           {["address", "mobile", "gender", "email"].map((field) => (
//             <Box key={field} className="mb-3">
//               <Typography variant="body2" fontWeight="bold" color="textPrimary">
//                 {field.charAt(0).toUpperCase() + field.slice(1)}:
//               </Typography>
//               <Typography variant="body2" color="textSecondary">{field === "mobile" ? userdata?.["mobileNumber"] : field === "gender" ? userdata?.["userTitle"] === "Mr" ? "Male" : userdata?.["userTitle"] === "Mrs" ? "Others" : "Female" : userdata?.[field]}</Typography>
//             </Box>
//           ))}
//         </Box>
//       </div>

//       {/* Edit Profile Modal */}
//       <Modal open={open} onClose={handleClose} aria-labelledby="edit-profile-modal">
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 800,
//             bgcolor: "white",
//             boxShadow: 3,
//             p: 4,
//             borderRadius: "12px",
//           }}
//         >
//           {/* Title */}
//           <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}>
//             Edit Profile
//           </Typography>

//           {/* Image Upload Section */}
//           <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
//             <Avatar src={editProfile.profileImage} sx={{ width: 150, height: 150, mb: 1 }} />
//             <label htmlFor="image-upload">
//               <input
//                 accept="image/*"
//                 id="image-upload"
//                 type="file"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//               <IconButton color="primary" component="span">
//                 <PhotoCameraIcon />
//               </IconButton>
//             </label>
//           </Box>

//           {/* Form Layout - Two Column Structure */}
//           <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
//             <TextField label="Name" name="name" value={`${editProfile?.firstName} ${editProfile?.lastName}`} onChange={handleChange} fullWidth variant="outlined" />
//             <TextField label="Role" name="role" value={editProfile.role} onChange={handleChange} fullWidth variant="outlined" />

//             <TextField label="Address" name="address" value={editProfile.address} onChange={handleChange} fullWidth variant="outlined" />
//             <TextField label="Mobile" name="mobile" value={editProfile.mobileNumber} onChange={handleChange} fullWidth variant="outlined" />

//             {/* Gender Dropdown */}
//             <TextField select label="Gender" name="gender" value={editProfile?.userTitle === "Mrs" ? "Other" : editProfile?.userTitle === "Mr" ? "Male" : "Female"} onChange={handleChange} fullWidth variant="outlined">
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//               <MenuItem value="Other">Other</MenuItem>
//             </TextField>

//             <TextField label="Email" name="email" value={editProfile.email} onChange={handleChange} fullWidth variant="outlined" />
//           </Box>

//           {/* Buttons Section */}
//           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//             <Button onClick={handleClose} color="secondary">
//               Cancel
//             </Button>
//             <Button onClick={handleSave} variant="contained" color="primary">
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import { Typography, Box, Avatar, IconButton, Modal, TextField, Button, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import { GetuserprofileInitiate } from '../redux/actions/userprofile/getprofiledataAction';
import { UpdateprofiledataInitiate } from '../redux/actions/userprofile/updateprofiledataAction';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state?.userdetails?.data?.data);
  const [profile, setProfile] = useState(null); // Initial state is null
  const [editProfile, setEditProfile] = useState(null); // Initial state is null

  useEffect(() => {
    dispatch(GetuserprofileInitiate());
  }, [dispatch]);

  useEffect(() => {
    if (userdata) {
      const initialProfile = {
        profileImage: userdata?.profilePicture || '',
        name: userdata?.firstName ? `${userdata?.firstName} ${userdata?.lastName}` : '',
        role: userdata?.role || '',
        address: userdata?.address || '',
        mobile: userdata?.mobileNumber || '',
        gender: userdata?.userTitle === 'Mr' ? 'Male' : userdata?.userTitle === 'Miss' ? 'Female' : 'Other',
        email: userdata?.email || '',
      };
      setProfile(initialProfile);
      setEditProfile({ ...initialProfile });
    }
  }, [userdata]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setEditProfile({ ...editProfile, profileImage: URL.createObjectURL(file) });
  };
  const handleSave = () => {
    // Validate data before proceeding (example: ensuring all required fields are filled)
    if (!editProfile.name || !editProfile.email) {
      console.error("Validation failed: Name and Email are required.");
      return;
    }

    // Prepare form data for API
    const formdata = {
      firstName: editProfile?.name?.split(' ')?.[0] || '', 
      lastName: editProfile?.name?.split(' ')?.slice(1).join(' ') || '',
      email: editProfile?.email,
      mobileNumber: editProfile?.mobile,
      userTitle: editProfile?.gender,
      address: editProfile?.address,
      role: editProfile?.role,
      profilePicture: editProfile?.profileImage,
    };
    const jsonData = JSON.stringify(formdata);
    // Dispatch the update action
    dispatch(UpdateprofiledataInitiate(jsonData))


  };


  if (!profile) return <Typography>Loading...</Typography>; // Render loading state

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" fontWeight="bold">Profile</Typography>
          <IconButton onClick={handleOpen} aria-label="edit"><EditIcon /></IconButton>
        </div>
        <div className="flex flex-col items-center text-center">
          <Avatar alt="Profile Picture" src={profile.profileImage} sx={{ width: 120, height: 120 }} className="mb-4" />
          <Typography variant="h6" fontWeight="bold">{profile.name}</Typography>
          <Typography variant="body1" color="textSecondary">{profile.role}</Typography>
        </div>
        <Box className="mt-4">
          {['address', 'mobile', 'gender', 'email'].map((field) => (
            <Box key={field} className="mb-3">
              <Typography variant="body2" fontWeight="bold" color="textPrimary">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </Typography>
              <Typography variant="body2" color="textSecondary">{profile[field]}</Typography>
            </Box>
          ))}
        </Box>
      </div>

      {/* Edit Profile Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="edit-profile-modal">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "white",
            boxShadow: 3,
            p: 4,
            borderRadius: "12px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "left" }}>
            Edit Profile
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar src={editProfile.profileImage} sx={{ width: 150, height: 150, mb: 1 }} />
            <label htmlFor="image-upload">
              <input
                accept="image/*"
                id="image-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <IconButton color="primary" component="span">
                <PhotoCameraIcon />
              </IconButton>
            </label>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            <TextField label="Name" name="name" value={editProfile.name} onChange={handleChange} fullWidth variant="outlined" />
            <TextField label="Role" name="role" value={editProfile.role} onChange={handleChange} fullWidth variant="outlined" />
            <TextField label="Address" name="address" value={editProfile.address} onChange={handleChange} fullWidth variant="outlined" />
            <TextField label="Mobile" name="mobile" value={editProfile.mobile} onChange={handleChange} fullWidth variant="outlined" />
            <TextField select label="Gender" name="gender" value={editProfile.gender} onChange={handleChange} fullWidth variant="outlined">
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Miss">Mrs</MenuItem>
            <MenuItem value="Other">Miss</MenuItem>
            </TextField>
            <TextField label="Email" name="email" value={editProfile.email} onChange={handleChange} fullWidth variant="outlined" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button onClick={handleClose} color="secondary">Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;

