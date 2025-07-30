import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaClipboardList } from 'react-icons/fa';

const statusColors = {
  pending: '#E343E6',
  ongoing: '#DD9221',
  done: '#21D789',
  collaborative_task: '#4A90E2',
};

const TaskCard = ({ task, onTaskUpdate, onDeleteRequest }) => {
  const navigate = useNavigate();
  const color = statusColors[task.status] || '#999';

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // prevent navigation
    onDeleteRequest(task._id); // trigger Dashboard-level modal
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-5 relative cursor-pointer hover:shadow-lg transition-all"
      onClick={() => navigate(`/tasks/${task._id}`)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <FaClipboardList className="text-[#60E5AE]" />
          {task.category}
        </div>
        <FaTrash
          onClick={handleDeleteClick}
          className="text-red-500 cursor-pointer hover:text-red-700"
        />
      </div>

      <p className="text-gray-700 my-3">{task.title}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
        <span>{formatDate(task.endDate)}</span>
        <span className="flex items-center gap-1 font-semibold" style={{ color }}>
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          ></span>
          {task.status.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
