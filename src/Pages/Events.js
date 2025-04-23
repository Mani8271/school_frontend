import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Add, Edit, Delete, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useBranch } from "./Branches"; 


const Events = () => {
  const initialEvents = [
    {
      id: 1,
      branch: "Main Branch",
      title: "Annual Sports Meet",
      description:
        "Join us for the Annual Sports Meet on 15th February 2025. A day full of athletic competitions and team events. It's a great opportunity to showcase your talents and enjoy a fun-filled day.",
      date: "2025-02-15",
      time: "9:00 AM",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
    {
      id: 2,
      branch: "City Branch",
      title: "PTA Meeting",
      description:
        "The Parent-Teacher Association meeting is scheduled for 5th February 2025. Discussions about school progress and upcoming events. Parents are encouraged to attend and engage in the school community.",
      date: "2025-02-05",
      time: "10:00 AM",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
    {
      id: 3,
      branch: "Westside Branch",
      title: "Annual Exams",
      description:
        "The Annual Exams are scheduled to begin on 2nd April 2025. Prepare yourself for the most important academic assessment of the year. Good luck to all students as they give their best efforts.",
      date: "2025-04-02",
      time: "8:00 AM",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
  ];
  const { selectedBranch } = useBranch();
  const [events, setEvents] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableEvent, setEditableEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [eventDateTime, setEventDateTime] = useState("");

  const eventsPerPage = 3;

  const filteredEvents = events.filter(
    (event) =>
      event.branch === selectedBranch && // 🔥 Filter by branch
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const validateForm = () => {
    const newErrors = {};
    if (!editableEvent.title.trim()) newErrors.title = "Title is required.";
    if (!editableEvent.description.trim())
      newErrors.description = "Description is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDeleteImage = (image) => {
    setEditableEvent((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== image),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));

    setEditableEvent((prev) => ({
      ...prev,
      images: [...new Set([...prev.images, ...newImages])],
    }));
  };

  const handleSave = () => {
    if (!validateForm()) return;
    if (editableEvent.id) {
      setEvents((prev) =>
        prev.map((event) => (event.id === editableEvent.id ? editableEvent : event))
      );
    } else {
      setEvents((prev) => [
        {
          ...editableEvent,
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString(),
          branch: selectedBranch, // 🔥 Ensure event is saved under the selected branch
        },
        ...prev,
      ]);
    }
    setIsModalOpen(false);
    setEditableEvent(null);
    setErrors({});
  };
  
  const handleEdit = (event) => {
    setEditableEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      setEvents((prev) => prev.filter((event) => event.id !== id));
    }
  };

  // Open "Read More" Modal (Show more details)
  const handleReadMore = (event) => {
    setEventDetails(event);
    setIsModalOpen(true);
  };

  const handleModalOpen = () => {
    setEditableEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      images: [],
      branch: selectedBranch, // 🔥 Assign the selected branch
    });
    setIsModalOpen(true);
  };
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditableEvent(null);
    setEventDetails(null);
  };

  // Reset pagination when search query changes
  useEffect(() => {
  setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen p-0 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-center text-black-600">Events</h1>

      <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm md:w-1/3 focus:ring-2 focus:ring-blue-500"
        />
        <IconButton
          onClick={handleModalOpen}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
        >
          <Add className="text-blue-600" style={{ fontSize: 30 }} />
        </IconButton>
      </div>

      {currentEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {currentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border-l-4 border-blue-500 shadow-md p-4 rounded-lg hover:shadow-lg"
            >
              {event.images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {event.images.map((image, idx) => (
                    <div key={idx} className="w-auto h-40">
                      <img
                        src={image}
                        alt={event.title}
                        className="w-full h-full object-contain rounded-t-md"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="w-full h-40">
                  <img
                    src={event.images[0]}
                    alt={event.title}
                    className="w-full h-full object-contain rounded-t-md"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold text-blue-600 mt-5">{event.title}</h2>
              <p className="text-sm text-gray-500">
                Date: {event.date} | Time: {event.time}
              </p>
              <p className="text-gray-700 my-2">{event.description.slice(0, 100)}...</p>
              <div className="flex justify-between mt-4">
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => handleReadMore(event)}
                >
                  Read More
                </span>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Event"
                  >
                    <Edit className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Event"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>No events available. Add a new event to get started.</p>
        </div>
      )}

      {/* Read More Modal */}
      {isModalOpen && eventDetails && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-11/12 max-w-5xl p-6 rounded-lg shadow-lg overflow-y-auto overflow-x-hidden max-h-[700px]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-600">
                {eventDetails.title}
              </h2>
              <IconButton onClick={closeModal}>
                <Close />
              </IconButton>
            </div>
            <p className="text-sm text-gray-500">
              Date: {eventDetails.date} | Time: {eventDetails.time}
            </p>
            
            {/* Conditional rendering for Slider or single image */}
            <div className="mt-4">
              {eventDetails.images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {eventDetails.images.map((image, idx) => (
                    <div key={idx}>
                      <img
                        src={image}
                        alt={eventDetails.title}
                        className="w-full h-64 object-contain mx-auto"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="w-3/4 mx-auto">
                  <img
                    src={eventDetails.images[0]}
                    alt={eventDetails.title}
                    className="w-full h-64 object-contain"
                  />
                </div>
              )}
            </div>


            <p className="text-gray-700 mt-8">{eventDetails.description}</p>
          </div>
        </div>
      )}

      {/* Modal for Add/Edit Event */}
      {isModalOpen && editableEvent && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-11/12 max-w-2xl p-6 rounded-lg shadow-lg"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-600">
                {editableEvent.id ? "Edit Event" : "Add New Event"}
              </h2>
              <IconButton onClick={closeModal}>
                <Close />
              </IconButton>
            </div>

            {/* Scrollable Form Container */}
            <div className=" p-4 border border-gray-300 rounded-lg max-h-[60vh] overflow-y-auto">
              {/* Form for Title and Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editableEvent.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editableEvent.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows={4}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              {/* Display Uploaded Images */}
              <div className="mb-4">
                <h3 className="text-lg font-medium">Uploaded Images:</h3>
                <div className="flex flex-wrap gap-4">
                  {editableEvent.images.map((image, idx) => (
                    <div key={idx} className="relative w-64 h-32">
                      <img
                        src={image}
                        alt={`Event Image ${idx + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleDeleteImage(image)}
                        className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-lg hover:bg-red-600"
                      >
                        <Delete style={{ fontSize: 16 }} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white p-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white p-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>            
          </div>
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-6 gap-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-white font-medium transition ${
          currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        Previous
      </button>
      <span className="text-lg font-semibold"> {`Page ${currentPage} of ${totalPages}`} </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-white font-medium transition ${
          currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        Next
      </button>
      </div>

      
    </div>
  );
};

export default Events;