import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border border-dashed animate-spin inline-block w-10 h-10 border-4 rounded-full border-blue-500"
        role="status"
      >
      </div>
    </div>
  );
};

export default LoadingSpinner;
