import { useState, useEffect } from "react";
import { useAddCommentMutation, useDeleteCommentMutation, useGetCommentsQuery, useUpdateCommentMutation } from "./Feature/PostApi";
import { PencilIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/solid";

function App() {
  const { data, isLoading, isError } = useGetCommentsQuery();
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    const newComment = { id: Date.now(), body: comment };
    setComments([...comments, newComment]);
    await addComment({ body: comment });
    setComment("");
  };

  const handleEditClick = (id, body) => {
    setEditId(id);
    setText(body);
  };

  const handleSave = async (id) => {
    setComments(comments.map(c => (c.id === id ? { ...c, body: text } : c)));
    await updateComment({ id, body: text });
    setEditId(null);
    setText("");
  };

  const handleDelete = async (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
    await deleteComment();
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading comments...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading comments.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-300 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl transform transition-transform hover:scale-105">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center"> Comments</h1>
        <div className="space-y-3 max-h-72 overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50">
          {comments.map((c) => (
            <div key={c.id} className="p-4 border-b last:border-none flex justify-between items-center bg-white shadow-md rounded-lg">
              {editId === c.id ? (
                <input
                  type="text"
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              ) : (
                <p className="text-gray-800">{c.body}</p>
              )}
              <div className="flex gap-3">
                {editId === c.id ? (
                  <button
                    className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition"
                    onClick={() => handleSave(c.id)}
                  >
                    SAVE
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition"
                    onClick={() => handleEditClick(c.id, c.body)}
                  >
                   EDIT
                  </button>
                )}
                <button
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center">
          <input
            type="text"
            className="border p-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full flex items-center gap-3 text-xl font-semibold hover:bg-purple-700 transition"
          >
              Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
