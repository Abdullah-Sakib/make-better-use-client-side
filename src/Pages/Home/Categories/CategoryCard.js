import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`categories/${category?.name}`}>
      <div className="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
        <div className="p-5 relative">
          <img src={category?.image} alt="" />
          <h2 className="text-xl font-bold text-center mt-3">
            {category?.name}
          </h2>
        </div>
        <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
      </div>
    </Link>
  );
};

export default CategoryCard;
