import React, { useState } from 'react';

const AddTask = ({ onClose, onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Nature');
  const [status, setStatus] = useState('pending');
  const [startDate, setStartDate] = useState('');
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
        body: JSON.stringify({ title, description, category, status, startDate, endDate }),
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
    <div className="flex h-[calc(100vh-270px)] justify-center px-[20px] md:px-[60px] -mt-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[45%] w-full">
      <div className="w-full max-w-[1320px] bg-white rounded-xl shadow-xl px-6 md:px-[60px] pt-[40px] pb-[60px] z-10">
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">Add New Task</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto text-black">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Select Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option>Arts and Craft</option>
                <option>Nature</option>
                <option>Family</option>
                <option>Sport</option>
                <option>Friends</option>
                <option>Meditation</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="collaborative_task">Collaborative Task</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-[#60E5AE] hover:bg-[#4ed1a3] text-white px-6 py-2 rounded-md font-semibold"
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
