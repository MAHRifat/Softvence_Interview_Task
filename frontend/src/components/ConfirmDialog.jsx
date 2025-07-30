import React from 'react';

const ConfirmDialog = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl text-center">
        <img
          src="/delete_img.png"
          alt="Delete Illustration"
          className="w-32 mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Are you sure?</h3>
        <p className="text-gray-600 mb-6">
          Do you really want to delete this task? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#60E5AE] hover:bg-[#b5edd3] text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#FF4C2426] hover:bg-[#ff4c245e] text-[#e51e1e] rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
