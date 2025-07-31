import React, { useState } from 'react';

const AddTask = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Nature');
  const [status, setStatus] = useState('pending');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Unauthorized. Please log in.');
      return;
    }

    try {
      const res = await fetch('https://tasko-l7bf.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, category, status, endDate }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Task creation failed.');
        return;
      }

      onTaskAdded();
      onClose();
    } catch (err) {
      setError('Server error.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-70 backdrop-blur-sm px-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[1320px] max-h-[90vh] overflow-auto px-6 md:px-[60px] pt-[60px] pb-[60px] relative">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add New Task</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div>
            <label className="block mb-1 text-gray-700">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
