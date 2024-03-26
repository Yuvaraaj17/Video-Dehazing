import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop:blur-lg">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 font-serif">More Details</h2>
        <div>
          <p>Expected Speed: 50Km/hr</p>
          <p>Vehicle Speed: 45km/hr</p>
          <p className="text-green-500 font-bold">The Vehicle doesn't Violate the rule!</p>
        </div>
        <hr className="bg-black border-t-2 my-3" />
        <div>
          <p>Expected Speed: 50Km/hr</p>
          <p>Vehicle Speed: 60km/hr</p>
          <p className="text-red-500 font-bold">The Vehicle Violate the rule!</p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
