import React from "react";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-[92vh]"
        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1580852300513-9b50125bf293?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80")` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Make Better Use</h1>
            <p className="mb-5 text-gray-300">
              Sale and buy used cameras, lenses, accessories, and other equipment at prices you can feel good about, and turn them into new opportunities—for you and your fellow photographers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
