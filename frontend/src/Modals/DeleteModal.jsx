import React from "react";
import ReactDOM from "react-dom";

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#c2bebeb9] bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <p className="mb-4">Are you sure you want to delete this comment?</p>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
