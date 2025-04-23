import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useBranch } from "../Pages/Branches"; // Import branch selection

const BlogView = () => {
  const { selectedBranch } = useBranch(); // Get the selected branch

  const commentsMock = [
    { name: "John Doe", email: "john@example.com", comment: "Great post!", branch: "Main Branch" },
    { name: "Jane Smith", email: "jane@example.com", comment: "Very informative.", branch: "City Branch" },
    { name: "Bob Brown", email: "bob@example.com", comment: "Thanks for sharing!", branch: "Westside Branch" },
  ];

  const latestPostsMock = [
    {
      title: "Latest Post 1",
      image: "https://cdn.cdnparenting.com/articles/2018/03/522565846-H.webp",
      date: "Jan 1, 2025",
      branch: "Main Branch",
    },
    {
      title: "Latest Post 2",
      image: "https://cdn.firstcry.com/education/2022/03/07110617/700225975.jpg",
      date: "Jan 2, 2025",
      branch: "City Branch",
    },
    {
      title: "Latest Post 3",
      image: "https://www.shutterstock.com/image-photo/digital-tablet-school-students-classroom-260nw-2303745693.jpg",
      date: "Jan 3, 2025",
      branch: "Westside Branch",
    },
  ];

  const [comments, setComments] = useState(commentsMock);
  const [newComment, setNewComment] = useState({ name: "", email: "", comment: "" });

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = () => {
    if (newComment.name && newComment.email && newComment.comment) {
      setComments((prev) => [...prev, { ...newComment, branch: selectedBranch }]);
      setNewComment({ name: "", email: "", comment: "" });
    }
  };

  // Filter comments and posts by selected branch
  const filteredComments = comments.filter((comment) => comment.branch === selectedBranch);
  const filteredPosts = latestPostsMock.filter((post) => post.branch === selectedBranch);

  // Get the first filtered post image, if exists
  const blogImage = filteredPosts.length > 0 ? filteredPosts[0].image : "https://www.pratham.org/wp-content/uploads/2024/12/3.-About-us-left-image-07.jpg";

  return (
    <div className="overflow-hidden" style={{ height: "90vh" }}>
      <div className="container h-full p-4 mx-auto max-w-7xl">
        <div className="flex flex-col h-full gap-6 lg:flex-row">
          {/* Left Section */}
          <div className="h-full p-4 overflow-y-auto bg-white rounded shadow lg:w-2/3">
            <h1 className="mb-4 text-3xl font-bold">Blog Title</h1>
            <img
              src={blogImage} // ✅ Image updates based on the selected branch
              alt="Blog Post"
              className="w-full h-auto mb-4 rounded"
            />
            <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span>Jan 24, 2025</span>
              <span>Vamsi Krishna</span>
            </div>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus lorem nec tincidunt mollis.
            </p>

            {/* Share Post */}
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-bold">Share the Post</h2>
              <div className="flex gap-4 text-2xl">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-blue-500" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-400" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="text-blue-600" />
                </a>
                <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="text-green-500" />
                </a>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-bold">Comments ({filteredComments.length})</h2>
              {filteredComments.map((comment, index) => (
                <div key={index} className="mb-2">
                  <strong>{comment.name}</strong> ({comment.email}): {comment.comment}
                </div>
              ))}
            </div>

            {/* Leave a Comment */}
            <div>
              <h2 className="mb-2 text-xl font-bold">Leave a Comment</h2>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={newComment.name}
                onChange={handleCommentChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={newComment.email}
                onChange={handleCommentChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <textarea
                placeholder="Comment"
                name="comment"
                value={newComment.comment}
                onChange={handleCommentChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <button onClick={handleCommentSubmit} className="px-4 py-2 text-white bg-blue-500 rounded">
                Submit
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="h-full p-4 overflow-y-auto bg-gray-100 rounded shadow lg:w-1/3">
            {/* Latest Posts */}
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-bold">Latest Posts</h2>
              {filteredPosts.map((post, index) => (
                <div key={index} className="flex items-center mb-4">
                  <img src={post.image} alt={post.title} className="w-12 h-12 mr-4 rounded-full" />
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Blog Categories */}
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-bold">Blog Categories</h2>
              <select className="w-full p-2 border rounded">
                <option value="">Select Category</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
