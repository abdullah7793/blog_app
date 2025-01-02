
import React, { useState } from "react";

const CommentSection = ({
  postId,
  comments,
  visibleComments,
  toggleComments,
  formatDate,
  handleAddComment,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="w-full mt-4">
      <h3
        className="text-lg font-semibold text-blue-600 cursor-pointer text-center"
        onClick={() => toggleComments(postId)}
      >
        {visibleComments ? "Comments" : "Comments"}
      </h3>
      {visibleComments && (
        <div className="mt-4">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mt-2 relative">
                <p>{comment.text}</p>
                <span className="absolute top-0 right-0 text-gray-500 text-xs">
                  {formatDate(comment.date)}
                </span>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <div className="mt-4 relative">
            <input
              className="w-full p-4 pr-16 border rounded-full"
              placeholder="Write a comment..."
              value={newComment}
              onChange={handleCommentChange}
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 px-3 py-1 border border-blue-500 rounded-full hover:bg-gray-100"
              onClick={() => {
                handleAddComment(postId, newComment);
                setNewComment("");
              }}
            >
              Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
