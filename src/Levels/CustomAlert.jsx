import React from 'react';

const CustomAlert = ({ visible, message, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg text-green-600 w-80">
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          ✖
        </button>
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
};

const styles = {
  alertContainer: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
  },
  alertBox: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "10px 20px",
    border: "1px solid #f5c6cb",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "20px",
  },
};

export default CustomAlert;
