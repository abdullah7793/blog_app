import axios from "axios";
import { FaPlusCircle, FaTrash, FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Footer from "./footer.jsx";
import Header from "./header.jsx";
import AuthorInfo from "./Authorinfo.jsx";
import CommentSection from "./Comment.jsx";
const Display = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [deletePostData, setDeletePostData] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    age: "",
    description: "",
    imageUrl: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3002/posts")
      .then((response) => {
        setPosts(response.data);
        if (!filteredPosts.length) setFilteredPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.name.toLowerCase().includes(lowercasedTerm) ||
        post.country.toLowerCase().includes(lowercasedTerm)
    );
    term === "" || term === null || term === undefined
      ? setFilteredPosts(posts)
      : setFilteredPosts(filtered);
    setSearchTerm(term);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setEditingPostId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        comments: [],
        createdAt: new Date().toISOString(),
      };

      if (editingPostId) {
        const response = await axios.put(
          `http://localhost:3002/posts/${editingPostId}`,
          postData
        );
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editingPostId ? response.data : post
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:3002/posts",
          postData
        );
        setPosts((prevPosts) => [...prevPosts, response.data]);
      }

      setFormData({
        name: "",
        country: "",
        age: "",
        description: "",
        imageUrl: "",
      });
      setEditingPostId(null);
      closeModal();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3002/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      setDeletePostData(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const openDeleteConfirmation = (post) => {
    setDeletePostData(post);
  };

  const closeDeleteConfirmation = () => {
    setDeletePostData(null);
  };

  const handleEdit = (post) => {
    setFormData(post);
    setEditingPostId(post.id);
    setModalOpen(true);
  };

  const getInitialsAvatar = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return (
      <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full text-sm font-bold">
        {initials}
      </div>
    );
  };

  const formatDate = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);

    if (isNaN(createdDate.getTime())) {
      console.error("Invalid Date:", createdAt);
      return "Invalid Date";
    }

    const timeDifference = now - createdDate;
    if (timeDifference < 86400000) {
      const hours = Math.floor(timeDifference / 3600000);
      const minutes = Math.floor((timeDifference % 3600000) / 60000);
      if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else {
        return "Just now";
      }
    } else {
      return createdDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const truncateDescription = (description, limit = 300) => {
    if (description.length <= limit) return description;
    return description.slice(0, limit) + "...";
  };

  const handleToggleDescription = (postId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header handleSearch={handleSearch} searchTerm={searchTerm} />

      <AuthorInfo />

      <div className="relative flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center gap-20 pt-20 pb-10">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg shadow-lg w-1/3 flex flex-col items-center relative"
            >
              <div className="absolute top-5 right-4 flex space-x-2">
                <FaEdit
                  onClick={() => handleEdit(post)}
                  className="text-blue-500 cursor-pointer"
                />
                <FaTrash
                  onClick={() => openDeleteConfirmation(post)}
                  className="text-red-500 cursor-pointer"
                />
              </div>
              <div className="flex items-center w-full mb-4">
                {getInitialsAvatar("Abdullah Nafees")}
                <div className="ml-2 text-gray-600 text-sm">
                  <div className="font-semibold">Abdullah Nafees</div>
                  <div>{formatDate(post.createdAt)}</div>
                </div>
              </div>

              <div className="post-card p-4 ">
                {post.imageUrl ? (
                  post.resourceType === "video" ? (
                    <video
                      controls
                      className="w-full h-64 object-contain rounded mb-4"
                    >
                      <source src={post.imageUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={post.imageUrl || "https://via.placeholder.com/150"}
                      alt={post.name}
                      className="w-full h-64 object-contain rounded mb-4"
                    />
                  )
                ) : (
                  <div className="w-full h-64 bg-gray-300 rounded mb-4 flex items-center justify-center">
                    No media uploaded
                  </div>
                )}

                <h2 className="text-lg font-bold">{post.name}</h2>
                <p>
                  <b>Country:</b> {post.country}
                </p>
                <p>
                  <b>Age:</b> {post.age}
                </p>
                <div>
                  <b>Description:</b>
                  <p>
                    {expandedDescriptions[post.id]
                      ? post.description
                      : truncateDescription(post.description)}
                    {post.description.length > 300 && (
                      <button
                        onClick={() => handleToggleDescription(post.id)}
                        className="text-blue-500"
                      >
                        {expandedDescriptions[post.id]
                          ? "Show Less"
                          : "Show More"}
                      </button>
                    )}
                  </p>
                </div>
              </div>

              <CommentSection
                postId={post.id}
                comments={post.comments}
                visibleComments={post.visibleComments}
                toggleComments={(id) =>
                  setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                      post.id === id
                        ? { ...post, visibleComments: !post.visibleComments }
                        : post
                    )
                  )
                }
                formatDate={(date) => new Date(date).toLocaleString()}
                handleAddComment={(id, newComment) =>
                  setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                      post.id === id
                        ? {
                            ...post,
                            comments: [
                              ...post.comments,
                              { text: newComment, date: new Date() },
                            ],
                          }
                        : post
                    )
                  )
                }
              />
            </div>
          ))}
        </main>
        <div className="fixed bottom-20 right-[5.5rem]">
          <FaPlusCircle
            onClick={openModal}
            className="text-blue-500 cursor-pointer text-6xl"
          />
        </div>

        {deletePostData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg w-1/3">
              <h3 className="text-xl font-semibold">
                Are you sure you want to delete this post?
              </h3>
              <p className="mt-2">This action cannot be undone.</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeDeleteConfirmation}
                  className="bg-gray-300 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deletePostData.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
        />

        <Footer />
      </div>
    </>
  );
};

export default Display;
