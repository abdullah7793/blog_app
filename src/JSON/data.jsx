import { useState } from "react";
import axios from "axios";

const Modal = ({
  isOpen,
  onClose,
  message,
  onSubmit,
  formData,
  setFormData,
}) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        {message ? (
          <>
            <h2 className="text-xl font-bold mb-4">Message</h2>
            <p className="mb-6">{message}</p>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Add New Data</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Title:</label>
                <input
                  type="text"
                  placeholder="Enter your title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Blog Image URL:</label>
                <input
                  type="URL"
                  name="blogImage"
                  value={formData.blogImage}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">User Name:</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description:</label>
                <textarea
                  rows="2"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Enter your description"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const PostData = () => {
  const [formData, setFormData] = useState({
    title: "",
    blogImage: "",
    userName: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      title: formData.title,
      blog_img: formData.blogImage,
      user_name: formData.userName,
      description: formData.description,
    };
    try {
      const response = await axios.post("http://localhost:3008/posts", newData);
      setMessage(`Data added successfully: ${JSON.stringify(response.data)}`);
      setFormData({
        title: "",
        blogImage: "",
        userName: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding data:", error);
      setMessage("Failed to add data.");
    } finally {
      setModalOpen(true);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="text-black">
      <button
        onClick={openModal}
        className="fixed bottom-2 right-20 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        Open Form
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={message}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default PostData;
