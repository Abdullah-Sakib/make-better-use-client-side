import React from "react";

const LoadingSpinner = () => {
  return (
    <div class="flex justify-center items-center">
      <div
        class="spinner-border border-dashed animate-spin inline-block w-10 h-10 border-4 rounded-full border-success"
        role="status"
      >
      </div>
    </div>
  );
};

export default LoadingSpinner;
