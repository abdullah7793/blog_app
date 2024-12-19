import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebook, FaPlusCircle } from "react-icons/fa";

const Modal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Post</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Image URL:</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description:</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded mr-2"
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
      </div>
    </div>
  );
};

const Display = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    age: "",
    description: "",
    imageUrl: "",
  });

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = { ...formData, comments: [] };
      const response = await axios.post("http://localhost:3002/posts", newPost);
      setPosts((prevPosts) => [...prevPosts, response.data]);
      setFormData({
        name: "",
        country: "",
        age: "",
        description: "",
        imageUrl: "",
      });
      closeModal();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async (postId) => {
    if (newComment.trim() === "") return;

    const post = posts.find((p) => p.id === postId);

    const updatedComments = [
      ...post.comments,
      { text: newComment, date: new Date().toLocaleString() },
    ];

    try {
      await axios.put(`http://localhost:3002/posts/${postId}`, {
        ...post,
        comments: updatedComments,
      });

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId ? { ...p, comments: updatedComments } : p
        )
      );
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative flex flex-col min-h-screen">
      <header className="bg-gray-200 text-black p-4 shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Blog</h1>
        </div>
      </header>

      {/* About the Author Section */}
      <div className="fixed top-60 right-20 transform -translate-y-1/2 bg-blue-500 text-white p-8 w-72 rounded-lg">
        <h2 className="text-xl font-bold">About the Author</h2>
        <p className="mt-2 text-sm">
          "Hello, I'm Abdullah Nafees. Welcome to my blog, where I share stories
          of individuals who have strived to change the world through their
          remarkable efforts. Here, you'll discover fascinating insights about
          renowned scientists and their groundbreaking contributions."
        </p>
      </div>

      <main className="flex-1 flex flex-col items-center gap-20 pt-20 pb-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-lg w-1/3 flex flex-col items-center"
          >
            <img
              src={post.imageUrl || "https://via.placeholder.com/150"}
              alt={post.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-bold">{post.name}</h2>
            <p>
              <b>Country:</b> {post.country}
            </p>
            <p>
              <b>Age:</b> {post.age}
            </p>
            <p>
              <b>Description:</b> {post.description}
            </p>

            <div className="w-full mt-4">
              <h3 className="text-lg font-semibold">Comments</h3>
              <div className="border-t pt-2">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment, index) => (
                    <div key={index} className="mt-2">
                      <p>{comment.text}</p>
                      <span className="text-gray-500 text-sm">
                        {comment.date}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}

                <textarea
                  className="w-full mt-4 p-2 border rounded"
                  rows="3"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={handleCommentChange}
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded mt-2"
                  onClick={() => handleAddComment(post.id)}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <FaPlusCircle
        onClick={openModal}
        className="fixed bottom-20 right-10 text-blue-500 text-6xl cursor-pointer hover:text-blue-700"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4">
        <p>&copy; {new Date().getFullYear()} My Blog. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Display;
