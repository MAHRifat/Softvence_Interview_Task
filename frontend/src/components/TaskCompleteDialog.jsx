import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import successImage from '/con_img.png'; // Make sure this image exists in your assets folder

const TaskCompleteDialog = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl w-full text-center">
        <img
          src={successImage}
          alt="Success"
          className="w-56 h-54 mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Successfully Completed the Task!</h2>
        <p className="text-gray-600 mb-6">Great job. The task has been completed successfully.</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TaskCompleteDialog;
