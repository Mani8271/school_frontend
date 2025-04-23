import React, { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { useBranch } from "../Pages/Branches";

const useStyles = makeStyles({
  modal: {
    minWidth: "500px",
  },
});

const BlogList = () => {
  const [showModal, setShowModal] = useState(false);
  const { selectedBranch } = useBranch();
  // 🔥 Mock Data Added
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "The Future of AI in Education",
      image: "https://source.unsplash.com/600x400/?technology,ai",
      category: "Technology",
      subCategory: "Artificial Intelligence",
      description: "Exploring how AI is transforming the education sector.",
      tags: "AI, Education, Future",
      status: "Active",
      date: "Feb 10, 2025",
      branch: "Main Branch", // ✅ Branch Added
    },
    {
      id: 2,
      title: "Top 10 Coding Best Practices",
      image: "https://source.unsplash.com/600x400/?coding,programming",
      category: "Programming",
      subCategory: "Best Practices",
      description: "A guide to writing clean and efficient code.",
      tags: "Coding, Clean Code, Best Practices",
      status: "Active",
      date: "Feb 8, 2025",
      branch: "City Branch", // ✅ Branch Added
    },
    {
      id: 3,
      title: "Mental Health and Productivity",
      image: "https://source.unsplash.com/600x400/?mentalhealth,work",
      category: "Health",
      subCategory: "Wellness",
      description: "How to maintain good mental health while working.",
      tags: "Health, Productivity, Work-Life Balance",
      status: "Active",
      date: "Feb 5, 2025",
      branch: "Westside Branch", // ✅ Branch Added
    },
  ]);
  

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: "",
    subCategory: "",
    description: "",
    tags: "",
    status: "Active",
  });

  const [editBlogId, setEditBlogId] = useState(null);
  const classes = useStyles();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const getFormattedDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handlePublish = () => {
    const blogWithDate = {
      ...formData,
      date: getFormattedDate(),
      id: Date.now(),
    };

    if (editBlogId !== null) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === editBlogId ? { ...blog, ...blogWithDate } : blog
        )
      );
    } else {
      setBlogs((prevBlogs) => [...prevBlogs, blogWithDate]);
    }

    setFormData({
      title: "",
      image: null,
      category: "",
      subCategory: "",
      description: "",
      tags: "",
      status: "Active",
    });
    setEditBlogId(null);
    handleCloseModal();
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      image: blog.image,
      category: blog.category,
      subCategory: blog.subCategory,
      description: blog.description,
      tags: blog.tags,
      status: blog.status,
    });
    setEditBlogId(blog.id);
    handleShowModal();
  };

  const handleDelete = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="mb-3 ml-4 row">
        <div className="col">
          <h2 className="text-2xl font-bold">Blog List</h2>
        </div>
      </div>

      <div className="mb-3 row">
        <div className="text-right col" title="Add Blog">
          <Button
            color="primary"
            startIcon={
              <AddIcon style={{ fontSize: "34px", marginRight: "8px" }} />
            }
            onClick={handleShowModal}
          ></Button>
        </div>
      </div>

      {/* 🔥 Blog Cards Displaying Mock Data */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {blogs
          .filter((blog) => blog.branch === selectedBranch) // ✅ Show only blogs for selected branch
          .map((blog) => (
            <div key={blog.id} className="mb-4">
              <div className="border rounded-lg shadow-md">
                {blog.image && (
                  <img
                    src={blog.image}
                    className="object-cover w-full h-48 rounded-t-lg"
                    alt="Blog"
                  />
                )}
                <div className="p-4">
                  <h5 className="text-lg font-semibold">{blog.title}</h5>
                  <p className="text-sm">{blog.description}</p>
                  <a
                    href={`http://localhost:3000/blogs/blogview`}
                    className="text-blue-500 underline"
                  >
                    Read More
                  </a>
                </div>
                <div className="flex items-center justify-between p-3 text-sm text-gray-500">
                  <span>{blog.date}</span>
                  <div>
                    <i
                      className="mr-2 text-blue-500 cursor-pointer bi bi-pencil"
                      onClick={() => handleEdit(blog)}
                    ></i>
                    <i
                      className="text-red-500 cursor-pointer bi bi-trash"
                      onClick={() => handleDelete(blog.id)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Add Blog Modal */}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <div className="max-w-3xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
          <h3 className="mb-6 text-2xl font-semibold text-center">Add Blog</h3>
          <form>
            {/* Blog Name */}
            <div className="mb-4">
              <TextField
                label="Blog Name"
                variant="outlined"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Blog Image */}
            <div className="mb-4">
              <TextField
                type="file"
                label="Blog Image"
                onChange={handleFileChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </div>

            {/* Blog Category */}
            <div className="mb-4">
              <FormControl fullWidth>
                <InputLabel>Blog Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  label="Blog Category"
                >
                  <MenuItem value="">
                    <em>Select category</em>
                  </MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Programming">Programming</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Blog Description */}
            <div className="mb-4">
              <TextField
                label="Blog Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-6 mt-4">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePublish}
              >
                Publish
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default BlogList;
