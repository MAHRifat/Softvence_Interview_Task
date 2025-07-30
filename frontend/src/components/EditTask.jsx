// components/EditTask.js
import React, { useEffect, useState } from 'react';

const Spinner = () => (
  <div className="flex flex-col items-center justify-center h-[78vh] w-full text-center">
    <svg
      className="animate-spin h-12 w-12 text-[#60E5AE] mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <p className="text-gray-500 text-lg font-medium">Loading task details...</p>
  </div>
);

const EditTask = ({ taskId, onClose, onTaskUpdated }) => {
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTask(data);
    };
    fetchTask();
  }, [taskId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      const updatedTask = await res.json();

      if (!res.ok) {
        setError(updatedTask.message || 'Update failed');
        return;
      }

      onTaskUpdated(updatedTask);
      onClose();
    } catch (err) {
      setError('Server error.');
    }
  };

  if (!task) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#040612] to-[#60E5AE]">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p className="text-white text-lg font-medium">Loading task details...</p>
      </div>
    </div>
  );
}


  return (
    <div className="inset-0 z-50 flex items-center fixed justify-center bg-opacity-70">
      <div className="bg-white rounded-xl shadow-xl w-[92%] max-w-[1320px] px-6 md:px-12 pt-12 pb-16 min-h-[78vh] max-h-[78vh] relative overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Edit Task</h2>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">{error}</div>}

        <form onSubmit={handleUpdate} className="space-y-5 text-black">
          <div>
            <label className="block mb-1 text-gray-700">Title</label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Description</label>
            <textarea
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Category</label>
              <select
                value={task.category}
                onChange={(e) => setTask({ ...task, category: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option>Arts and Craft</option>
                <option>Nature</option>
                <option>Family</option>
                <option>Sport</option>
                <option>Friends</option>
                <option>Meditation</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700">Status</label>
              <select
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="collaborative_task">Collaborative Task</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-700">End Date</label>
            <input
              type="date"
              value={task.endDate?.slice(0, 10)}
              onChange={(e) => setTask({ ...task, endDate: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="absolute right-10 bottom-8 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-100 text-red-700 px-6 py-1 rounded-md font-medium hover:bg-red-200 w-30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#60E5AE] text-white px-6 py-1 rounded-md font-semibold hover:bg-[#4ed1a3] w-36"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
